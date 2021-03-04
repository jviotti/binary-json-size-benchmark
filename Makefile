.PHONY: deps deps-flatbuffers lint benchmark
.DEFAULT_GOAL = benchmark

include vendor/vendorpull/targets.mk

.tmp:
	mkdir $@

deps-flatbuffers: vendor/flatbuffers | .tmp
	cmake -S $< -B .tmp/flatbuffers
	make --directory=.tmp/flatbuffers
	ls -l .tmp/flatbuffers

deps: requirements.txt package.json deps-flatbuffers
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
