.PHONY: deps lint

deps: requirements.txt
	pip3 install --requirement $<

SHELL_SCRIPTS = $(shell find . -type f -name '*.sh')
lint: $(SHELL_SCRIPTS)
	shellcheck $(SHELL_SCRIPTS)
