.PHONY: deps deps-flatbuffers deps-capnproto lint benchmark all
.DEFAULT_GOAL = benchmark

# Don't remove intermediary files
.SECONDARY:

OS = $(shell uname)
DEPSDIR ?= $(shell pwd)/.tmp

CPPFLAGS_BOND ?= -Ivendor/bond/cpp/inc -I$(DEPSDIR)/bond/cpp -Ivendor/bond/thirdparty/rapidjson/include -L$(DEPSDIR)/bond/cpp -lbond -std=c++11

ifeq ($(OS),Darwin)
# Allow Thrift to be compiled on macOS
LDFLAGS += -L/usr/local/opt/bison@2.7/lib
LDFLAGS += -L/usr/local/opt/openssl@1.1/lib
LDFLAGS += -L/usr/local/Cellar/boost/1.75.0_2/lib
CPPFLAGS += -I/usr/local/opt/openssl@1.1/include
CPPFLAGS += -I/usr/local/Cellar/boost/1.75.0_2/include
export PKG_CONFIG_PATH := /usr/local/opt/openssl@1.1/lib/pkgconfig:$(PKG_CONFIG_PATH)
export PATH := /usr/local/opt/openjdk/bin:/usr/local/opt/bison@2.7/bin:/usr/local/opt/openssl@1.1/bin:$(PATH)
CPPFLAGS_BOND += -lboost_thread-mt
else
CPPFLAGS_BOND += -lboost_thread
endif

include vendor/vendorpull/targets.mk

$(DEPSDIR):
	mkdir -p $@

deps-bond: vendor/bond | $(DEPSDIR)
	cmake -S $< -B $(DEPSDIR)/bond -DBOND_ENABLE_GRPC=FALSE
	make --directory=$(DEPSDIR)/bond --jobs

deps-protobuf: vendor/protobuf | $(DEPSDIR)
	cmake -S $</cmake -B $(DEPSDIR)/protobuf \
		-Dprotobuf_BUILD_TESTS=OFF -Dprotobuf_BUILD_SHARED_LIBS=OFF
	make --directory=$(DEPSDIR)/protobuf --jobs

deps-flatbuffers: vendor/flatbuffers | $(DEPSDIR)
	cmake -S $< -B $(DEPSDIR)/flatbuffers \
		-DFLATBUFFERS_BUILD_TESTS=OFF -DFLATBUFFERS_BUILD_FLATHASH=OFF \
		-DFLATBUFFERS_BUILD_GRPCTEST=OFF -DFLATBUFFERS_BUILD_FLATLIB=OFF
	make --directory=$(DEPSDIR)/flatbuffers --jobs

deps-capnproto: vendor/capnproto | $(DEPSDIR)
	cmake -S $< -B $(DEPSDIR)/capnproto -DBUILD_TESTING=OFF
	make --directory=$(DEPSDIR)/capnproto --jobs

deps-msgpack-tools: vendor/msgpack-tools | $(DEPSDIR)
	cmake -S $< -B $(DEPSDIR)/msgpack-tools
	make --directory=$(DEPSDIR)/msgpack-tools --jobs

deps-lz4: vendor/lz4 | $(DEPSDIR)
	cmake -S $</build/cmake -B $(DEPSDIR)/lz4 -DLZ4_BUILD_LEGACY_LZ4C=OFF
	make --directory=$(DEPSDIR)/lz4

deps-thrift: vendor/thrift | $(DEPSDIR)
	cd $< && ./bootstrap.sh && ./configure --prefix=$(DEPSDIR)/thrift \
		--without-java --without-erlang --without-nodejs --without-nodets --without-lua \
		--without-perl --without-php --without-php_extension --without-dart --without-ruby \
		--without-haskell --without-go --without-swift --without-rs --without-cl \
		--without-haxe --without-netstd --without-d --without-as3 --without-python \
		--without-py3 --without-cpp --without-c_glib
	make --directory=$< build install clean --jobs
	git clean --force -d $<

deps: requirements.txt package.json \
	deps-bond deps-protobuf deps-thrift \
	deps-flatbuffers deps-capnproto deps-msgpack-tools deps-lz4
	pip3 install --requirement $<
	npm install

