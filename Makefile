.PHONY: deps

deps: requirements.txt
	pip3 install --requirement $<
