.PHONY: run-schemastore

assets/schemastore-byte-size.png: \
	byte-size.gp datasets/schemastore-byte-size.dat
	gnuplot $< > $@

run-schemastore:
	./scripts/schemastore.sh ~/Projects/jsonbinpack/vendor/schemastore
	./scripts/jsonstats.sh ~/Projects/jsonbinpack