lint:
	shellcheck scripts/*.sh
	python3 -m flake8 skeleton/*/*.py scripts/*.py

charts:
	mkdir $@

charts/%.png: plot.gpi output/%/data.dat benchmark/%/NAME | charts
	gnuplot \
		-e "description=\"$(shell cat $(word 3,$^))\"" \
		-e "filename=\"$(word 2,$^)\"" \
		$< > $@

%.gz: %
	gzip --no-name -9 < $< > $@

%.lz4: %
	$(DEPSDIR)/lz4/lz4 -f -9 $< $@

%.lzma: %
	lzma -9 --stdout < $< > $@

ALL_FORMATS = $(notdir $(wildcard skeleton/*))
ifdef ASN1STEP
FORMATS = $(ALL_FORMATS)
else
FORMATS = $(filter-out asn1,$(ALL_FORMATS))
endif

DOCUMENTS = $(notdir $(wildcard benchmark/*))

define RULE_OUTPUT_DIRECTORY
output/%/$1:
	mkdir -p $$@
endef

$(foreach format,$(FORMATS),$(eval $(call RULE_OUTPUT_DIRECTORY,$(format))))

define RULE_ENCODE_PATCH
output/%/$1/encode.json: benchmark/%/document.json benchmark/%/$1/pre.patch.json | output/%/$1
	node scripts/jsonpatch.js $$(word 2,$$^) < $$< > $$@
endef

$(foreach format,$(FORMATS),$(eval $(call RULE_ENCODE_PATCH,$(format))))

define RULE_DECODE_PATCH
output/%/$1/output.json: output/%/$1/decode.json benchmark/%/$1/post.patch.json \
	scripts/json-equals.py benchmark/%/document.json | output/%/$1
	node scripts/jsonpatch.js $$(word 2,$$^) < $$< > $$@.tmp
	cat $$@.tmp
	python3 $$(word 3,$$^) $$@.tmp $$(word 4,$$^)
	mv $$@.tmp $$@
endef

$(foreach format,$(FORMATS),$(eval $(call RULE_DECODE_PATCH,$(format))))

# Encoding

ifdef ASN1STEP
output/%/asn1/output.bin: output/%/asn1/encode.json benchmark/%/asn1/schema.asn \
	| output/%/asn1
	$(ASN1STEP) $^ -per -noRelaxedMode -allow UnderscoresInAsn1Names -decodePdu 0 -out $(basename $@)
	mv $(basename $@).per $@
	xxd $@
endif

output/%/avro/output.bin: skeleton/avro/encode.py output/%/avro/encode.json benchmark/%/avro/schema.json \
	| output/%/avro
	python3 $< $(word 2,$^) $(word 3,$^) $@
	xxd $@

output/%/bond/output.bin: output/%/bond/encode.json benchmark/%/bond/schema.bond skeleton/bond/encode.cpp \
	| output/%/bond
	$(DEPSDIR)/bond/compiler/build/gbc/gbc c++ $(word 2,$^) --output-dir=$(dir $(word 2,$^))
	clang++ $(word 3,$^) -I$(dir $(word 2,$^)) $(CPPFLAGS_BOND) \
		$(dir $(word 2,$^))schema_apply.cpp $(dir $(word 2,$^))schema_types.cpp \
		-o $(dir $@)encode -Wall
	$(dir $@)encode $< $@
	rm $(dir $@)encode
	xxd $@

output/%/bson/output.bin: skeleton/bson/encode.js output/%/bson/encode.json \
	| output/%/bson
	node $< $(word 2,$^) $@
	xxd $@

output/%/capnproto/output.bin: output/%/capnproto/encode.json benchmark/%/capnproto/schema.capnp \
	| output/%/capnproto
	$(DEPSDIR)/capnproto/c++/src/capnp/capnp convert json:binary $(word 2,$^) Main < $< > $@
	xxd $@

output/%/capnproto-packed/output.bin: output/%/capnproto-packed/encode.json benchmark/%/capnproto-packed/schema.capnp \
	| output/%/capnproto-packed
	$(DEPSDIR)/capnproto/c++/src/capnp/capnp convert json:packed $(word 2,$^) Main < $< > $@
	xxd $@

output/%/cbor/output.bin: skeleton/cbor/encode.py output/%/cbor/encode.json \
	| output/%/cbor
	python3 $< $(word 2,$^) $@
	xxd $@

output/%/flatbuffers/output.bin: output/%/flatbuffers/encode.json benchmark/%/flatbuffers/schema.fbs \
	| output/%/flatbuffers
	$(DEPSDIR)/flatbuffers/flatc --force-defaults --raw-binary -o $(dir $@) --binary $(word 2,$^) $<
	mv $(dir $@)$(notdir $(basename $<)).bin $@
	xxd $@

output/%/flexbuffers/output.bin: output/%/flexbuffers/encode.json \
	| output/%/flexbuffers
	$(DEPSDIR)/flatbuffers/flatc --flexbuffers -o $(dir $@) --binary $<
	mv $(dir $@)$(notdir $(basename $<)).bin $@
	xxd $@

output/%/json/output.bin: output/%/json/encode.json \
	| output/%/json
	jq -c '.' < $< > $@
	xxd $@

output/%/messagepack/output.bin: output/%/messagepack/encode.json \
	| output/%/messagepack
	$(DEPSDIR)/msgpack-tools/json2msgpack < $< > $@
	xxd $@

output/%/protobuf/output.bin: skeleton/protobuf/encode.py output/%/protobuf/encode.json benchmark/%/protobuf/schema.proto benchmark/%/protobuf/run.py \
	| output/%/thrift
	$(DEPSDIR)/protobuf/protoc --experimental_allow_proto3_optional \
		-I=vendor/protobuf/src -I=$(dir $(word 3,$^)) --python_out=$(dir $(word 3,$^)) $(word 3,$^)
	PYTHONPATH="$(dir $(word 3,$^))" python3 $< $(word 2,$^) $(word 4,$^) $@
	xxd $@

output/%/smile/output.bin: skeleton/smile/encode.clj output/%/smile/encode.json \
	| output/%/smile
	cd $(dir $<) && JSON_FILE="$(abspath $(word 2,$^))" OUTPUT_FILE="$(abspath $@)" clj -M $(notdir $<)
	xxd $@

output/%/thrift/output.bin: skeleton/thrift/encode.py output/%/thrift/encode.json benchmark/%/thrift/schema.thrift benchmark/%/thrift/run.py \
	| output/%/thrift
	$(DEPSDIR)/thrift/bin/thrift --gen py -o $(dir $(word 3,$^)) -out $(dir $(word 3,$^)) $(word 3,$^)
	PYTHONPATH="$(dir $(word 3,$^))" python3 $< $(word 2,$^) $(word 4,$^) $@
	xxd $@

output/%/ubjson/output.bin: skeleton/ubjson/encode.py output/%/ubjson/encode.json \
	| output/%/ubjson
	python3 $< $(word 2,$^) $@
	xxd $@

# Decoding

ifdef ASN1STEP
output/%/asn1/decode.json: output/%/asn1/output.bin benchmark/%/asn1/schema.asn \
	| output/%/asn1
	cp $< $(basename $<).per
	$(ASN1STEP) $(basename $<).per $(word 2,$^) -json -noRelaxedMode -allow UnderscoresInAsn1Names -decodePdu 0 -out $(basename $@)
	rm $(basename $<).per
	mv $(basename $@).json $@
endif

output/%/avro/decode.json: skeleton/avro/decode.py output/%/avro/output.bin benchmark/%/avro/schema.json \
	| output/%/avro
	python3 $< $(word 2,$^) $(word 3,$^) > $@

output/%/bond/decode.json: output/%/bond/output.bin benchmark/%/bond/schema.bond skeleton/bond/decode.cpp \
	| output/%/bond
	clang++ $(word 3,$^) -I$(dir $(word 2,$^)) $(CPPFLAGS_BOND) \
		$(dir $(word 2,$^))schema_apply.cpp $(dir $(word 2,$^))schema_types.cpp \
		-o $(dir $@)decode -Wall
	$(dir $@)decode $< $@
	rm $(dir $@)decode

output/%/bson/decode.json: skeleton/bson/decode.js output/%/bson/output.bin \
	| output/%/bson
	node $< $(word 2,$^) > $@

output/%/capnproto/decode.json: output/%/capnproto/output.bin benchmark/%/capnproto/schema.capnp skeleton/capnproto/decode.sh \
	| output/%/capnproto
	DEPSDIR=$(DEPSDIR) ./$(word 3,$^) $(word 2,$^) $< $@

output/%/capnproto-packed/decode.json: output/%/capnproto-packed/output.bin benchmark/%/capnproto-packed/schema.capnp \
	| output/%/capnproto-packed
	$(DEPSDIR)/capnproto/c++/src/capnp/capnp convert packed:json $(word 2,$^) Main < $< > $@

output/%/cbor/decode.json: skeleton/cbor/decode.py output/%/cbor/output.bin \
	| output/%/cbor
	python3 $< $(word 2,$^) > $@

output/%/flatbuffers/decode.json: output/%/flatbuffers/output.bin benchmark/%/flatbuffers/schema.fbs \
	| output/%/flatbuffers
	$(DEPSDIR)/flatbuffers/flatc --raw-binary -o $(dir $@) --strict-json --json $(word 2,$^) -- $<
	mv $(dir $@)$(notdir $(basename $<)).json $@

output/%/flexbuffers/decode.json: output/%/flexbuffers/output.bin \
	| output/%/flexbuffers
	$(DEPSDIR)/flatbuffers/flatc --flexbuffers -o $(dir $@) --strict-json --json $<
	mv $(dir $@)$(notdir $(basename $<)).json $@

output/%/json/decode.json: output/%/json/output.bin \
	| output/%/json
	jq '.' < $< > $@

output/%/messagepack/decode.json: output/%/messagepack/output.bin \
	| output/%/messagepack
	$(DEPSDIR)/msgpack-tools/msgpack2json < $< > $@

output/%/protobuf/decode.json: skeleton/protobuf/decode.py output/%/protobuf/output.bin benchmark/%/protobuf/schema.proto benchmark/%/protobuf/run.py \
	| output/%/thrift
	PYTHONPATH="$(dir $(word 3,$^))" python3 $< $(word 2,$^) $(word 4,$^) $@

output/%/smile/decode.json: skeleton/smile/decode.clj output/%/smile/output.bin \
	| output/%/smile
	cd $(dir $<) && INPUT_FILE="$(abspath $(word 2,$^))" clj -M $(notdir $<) > $(abspath $@)

output/%/thrift/decode.json: skeleton/thrift/decode.py output/%/thrift/output.bin benchmark/%/thrift/schema.thrift benchmark/%/thrift/run.py \
	| output/%/thrift
	PYTHONPATH="$(dir $(word 3,$^))" python3 $< $(word 2,$^) $(word 4,$^) $@

output/%/ubjson/decode.json: skeleton/ubjson/decode.py output/%/ubjson/output.bin \
	| output/%/ubjson
	python3 $< $(word 2,$^) > $@

define RULE_DOCUMENT_DAT
output/$1/data.dat: scripts/summarize.sh scripts/byte-size.sh \
	$$(wildcard skeleton/*/NAME) \
	$$(addsuffix /output.json,$$(addprefix output/$1/,$(FORMATS))) \
	$$(addsuffix /output.bin,$$(addprefix output/$1/,$(FORMATS))) \
	$$(addsuffix /output.bin.gz,$$(addprefix output/$1/,$(FORMATS))) \
	$$(addsuffix /output.bin.lz4,$$(addprefix output/$1/,$(FORMATS))) \
	$$(addsuffix /output.bin.lzma,$$(addprefix output/$1/,$(FORMATS)))
	./$$< $$(dir $$@) > $$@
endef

$(foreach document,$(DOCUMENTS),$(eval $(call RULE_DOCUMENT_DAT,$(document))))

CHARTS = $(addsuffix .png,$(addprefix charts/,$(DOCUMENTS)))
DATA = $(addsuffix /data.dat,$(addprefix output/,$(DOCUMENTS)))

README.md: scripts/readme.sh docs/versions.markdown docs/reproducibility.markdown data.awk \
	$(CHARTS) \
	$(wildcard benchmark/*/NAME) \
	$(wildcard benchmark/*/SOURCE) \
	$(wildcard benchmark/*/TAXONOMY) \
	$(wildcard benchmark/*/document.json) \
	$(DATA)
	./$< > $@

benchmark: all

benchmark-%:
	DEPSDIR="$(DEPSDIR)" make output/$(subst -,/,$(subst benchmark-,,$@))/output.json

all: $(CHARTS) README.md
