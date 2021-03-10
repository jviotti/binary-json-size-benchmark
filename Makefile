.PHONY: deps deps-flatbuffers deps-capnproto lint benchmark
.DEFAULT_GOAL = benchmark

OS = $(shell uname)
DEPSDIR ?= $(shell pwd)/.tmp

include vendor/vendorpull/targets.mk

$(DEPSDIR):
	mkdir -p $@

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

# Allow Thrift to be compiled on macOS
ifeq ($(OS),Darwin)
LDFLAGS += -L/usr/local/opt/bison@2.7/lib
LDFLAGS += -L/usr/local/opt/openssl@1.1/lib
LDFLAGS += -L/usr/local/Cellar/boost/1.75.0_2/lib
CPPFLAGS += -I/usr/local/opt/openssl@1.1/include
CPPFLAGS += -I/usr/local/Cellar/boost/1.75.0_2/include
export PKG_CONFIG_PATH := /usr/local/opt/openssl@1.1/lib/pkgconfig:$(PKG_CONFIG_PATH)
export PATH := /usr/local/opt/openjdk/bin:/usr/local/opt/bison@2.7/bin:/usr/local/opt/openssl@1.1/bin:$(PATH)
endif

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
	deps-thrift deps-flatbuffers deps-capnproto deps-msgpack-tools deps-lz4
	pip3 install --requirement $<
	npm install

