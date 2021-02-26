.PHONY: tsc build deps lint test benchmark
.DEFAULT_GOAL = benchmark

tsc:
	./node_modules/.bin/tsc

build: tsc

deps: requirements.txt
	pip3 install --requirement $<
	npm install

SHELL_SCRIPTS = $(shell find . -type f -name '*.sh')
PYTHON_SCRIPTS = $(shell find . -type f -name '*.py')
lint: $(SHELL_SCRIPTS) $(PYTHON_SCRIPTS)
	shellcheck $(SHELL_SCRIPTS)
	python3 -m flake8 $(PYTHON_SCRIPTS)
	./node_modules/.bin/eslint --ext .ts src test

test:
	./node_modules/.bin/tap \
		--reporter=list \
		--no-coverage \
		--jobs=1 \
		--no-timeout \
		'dist/test/**/*.spec.js'

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
