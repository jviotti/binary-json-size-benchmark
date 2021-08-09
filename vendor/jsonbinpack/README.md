[![GitHub Actions](https://github.com/jviotti/jsonbinpack/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/jviotti/jsonbinpack/actions/workflows/nodejs.yml)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

JSON BinPack
============

JSON BinPack is an open-source binary [JSON](https://www.json.org)
serialization format with a strong focus on space efficiency. It can run in
schema-driven and schema-less mode to encode any JSON document given a matching
[JSON Schema 2020-12](http://json-schema.org) definition.

Documentation
-------------

The complete documentation is available at the official website:

https://www.jsonbinpack.org

Building from source
--------------------

Requirements:

- Node.js
- `npm`
- GNU Make

Installing dependencies:

```sh
npm install
```

Compiling the project:

```sh
make
```

Running tests:

```sh
make test
```

Running the linter:

```sh
make lint
```

Contributing
------------

Thanks for your interest in contributing to the project. We welcome
contributions in any of the following areas:

- Add more JSON + JSON Schema test cases in the
  [`test/e2e`](https://github.com/jviotti/jsonbinpack/tree/main/test/e2e)
  directory
- Improve the documentation at
  [`docs`](https://github.com/jviotti/jsonbinpack/tree/main/docs)
- Suggesting new encodings to make JSON BinPack more space-efficient
- Performance improvements, primarily in the encoder
- General bug fixes

Additionally, we are tracking the following major changes:

- [ ] Re-write the encoders in C++ and compile to WebAssembly
- [ ] Generate serialization and deserialization C++ code that does not
  dynamically traverses the encoding schema for runtime performance reasons
- [ ] Support recursive JSON Schema documents
- [ ] Implement support for the `if`, `then`, and `else` JSON Schema keywords
- [ ] Implement support for the `anyOf` JSON keyword
- [ ] Implement support for inline binary blobs defined with the
  `contentEncoding` JSON Schema keyword

Don't hesitate in getting in touch [by creating a
ticket](https://github.com/jviotti/jsonbinpack/issues/new/choose) if you
require any guidance on contributing to the project.

License
-------

This project is released under the terms specified in the
[license](https://github.com/jviotti/jsonbinpack/blob/main/LICENSE).

JSON BinPack has been designed and developed as a research project at
University of Oxford.  The intellectual property is therefore split between its
primary author, [Juan Cruz Viotti](https://www.jviotti.com), and the University
of Oxford.

![University of Oxford logo](./resources/oxford-university.png)
