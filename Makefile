.PHONY: deps deps-flatbuffers deps-capnproto lint benchmark
.DEFAULT_GOAL = benchmark

include vendor/vendorpull/targets.mk

.tmp:
	mkdir $@

deps-flatbuffers: vendor/flatbuffers | .tmp
	cmake -S $< -B .tmp/flatbuffers
	make --directory=.tmp/flatbuffers

deps-capnproto: vendor/capnproto | .tmp
	cmake -S $< -B .tmp/capnproto
	make --directory=.tmp/capnproto

deps-msgpack-tools: vendor/msgpack-tools | .tmp
	cmake -S $< -B .tmp/msgpack-tools
	make --directory=.tmp/msgpack-tools

deps-lz4: vendor/lz4 | .tmp
	cmake -S $</build/cmake -B .tmp/lz4
	make --directory=.tmp/lz4

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
	./scripts/main.sh

benchmark-%:
	./scripts/main.sh \
		$(word 1,$(subst -, ,$(subst benchmark-,,$@))) \
		$(word 2,$(subst -, ,$(subst benchmark-,,$@)))
