.PHONY: deps lint benchmark
.DEFAULT_GOAL = benchmark

deps: requirements.txt
	pip3 install --requirement $<

SHELL_SCRIPTS = $(shell find . -type f -name '*.sh')
PYTHON_SCRIPTS = $(shell find . -type f -name '*.py')
lint: $(SHELL_SCRIPTS) $(PYTHON_SCRIPTS)
	shellcheck $(SHELL_SCRIPTS)
	flake8 $(PYTHON_SCRIPTS)

charts:
	mkdir $@

charts/%.png: plot.gpi output/%/data.dat benchmark/%/NAME | charts
	gnuplot \
		-e "description=\"$(shell cat $(word 3,$^))\"" \
		-e "filename=\"$(word 2,$^)\"" \
		$< > $@

benchmark: lint
	./src/main.sh

benchmark-%:
	./src/main.sh \
		$(word 1,$(subst -, ,$(subst benchmark-,,$@))) \
		$(word 2,$(subst -, ,$(subst benchmark-,,$@)))
