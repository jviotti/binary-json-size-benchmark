include vendor/vendorpull/targets.mk

.PHONY: deps build lint test
.DEFAULT_GOAL = build

deps:
	node vendor/npm/bin/npm-cli.js install

build:
	./node_modules/.bin/tsc
	cp lib/jsonschema/*.d.ts dist/lib/jsonschema

lint:
	./node_modules/.bin/eslint --ext .ts lib test
	shellcheck scripts/*.sh

# Test filter. We default to anything.
MATCH ?= "/.+/"

FILES ?= "dist/test/**/*.spec.js"

COVERAGE ?= 0

ifeq ($(COVERAGE),0)
TAP_COVERAGE_OPTIONS = --no-coverage
else
TAP_COVERAGE_OPTIONS = --coverage-report=html
endif

test:
	./node_modules/.bin/tap \
		--reporter=classic \
		$(TAP_COVERAGE_OPTIONS) \
		--jobs=1 \
		--grep=$(MATCH) \
		--no-timeout \
		--test-env="JSON_SCHEMA_TESTS_BASE_PATH=vendor/json-schema-test-suite/tests" \
		--test-env="JSON_SCHEMA_TESTS_REMOTES_PATH=vendor/json-schema-test-suite/remotes" \
		--test-env="JSON_SCHEMA_TEST_PATH=." \
		--test-env="JSON_SCHEMA_TEST_IGNORE_PATTERN=zeroTerminatedFloats" \
		$(FILES)

test-%:
	make test MATCH=$(MATCH) FILES="./dist/test/$(subst test-,,$@)/**/*.spec.js"