lint:
	shellcheck skeleton/*/*.sh scripts/*.sh
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
	$(DEPSDIR)/lz4/lz4 -9 $< $@

%.lzma: %
	lzma -9 --stdout < $< > $@

# TODO: Can we use "wildcard" for this?
FORMATS = $(shell ls -1 skeleton)

define RULE_ENCODE_PATCH
output/%/$1/encode.json: benchmark/%/document.json benchmark/%/$1/pre.patch.json
	node scripts/jsonpatch.js $$(word 2,$$^) < $$< > $$@
endef

$(foreach format,$(FORMATS),$(eval $(call RULE_ENCODE_PATCH,$(format))))

define RULE_DECODE_PATCH
output/%/$1/output.json: output/%/$1/decode.json benchmark/%/$1/post.patch.json
	node scripts/jsonpatch.js $$(word 2,$$^) < $$< > $$@
endef

$(foreach format,$(FORMATS),$(eval $(call RULE_DECODE_PATCH,$(format))))

# TODO: Declare input document directly for schema-less formats
# in order to avoid the whole unnecessary JSON patching steps

# Encoding

output/%/avro/output.bin: skeleton/avro/encode.py output/%/avro/encode.json benchmark/%/avro/schema.json
	python3 $< $(word 2,$^) $(word 3,$^) $@

output/%/bson/output.bin: skeleton/bson/encode.js output/%/bson/encode.json
	node $< $(word 2,$^) $@

output/%/capnproto/output.bin: output/%/capnproto/encode.json benchmark/%/capnproto/schema.capnp
	$(DEPSDIR)/capnproto/c++/src/capnp/capnp convert json:packed $(word 2,$^) Main < $< > $@

output/%/cbor/output.bin: skeleton/cbor/encode.py output/%/cbor/encode.json
	python3 $< $(word 2,$^) $@

output/%/flatbuffers/output.bin: output/%/flatbuffers/encode.json benchmark/%/flatbuffers/schema.fbs
	$(DEPSDIR)/flatbuffers/flatc --force-defaults --raw-binary -o $(dir $@) --binary $(word 2,$^) $<
	mv $(dir $@)$(notdir $(basename $<)).bin $@

output/%/flexbuffers/output.bin: output/%/flexbuffers/encode.json
	$(DEPSDIR)/flatbuffers/flatc --flexbuffers -o $(dir $@) --binary $<
	mv $(dir $@)$(notdir $(basename $<)).bin $@

output/%/json/output.bin: output/%/json/encode.json
	jq -c '.' < $< > $@

output/%/messagepack/output.bin: output/%/messagepack/encode.json
	$(DEPSDIR)/msgpack-tools/json2msgpack < $< > $@

output/%/smile/output.bin: skeleton/smile/encode.clj output/%/smile/encode.json
	cd $(dir $<) && JSON_FILE="$(abspath $(word 2,$^))" OUTPUT_FILE="$(abspath $@)" clj -M $(notdir $<)

output/%/thrift/output.bin: skeleton/thrift/encode.py output/%/thrift/encode.json benchmark/%/thrift/schema.thrift
	$(DEPSDIR)/thrift/bin/thrift --gen py -o $(dir $(word 3,$^)) -out $(dir $(word 3,$^)) $(word 3,$^)
	PYTHONPATH="$(dir $(word 3,$^))" python3 $< $(word 2,$^) $(dir $(word 3,$^))run.py $@

output/%/ubjson/output.bin: skeleton/ubjson/encode.py output/%/ubjson/encode.json
	python3 $< $(word 2,$^) $@

# Decoding

output/%/avro/decode.json: skeleton/avro/decode.py output/%/avro/output.bin benchmark/%/avro/schema.json
	python3 $< $(word 2,$^) $(word 3,$^) > $@

output/%/bson/decode.json: skeleton/bson/decode.js output/%/bson/output.bin
	node $< $(word 2,$^) > $@

output/%/capnproto/decode.json: output/%/capnproto/output.bin benchmark/%/capnproto/schema.capnp
	$(DEPSDIR)/capnproto/c++/src/capnp/capnp convert packed:json $(word 2,$^) Main < $< > $@

output/%/cbor/decode.json: skeleton/cbor/decode.py output/%/cbor/output.bin
	python3 $< $(word 2,$^) > $@

output/%/flatbuffers/decode.json: output/%/flatbuffers/output.bin benchmark/%/flatbuffers/schema.fbs
	$(DEPSDIR)/flatbuffers/flatc --raw-binary -o $(dir $@) --strict-json --json $(word 2,$^) -- $<
	mv $(dir $@)$(notdir $(basename $<)).json $@

output/%/flexbuffers/decode.json: output/%/flexbuffers/output.bin
	$(DEPSDIR)/flatbuffers/flatc --flexbuffers -o $(dir $@) --strict-json --json $<
	mv $(dir $@)$(notdir $(basename $<)).json $@

output/%/json/decode.json: output/%/json/output.bin
	jq '.' < $< > $@

output/%/messagepack/decode.json: output/%/messagepack/output.bin
	$(DEPSDIR)/msgpack-tools/msgpack2json < $< > $@

output/%/smile/decode.json: skeleton/smile/decode.clj output/%/smile/output.bin
	cd $(dir $<) && INPUT_FILE="$(abspath $(word 2,$^))" clj -M $(notdir $<) > $(abspath $@)

output/%/thrift/decode.json: skeleton/thrift/decode.py output/%/thrift/output.bin benchmark/%/thrift/schema.thrift
	PYTHONPATH="$(dir $(word 3,$^))" python3 $< $(word 2,$^) $(dir $(word 3,$^))run.py $@

output/%/ubjson/decode.json: skeleton/ubjson/decode.py output/%/ubjson/output.bin
	python3 $< $(word 2,$^) > $@

README.md: scripts/readme.sh \
	$(wildcard charts/*.png) $(wildcard benchmark/*/NAME) \
	$(wildcard benchmark/*/document.json) \
	$(wildcard benchmark/*/data.dat)
	./$< > $@

benchmark:
	DEPSDIR="$(DEPSDIR)" ./scripts/main.sh

benchmark-%:
	DEPSDIR="$(DEPSDIR)" ./scripts/main.sh \
		$(word 1,$(subst -, ,$(subst benchmark-,,$@))) \
		$(word 2,$(subst -, ,$(subst benchmark-,,$@)))
