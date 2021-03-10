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

FORMATS = $(shell ls -1 skeleton)

define RULE_ENCODE_PATCH
output/%/$1/encode.json: benchmark/%/document.json benchmark/%/$1/pre.patch.json
	node scripts/jsonpatch.js $$(word 2,$$^) < $$< > $$@
endef

$(foreach format,$(FORMATS),$(eval $(call RULE_ENCODE_PATCH,$(format))))

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
