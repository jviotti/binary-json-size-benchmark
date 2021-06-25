include vendor/vendorpull/targets.mk

.PHONY: all

lib/encoder/string/dictionaries/english.json: scripts/txt2dictionary.js vendor/google-10000-english/google-10000-english.txt
	node $< $(word 2,$^) > $@

assets/js:
	mkdir $@

assets/js/%.min.js: dist/web/%.js | assets/js
	./node_modules/.bin/browserify $< | ./node_modules/.bin/uglifyjs --compress --mangle > $@

_sass/tailwind.scss: node_modules/tailwindcss/tailwind.css postcss.config.js
	./node_modules/.bin/postcss $< --output $@

_sass/codemirror.scss: node_modules/codemirror/lib/codemirror.css
	cp $< $@

all: lib/encoder/string/dictionaries/english.json assets/js/stats.min.js _sass/tailwind.scss _sass/codemirror.scss
