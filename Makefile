.PHONY: deps lint run

deps: requirements.txt
	pip3 install --requirement $<

SHELL_SCRIPTS = $(shell find . -type f -name '*.sh')
lint: $(SHELL_SCRIPTS)
	shellcheck $(SHELL_SCRIPTS)

run: lint run.sh
	./$<
