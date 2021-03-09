.PHONY: deps deps-flatbuffers deps-capnproto lint benchmark
.DEFAULT_GOAL = benchmark

OS = $(shell uname)
DEPSDIR ?= $(shell pwd)/.tmp

include vendor/vendorpull/targets.mk

$(DEPSDIR):
	mkdir -p $@

deps-flatbuffers: vendor/flatbuffers | $(DEPSDIR)
	cmake -S $< -B $(DEPSDIR)/flatbuffers
	make --directory=$(DEPSDIR)/flatbuffers

deps-capnproto: vendor/capnproto | $(DEPSDIR)
	cmake -S $< -B $(DEPSDIR)/capnproto
	make --directory=$(DEPSDIR)/capnproto

deps-msgpack-tools: vendor/msgpack-tools | $(DEPSDIR)
	cmake -S $< -B $(DEPSDIR)/msgpack-tools
	make --directory=$(DEPSDIR)/msgpack-tools

deps-lz4: vendor/lz4 | $(DEPSDIR)
	cmake -S $</build/cmake -B $(DEPSDIR)/lz4
	make --directory=$(DEPSDIR)/lz4

# Allow Thrift to be compiled on macOS
ifeq $(OS) Darwin
LDFLAGS ?= -L/usr/local/opt/bison@2.7/lib -L/usr/local/opt/openssl@1.1/lib
export LDFLAGS
CPPFLAGS ?= -I/usr/local/opt/openssl@1.1/include
export CPPFLAGS
PKG ?= /usr/local/opt/openssl@1.1/lib/pkgconfig:$(PKG_CONFIG_PATH)
NEW_PATH ?= /usr/local/opt/bison@2.7/bin:/usr/local/opt/openssl@1.1/bin:$(PATH)
endif

deps-thrift: vendor/thrift | $(DEPSDIR)
	cd $< && PATH=$(NEW_PATH) PKG_CONFIG_PATH=$(PKG) ./bootstrap.sh
	cd $< && PATH=$(NEW_PATH) PKG_CONFIG_PATH=$(PKG) ./configure --prefix=$(DEPSDIR)
	PATH=$(NEW_PATH) PKG_CONFIG_PATH=$(PKG) make --directory=$<

deps: requirements.txt package.json \
	deps-flatbuffers deps-capnproto deps-msgpack-tools deps-lz4
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

benchmark:
	DEPSDIR="$(DEPSDIR)" ./scripts/main.sh

benchmark-%:
	DEPSDIR="$(DEPSDIR)" ./scripts/main.sh \
		$(word 1,$(subst -, ,$(subst benchmark-,,$@))) \
		$(word 2,$(subst -, ,$(subst benchmark-,,$@)))
