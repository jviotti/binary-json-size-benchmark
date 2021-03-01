.PHONY: deps lint benchmark
.DEFAULT_GOAL = benchmark

deps: requirements.txt package.json
	pip3 install --requirement $<
	npm install

SHELL_SCRIPTS = $(shell find . -type f -name '*.sh' | grep -v node_modules)
PYTHON_SCRIPTS = $(shell find . -type f -name '*.py' | grep -v node_modules)
lint: $(SHELL_SCRIPTS) $(PYTHON_SCRIPTS)
	shellcheck $(SHELL_SCRIPTS)
	python3 -m flake8 $(PYTHON_SCRIPTS)

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
