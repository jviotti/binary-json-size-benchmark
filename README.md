---
title: Benchmark
permalink: /
---

[![DOI](https://www.zenodo.org/badge/337583132.svg)](https://www.zenodo.org/badge/latestdoi/337583132)

[**JSON documents**](#json-documents) - [**Serialization formats**](#serialization-formats) - [**Results**](#results) - [**Running locally**](#running-locally) - [**GitHub**](https://github.com/jviotti/binary-json-size-benchmark)

A large-scale space-efficiency benchmark of JSON-compatible binary
serialization formats (with and without compression) involving representative
real-world JSON documents.


JSON documents
--------------

This size benchmark utilizes representative real-world JSON documents adapted
from the open-source Apache-2.0
[SchemaStore](https://www.schemastore.org/json/)'s [test
suite](https://github.com/SchemaStore/schemastore/tree/master/src/test). All
the JSON documents used in this benchmark are described in the table below.
The *type* column is based on JSON BinPack's [JSON Stats online
tool](https://www.jsonbinpack.org/stats/).

| Name | Type | Document | SchemaStore |
|------|------|----------|-------------|
| [CircleCI definition (blank)](#circleciblank) | tier 1 minified < 100 bytes numeric non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/circleciconfig/version-2.0.json) |
| [CircleCI matrix definition](#circlecimatrix) | tier 1 minified < 100 bytes numeric non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/circleciconfig/matrix-simple.json) |
| [CommitLint configuration](#commitlint) | tier 1 minified < 100 bytes textual redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/commitlintrc/commitlintrc-test5.json) |
| [CommitLint configuration (basic)](#commitlintbasic) | tier 1 minified < 100 bytes boolean non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/commitlintrc/commitlintrc-test3.json) |
| [Entry Point Regulation manifest](#epr) | tier 2 minified >= 100 < 1000 bytes textual redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/epr-manifest/official-example.json) |
| [ESLint configuration document](#eslintrc) | tier 3 minified >= 1000 bytes numeric redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/eslintrc/WebAnalyzer.json) |
| [ECMAScript module loader definition](#esmrc) | tier 2 minified >= 100 < 1000 bytes boolean non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/esmrc/.esmrc_.json) |
| [GeoJSON example JSON document](#geojson) | tier 2 minified >= 100 < 1000 bytes numeric redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/geojson/multi-polygon.json) |
| [GitHub FUNDING sponsorship definition (empty)](#githubfundingblank) | tier 2 minified >= 100 < 1000 bytes boolean redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/github-funding/ebookfoundation.json) |
| [GitHub Workflow Definition](#githubworkflow) | tier 2 minified >= 100 < 1000 bytes textual non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/github-workflow/919.json) |
| [Grunt.js clean task definition](#gruntcontribclean) | tier 1 minified < 100 bytes textual redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/grunt-clean-task/with-options.json) |
| [ImageOptimizer Azure Webjob configuration](#imageoptimizerwebjob) | tier 1 minified < 100 bytes textual non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/imageoptimizer/default.json) |
| [JSON-e templating engine reverse sort example](#jsonereversesort) | tier 1 minified < 100 bytes numeric redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/jsone/reverse-sort.json) |
| [JSON-e templating engine sort example](#jsonesort) | tier 1 minified < 100 bytes numeric redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/jsone/sort.json) |
| [JSON Feed example document](#jsonfeed) | tier 2 minified >= 100 < 1000 bytes textual non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/feed/microblog.json) |
| [JSON Resume](#jsonresume) | tier 3 minified >= 1000 bytes textual non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/resume/richardhendriks.json) |
| [.NET Core project.json](#netcoreproject) | tier 3 minified >= 1000 bytes textual redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/project/EF-project.json) |
| [Nightwatch.js Test Framework Configuration](#nightwatch) | tier 3 minified >= 1000 bytes boolean redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/nightwatch/default.json) |
| [OpenWeatherMap API example JSON document](#openweathermap) | tier 2 minified >= 100 < 1000 bytes numeric non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/openweather.current/example.json) |
| [OpenWeather Road Risk API example](#openweatherroadrisk) | tier 2 minified >= 100 < 1000 bytes numeric non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/openweather.roadrisk/example.json) |
| [NPM Package.json example manifest](#packagejson) | tier 3 minified >= 1000 bytes textual non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/package/package-test.json) |
| [NPM Package.json Linter configuration manifest](#packagejsonlintrc) | tier 3 minified >= 1000 bytes textual redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/npmpackagejsonlintrc/npmpackagejsonlintrc-test.json) |
| [SAP Cloud SDK Continuous Delivery Toolkit configuration](#sapcloudsdkpipeline) | tier 1 minified < 100 bytes boolean redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/cloud-sdk-pipeline-config-schema/empty.json) |
| [TravisCI notifications configuration](#travisnotifications) | tier 2 minified >= 100 < 1000 bytes textual redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/travis/notification-secure.json) |
| [TSLint linter definition (basic)](#tslintbasic) | tier 1 minified < 100 bytes boolean non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/tslint/tslint-test19.json) |
| [TSLint linter definition (extends only)](#tslintextend) | tier 1 minified < 100 bytes textual non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/tslint/tslint-test5.json) |
| [TSLint linter definition (multi-rule)](#tslintmulti) | tier 1 minified < 100 bytes boolean redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/tslint/tslint-test25.json) |

Serialization formats
---------------------

This benchmark involves the serialization formats, implementations, and
encodings described in the table below.

| Serialization Format | Implementation           | Version | Encodings                       |
|----------------------|--------------------------|---------|---------------------------------|
| ASN.1                | ASN-1Step                | 10.0.2  | PER Unaligned                   |
| Apache Avro          | Python `avro` (pip)      | 1.10.0  | Binary Encoding with no framing |
| Microsoft Bond       | C++                      | 9.0.4   | Compact Binary v1               |
| BSON                 | Node.js `bson` (npm)     | 4.2.2   |                                 |
| Cap'n Proto          | `capnp`                  | 0.8.0   | Packed and Binary               |
| CBOR                 | Python `cbor2` (pip)     | 5.1.2   |                                 |
| FlatBuffers          | `flatc`                  | 1.12.0  | Binary Wire Format              |
| FlexBuffers          | `flatc`                  | 1.12.0  | Binary Wire Format              |
| MessagePack          | `msgpack-tools`          | 0.6     |                                 |
| Protocol Buffers     | Python `protobuf` (pip)  | 3.15.3  | Binary Wire Format              |
| Smile                | Clojure `cheshire`       | 5.10.0  |                                 |
| Apache Thrift        | Python `thrift` (pip)    | 0.13.0  | Compact Protocol                |
| UBJSON               | Python `py-ubjson` (pip) | 0.16.1  |                                 |

Results
-------

<h3 id="circleciblank">CircleCI definition (blank)</h3>

![CircleCI definition (blank) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/circleciblank.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/asn1/schema.asn) | 4 | 24 | 23 | 27 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/avro/schema.json) | 4 | 24 | 23 | 26 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/bond/schema.bond) | 10 | 25 | 29 | 28 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/capnproto/schema.capnp) | 24 | 32 | 41 | 33 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/capnproto-packed/schema.capnp) | 6 | 26 | 25 | 29 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/flatbuffers/schema.fbs) | 20 | 32 | 39 | 35 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/protobuf/schema.proto) | 5 | 25 | 24 | 27 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/thrift/schema.thrift) | 10 | 25 | 29 | 28 |
| JSON | None | 14 | 34 | 33 | 38 |
| BSON | None | 18 | 36 | 37 | 39 |
| CBOR | None | 10 | 30 | 29 | 34 |
| FlexBuffers | None | 18 | 38 | 37 | 41 |
| MessagePack | None | 10 | 30 | 29 | 34 |
| Smile | None | 15 | 35 | 34 | 39 |
| UBJSON | None | 13 | 33 | 32 | 37 |

<h3 id="circlecimatrix">CircleCI matrix definition</h3>

![CircleCI matrix definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/circlecimatrix.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/asn1/schema.asn) | 18 | 36 | 37 | 38 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/avro/schema.json) | 15 | 32 | 34 | 36 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/bond/schema.bond) | 30 | 43 | 49 | 45 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/capnproto/schema.capnp) | 96 | 56 | 72 | 54 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/capnproto-packed/schema.capnp) | 36 | 49 | 54 | 50 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/flatbuffers/schema.fbs) | 104 | 82 | 104 | 77 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/protobuf/schema.proto) | 26 | 43 | 45 | 46 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/thrift/schema.thrift) | 28 | 39 | 47 | 42 |
| JSON | None | 95 | 99 | 112 | 101 |
| BSON | None | 136 | 123 | 150 | 121 |
| CBOR | None | 72 | 89 | 91 | 90 |
| FlexBuffers | None | 157 | 134 | 151 | 131 |
| MessagePack | None | 72 | 90 | 91 | 92 |
| Smile | None | 87 | 104 | 106 | 105 |
| UBJSON | None | 92 | 103 | 111 | 104 |

<h3 id="commitlint">CommitLint configuration</h3>

![CommitLint configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/commitlint.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/asn1/schema.asn) | 50 | 48 | 55 | 52 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/avro/schema.json) | 40 | 41 | 49 | 45 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/bond/schema.bond) | 63 | 56 | 62 | 60 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/capnproto/schema.capnp) | 152 | 75 | 96 | 73 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/capnproto-packed/schema.capnp) | 76 | 67 | 75 | 71 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/flatbuffers/schema.fbs) | 156 | 95 | 122 | 91 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/protobuf/schema.proto) | 62 | 60 | 70 | 63 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/thrift/schema.thrift) | 59 | 53 | 59 | 57 |
| JSON | None | 96 | 80 | 86 | 83 |
| BSON | None | 147 | 97 | 112 | 97 |
| CBOR | None | 74 | 67 | 76 | 70 |
| FlexBuffers | None | 90 | 97 | 105 | 99 |
| MessagePack | None | 74 | 68 | 76 | 71 |
| Smile | None | 84 | 76 | 82 | 80 |
| UBJSON | None | 93 | 79 | 86 | 83 |

<h3 id="commitlintbasic">CommitLint configuration (basic)</h3>

![CommitLint configuration (basic) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/commitlintbasic.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/asn1/schema.asn) | 1 | 21 | 20 | 24 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/avro/schema.json) | 1 | 21 | 20 | 24 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/bond/schema.bond) | 3 | 23 | 22 | 26 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/capnproto/schema.capnp) | 24 | 31 | 41 | 31 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/capnproto-packed/schema.capnp) | 6 | 26 | 25 | 29 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/flatbuffers/schema.fbs) | 20 | 31 | 39 | 34 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/protobuf/schema.proto) | 0 | 20 | 15 | 23 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/thrift/schema.thrift) | 2 | 22 | 21 | 25 |
| JSON | None | 25 | 45 | 44 | 49 |
| BSON | None | 22 | 41 | 41 | 44 |
| CBOR | None | 17 | 37 | 36 | 41 |
| FlexBuffers | None | 25 | 45 | 44 | 49 |
| MessagePack | None | 17 | 37 | 36 | 41 |
| Smile | None | 22 | 42 | 41 | 47 |
| UBJSON | None | 19 | 39 | 38 | 43 |

<h3 id="epr">Entry Point Regulation manifest</h3>

![Entry Point Regulation manifest chart](https://www.jviotti.com/binary-json-size-benchmark/charts/epr.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/asn1/schema.asn) | 231 | 180 | 208 | 175 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/avro/schema.json) | 195 | 168 | 197 | 167 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/bond/schema.bond) | 262 | 199 | 225 | 191 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/capnproto/schema.capnp) | 536 | 261 | 326 | 233 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/capnproto-packed/schema.capnp) | 318 | 255 | 280 | 241 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/flatbuffers/schema.fbs) | 504 | 290 | 369 | 273 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/protobuf/schema.proto) | 247 | 196 | 222 | 189 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/thrift/schema.thrift) | 251 | 192 | 220 | 186 |
| JSON | None | 520 | 264 | 332 | 272 |
| BSON | None | 564 | 304 | 378 | 299 |
| CBOR | None | 412 | 248 | 306 | 246 |
| FlexBuffers | None | 429 | 355 | 417 | 342 |
| MessagePack | None | 412 | 262 | 307 | 254 |
| Smile | None | 356 | 266 | 311 | 261 |
| UBJSON | None | 469 | 272 | 326 | 265 |

<h3 id="eslintrc">ESLint configuration document</h3>

![ESLint configuration document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/eslintrc.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/asn1/schema.asn) | 65 | 81 | 84 | 83 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/avro/schema.json) | 100 | 93 | 107 | 91 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/bond/schema.bond) | 194 | 184 | 212 | 180 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/capnproto/schema.capnp) | 216 | 136 | 181 | 128 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/capnproto-packed/schema.capnp) | 131 | 130 | 141 | 129 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/flatbuffers/schema.fbs) | 320 | 228 | 305 | 217 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/protobuf/schema.proto) | 161 | 164 | 180 | 155 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/thrift/schema.thrift) | 150 | 110 | 132 | 109 |
| JSON | None | 1141 | 488 | 703 | 521 |
| BSON | None | 1184 | 512 | 727 | 539 |
| CBOR | None | 979 | 504 | 717 | 544 |
| FlexBuffers | None | 1201 | 635 | 824 | 636 |
| MessagePack | None | 971 | 525 | 712 | 546 |
| Smile | None | 979 | 544 | 724 | 565 |
| UBJSON | None | 1070 | 550 | 771 | 563 |

<h3 id="esmrc">ECMAScript module loader definition</h3>

![ECMAScript module loader definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/esmrc.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/asn1/schema.asn) | 12 | 32 | 31 | 35 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/avro/schema.json) | 16 | 36 | 35 | 39 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/bond/schema.bond) | 29 | 49 | 48 | 54 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/capnproto/schema.capnp) | 80 | 68 | 82 | 67 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/capnproto-packed/schema.capnp) | 35 | 55 | 54 | 59 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/flatbuffers/schema.fbs) | 80 | 77 | 94 | 74 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/protobuf/schema.proto) | 23 | 43 | 42 | 47 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/thrift/schema.thrift) | 24 | 44 | 43 | 48 |
| JSON | None | 102 | 101 | 117 | 103 |
| BSON | None | 96 | 101 | 115 | 105 |
| CBOR | None | 64 | 81 | 83 | 82 |
| FlexBuffers | None | 91 | 107 | 110 | 109 |
| MessagePack | None | 64 | 82 | 83 | 85 |
| Smile | None | 70 | 87 | 89 | 91 |
| UBJSON | None | 78 | 93 | 97 | 94 |

<h3 id="geojson">GeoJSON example JSON document</h3>

![GeoJSON example JSON document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/geojson.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/asn1/schema.asn) | 205 | 105 | 136 | 103 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/avro/schema.json) | 283 | 100 | 130 | 92 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/bond/schema.bond) | 298 | 116 | 143 | 106 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/capnproto/schema.capnp) | 448 | 146 | 197 | 132 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/capnproto-packed/schema.capnp) | 228 | 142 | 162 | 137 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/flatbuffers/schema.fbs) | 680 | 220 | 291 | 195 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/protobuf/schema.proto) | 325 | 115 | 145 | 107 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/thrift/schema.thrift) | 277 | 110 | 136 | 104 |
| JSON | None | 190 | 121 | 146 | 116 |
| BSON | None | 456 | 187 | 234 | 167 |
| CBOR | None | 172 | 112 | 138 | 109 |
| FlexBuffers | None | 309 | 167 | 200 | 163 |
| MessagePack | None | 162 | 111 | 132 | 109 |
| Smile | None | 228 | 131 | 158 | 128 |
| UBJSON | None | 208 | 126 | 153 | 120 |

<h3 id="githubfundingblank">GitHub FUNDING sponsorship definition (empty)</h3>

![GitHub FUNDING sponsorship definition (empty) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/githubfundingblank.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/asn1/schema.asn) | 16 | 36 | 35 | 39 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/avro/schema.json) | 16 | 36 | 35 | 39 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/bond/schema.bond) | 49 | 64 | 68 | 64 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/capnproto/schema.capnp) | 40 | 50 | 56 | 51 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/capnproto-packed/schema.capnp) | 25 | 45 | 44 | 50 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/flatbuffers/schema.fbs) | 68 | 71 | 79 | 71 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/protobuf/schema.proto) | 17 | 37 | 36 | 41 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/thrift/schema.thrift) | 18 | 38 | 37 | 42 |
| JSON | None | 183 | 134 | 167 | 144 |
| BSON | None | 133 | 125 | 152 | 137 |
| CBOR | None | 124 | 114 | 143 | 131 |
| FlexBuffers | None | 152 | 143 | 168 | 148 |
| MessagePack | None | 124 | 124 | 143 | 136 |
| Smile | None | 129 | 134 | 148 | 139 |
| UBJSON | None | 137 | 135 | 156 | 144 |

<h3 id="githubworkflow">GitHub Workflow Definition</h3>

![GitHub Workflow Definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/githubworkflow.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/asn1/schema.asn) | 165 | 154 | 172 | 152 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/avro/schema.json) | 167 | 153 | 164 | 153 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/bond/schema.bond) | 201 | 178 | 195 | 179 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/capnproto/schema.capnp) | 464 | 241 | 299 | 223 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/capnproto-packed/schema.capnp) | 242 | 232 | 247 | 230 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/flatbuffers/schema.fbs) | 440 | 275 | 352 | 256 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/protobuf/schema.proto) | 189 | 176 | 195 | 175 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/thrift/schema.thrift) | 187 | 170 | 186 | 170 |
| JSON | None | 356 | 228 | 292 | 247 |
| BSON | None | 411 | 273 | 347 | 278 |
| CBOR | None | 288 | 208 | 257 | 216 |
| FlexBuffers | None | 396 | 309 | 369 | 318 |
| MessagePack | None | 287 | 222 | 256 | 224 |
| Smile | None | 287 | 235 | 268 | 240 |
| UBJSON | None | 339 | 243 | 291 | 249 |

<h3 id="gruntcontribclean">Grunt.js clean task definition</h3>

![Grunt.js clean task definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/gruntcontribclean.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/asn1/schema.asn) | 13 | 29 | 32 | 32 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/avro/schema.json) | 16 | 31 | 35 | 34 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/bond/schema.bond) | 27 | 41 | 43 | 46 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/capnproto/schema.capnp) | 96 | 66 | 85 | 66 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/capnproto-packed/schema.capnp) | 39 | 53 | 58 | 56 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/flatbuffers/schema.fbs) | 116 | 77 | 104 | 74 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/protobuf/schema.proto) | 20 | 36 | 39 | 41 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/thrift/schema.thrift) | 23 | 38 | 39 | 41 |
| JSON | None | 93 | 94 | 106 | 95 |
| BSON | None | 105 | 97 | 110 | 98 |
| CBOR | None | 60 | 75 | 79 | 77 |
| FlexBuffers | None | 94 | 110 | 113 | 115 |
| MessagePack | None | 60 | 76 | 79 | 78 |
| Smile | None | 70 | 85 | 88 | 88 |
| UBJSON | None | 77 | 88 | 92 | 89 |

<h3 id="imageoptimizerwebjob">ImageOptimizer Azure Webjob configuration</h3>

![ImageOptimizer Azure Webjob configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/imageoptimizerwebjob.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/asn1/schema.asn) | 21 | 41 | 40 | 45 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/avro/schema.json) | 24 | 44 | 43 | 47 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/bond/schema.bond) | 30 | 50 | 49 | 54 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/capnproto/schema.capnp) | 96 | 76 | 97 | 72 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/capnproto-packed/schema.capnp) | 44 | 64 | 63 | 68 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/flatbuffers/schema.fbs) | 100 | 80 | 101 | 79 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/protobuf/schema.proto) | 23 | 43 | 42 | 47 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/thrift/schema.thrift) | 26 | 46 | 45 | 50 |
| JSON | None | 82 | 88 | 96 | 90 |
| BSON | None | 102 | 103 | 117 | 100 |
| CBOR | None | 61 | 76 | 78 | 76 |
| FlexBuffers | None | 89 | 102 | 107 | 103 |
| MessagePack | None | 61 | 77 | 78 | 78 |
| Smile | None | 70 | 86 | 88 | 88 |
| UBJSON | None | 74 | 87 | 90 | 87 |

<h3 id="jsonereversesort">JSON-e templating engine reverse sort example</h3>

![JSON-e templating engine reverse sort example chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonereversesort.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/asn1/schema.asn) | 15 | 31 | 34 | 33 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/avro/schema.json) | 11 | 31 | 30 | 34 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/bond/schema.bond) | 23 | 41 | 42 | 42 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/capnproto/schema.capnp) | 240 | 72 | 100 | 68 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/capnproto-packed/schema.capnp) | 43 | 63 | 62 | 65 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/flatbuffers/schema.fbs) | 136 | 89 | 126 | 87 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/protobuf/schema.proto) | 21 | 41 | 40 | 43 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/thrift/schema.thrift) | 22 | 39 | 41 | 40 |
| JSON | None | 86 | 86 | 99 | 88 |
| BSON | None | 121 | 104 | 129 | 101 |
| CBOR | None | 53 | 73 | 72 | 76 |
| FlexBuffers | None | 95 | 109 | 114 | 111 |
| MessagePack | None | 52 | 73 | 71 | 76 |
| Smile | None | 63 | 82 | 82 | 84 |
| UBJSON | None | 70 | 83 | 89 | 87 |

<h3 id="jsonesort">JSON-e templating engine sort example</h3>

![JSON-e templating engine sort example chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonesort.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/asn1/schema.asn) | 13 | 30 | 32 | 32 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/avro/schema.json) | 9 | 29 | 28 | 32 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/bond/schema.bond) | 12 | 32 | 31 | 36 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/capnproto/schema.capnp) | 48 | 45 | 58 | 45 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/capnproto-packed/schema.capnp) | 18 | 38 | 37 | 41 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/flatbuffers/schema.fbs) | 44 | 51 | 63 | 51 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/protobuf/schema.proto) | 10 | 30 | 29 | 33 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/thrift/schema.thrift) | 11 | 31 | 30 | 35 |
| JSON | None | 34 | 54 | 53 | 58 |
| BSON | None | 65 | 66 | 79 | 66 |
| CBOR | None | 21 | 41 | 40 | 46 |
| FlexBuffers | None | 39 | 56 | 58 | 60 |
| MessagePack | None | 21 | 41 | 40 | 46 |
| Smile | None | 27 | 48 | 46 | 52 |
| UBJSON | None | 30 | 48 | 49 | 53 |

<h3 id="jsonfeed">JSON Feed example document</h3>

![JSON Feed example document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonfeed.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/asn1/schema.asn) | 398 | 247 | 287 | 248 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/avro/schema.json) | 400 | 247 | 289 | 248 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/bond/schema.bond) | 417 | 270 | 306 | 266 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/capnproto/schema.capnp) | 568 | 329 | 416 | 315 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/capnproto-packed/schema.capnp) | 470 | 329 | 369 | 326 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/flatbuffers/schema.fbs) | 584 | 340 | 429 | 331 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/protobuf/schema.proto) | 413 | 261 | 302 | 264 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/thrift/schema.thrift) | 415 | 259 | 302 | 261 |
| JSON | None | 573 | 327 | 418 | 341 |
| BSON | None | 596 | 360 | 454 | 373 |
| CBOR | None | 523 | 320 | 403 | 331 |
| FlexBuffers | None | 598 | 406 | 475 | 400 |
| MessagePack | None | 517 | 331 | 398 | 337 |
| Smile | None | 521 | 335 | 403 | 341 |
| UBJSON | None | 557 | 348 | 428 | 354 |

<h3 id="jsonresume">JSON Resume</h3>

![JSON Resume chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonresume.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/asn1/schema.asn) | 2143 | 1282 | 1754 | 1302 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/avro/schema.json) | 2162 | 1296 | 1772 | 1316 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/bond/schema.bond) | 2256 | 1385 | 1860 | 1398 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/capnproto/schema.capnp) | 3152 | 1627 | 2230 | 1566 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/capnproto-packed/schema.capnp) | 2549 | 1668 | 2162 | 1668 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/flatbuffers/schema.fbs) | 3116 | 1686 | 2290 | 1627 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/protobuf/schema.proto) | 2225 | 1370 | 1832 | 1371 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/thrift/schema.thrift) | 2230 | 1337 | 1815 | 1352 |
| JSON | None | 3048 | 1556 | 2204 | 1586 |
| BSON | None | 3283 | 1782 | 2449 | 1762 |
| CBOR | None | 2754 | 1555 | 2164 | 1582 |
| FlexBuffers | None | 3049 | 1966 | 2560 | 1936 |
| MessagePack | None | 2749 | 1600 | 2163 | 1615 |
| Smile | None | 2620 | 1581 | 2169 | 1621 |
| UBJSON | None | 2977 | 1658 | 2277 | 1665 |

<h3 id="netcoreproject">.NET Core project.json</h3>

![.NET Core project.json chart](https://www.jviotti.com/binary-json-size-benchmark/charts/netcoreproject.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/asn1/schema.asn) | 242 | 93 | 120 | 98 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/avro/schema.json) | 242 | 93 | 120 | 98 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/bond/schema.bond) | 295 | 159 | 194 | 154 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/capnproto/schema.capnp) | 608 | 195 | 269 | 180 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/capnproto-packed/schema.capnp) | 376 | 181 | 215 | 180 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/flatbuffers/schema.fbs) | 636 | 279 | 365 | 247 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/protobuf/schema.proto) | 284 | 155 | 195 | 152 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/thrift/schema.thrift) | 283 | 113 | 137 | 115 |
| JSON | None | 1049 | 411 | 548 | 425 |
| BSON | None | 1084 | 442 | 577 | 453 |
| CBOR | None | 923 | 435 | 566 | 434 |
| FlexBuffers | None | 890 | 559 | 664 | 552 |
| MessagePack | None | 919 | 458 | 565 | 443 |
| Smile | None | 870 | 453 | 558 | 450 |
| UBJSON | None | 1008 | 464 | 582 | 458 |

<h3 id="nightwatch">Nightwatch.js Test Framework Configuration</h3>

![Nightwatch.js Test Framework Configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/nightwatch.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/asn1/schema.asn) | 89 | 105 | 108 | 108 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/avro/schema.json) | 92 | 104 | 111 | 107 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/bond/schema.bond) | 221 | 226 | 237 | 219 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/capnproto/schema.capnp) | 304 | 170 | 209 | 158 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/capnproto-packed/schema.capnp) | 149 | 148 | 157 | 151 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/flatbuffers/schema.fbs) | 464 | 302 | 390 | 257 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/protobuf/schema.proto) | 109 | 129 | 128 | 132 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/thrift/schema.thrift) | 134 | 142 | 153 | 142 |
| JSON | None | 1507 | 649 | 926 | 682 |
| BSON | None | 1327 | 666 | 933 | 694 |
| CBOR | None | 1176 | 640 | 874 | 667 |
| FlexBuffers | None | 1389 | 869 | 1140 | 873 |
| MessagePack | None | 1172 | 670 | 872 | 678 |
| Smile | None | 1090 | 683 | 886 | 701 |
| UBJSON | None | 1268 | 692 | 936 | 710 |

<h3 id="openweathermap">OpenWeatherMap API example JSON document</h3>

![OpenWeatherMap API example JSON document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/openweathermap.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/asn1/schema.asn) | 165 | 179 | 184 | 183 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/avro/schema.json) | 148 | 163 | 167 | 166 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/bond/schema.bond) | 197 | 209 | 216 | 213 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/capnproto/schema.capnp) | 320 | 236 | 288 | 222 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/capnproto-packed/schema.capnp) | 206 | 219 | 225 | 220 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/flatbuffers/schema.fbs) | 384 | 307 | 367 | 285 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/protobuf/schema.proto) | 188 | 199 | 207 | 203 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/thrift/schema.thrift) | 191 | 199 | 209 | 202 |
| JSON | None | 494 | 341 | 470 | 361 |
| BSON | None | 480 | 394 | 471 | 395 |
| CBOR | None | 383 | 347 | 394 | 339 |
| FlexBuffers | None | 660 | 502 | 590 | 483 |
| MessagePack | None | 382 | 358 | 393 | 350 |
| Smile | None | 412 | 389 | 418 | 372 |
| UBJSON | None | 439 | 382 | 446 | 379 |

<h3 id="openweatherroadrisk">OpenWeather Road Risk API example</h3>

![OpenWeather Road Risk API example chart](https://www.jviotti.com/binary-json-size-benchmark/charts/openweatherroadrisk.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/asn1/schema.asn) | 176 | 168 | 184 | 163 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/avro/schema.json) | 156 | 156 | 168 | 156 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/bond/schema.bond) | 182 | 174 | 188 | 176 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/capnproto/schema.capnp) | 296 | 216 | 265 | 203 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/capnproto-packed/schema.capnp) | 204 | 204 | 214 | 205 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/flatbuffers/schema.fbs) | 328 | 251 | 297 | 235 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/protobuf/schema.proto) | 173 | 171 | 183 | 172 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/thrift/schema.thrift) | 177 | 171 | 184 | 173 |
| JSON | None | 375 | 250 | 302 | 252 |
| BSON | None | 422 | 315 | 354 | 303 |
| CBOR | None | 340 | 275 | 298 | 256 |
| FlexBuffers | None | 488 | 376 | 420 | 357 |
| MessagePack | None | 339 | 276 | 297 | 259 |
| Smile | None | 326 | 299 | 324 | 290 |
| UBJSON | None | 375 | 295 | 318 | 278 |

<h3 id="packagejson">NPM Package.json example manifest</h3>

![NPM Package.json example manifest chart](https://www.jviotti.com/binary-json-size-benchmark/charts/packagejson.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/asn1/schema.asn) | 1498 | 801 | 1061 | 820 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/avro/schema.json) | 1500 | 800 | 1060 | 820 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/bond/schema.bond) | 1588 | 904 | 1161 | 917 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/capnproto/schema.capnp) | 2216 | 1007 | 1363 | 977 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/capnproto-packed/schema.capnp) | 1755 | 1013 | 1281 | 1009 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/flatbuffers/schema.fbs) | 2268 | 1132 | 1512 | 1064 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/protobuf/schema.proto) | 1581 | 888 | 1149 | 903 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/thrift/schema.thrift) | 1561 | 848 | 1108 | 860 |
| JSON | None | 2259 | 1093 | 1520 | 1129 |
| BSON | None | 2386 | 1228 | 1660 | 1236 |
| CBOR | None | 1990 | 1083 | 1478 | 1099 |
| FlexBuffers | None | 2320 | 1395 | 1767 | 1381 |
| MessagePack | None | 1995 | 1131 | 1483 | 1143 |
| Smile | None | 1983 | 1119 | 1473 | 1138 |
| UBJSON | None | 2171 | 1173 | 1572 | 1178 |

<h3 id="packagejsonlintrc">NPM Package.json Linter configuration manifest</h3>

![NPM Package.json Linter configuration manifest chart](https://www.jviotti.com/binary-json-size-benchmark/charts/packagejsonlintrc.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/asn1/schema.asn) | 369 | 84 | 97 | 87 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/avro/schema.json) | 201 | 75 | 86 | 78 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/bond/schema.bond) | 462 | 177 | 235 | 161 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/capnproto/schema.capnp) | 880 | 131 | 165 | 123 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/capnproto-packed/schema.capnp) | 519 | 120 | 136 | 119 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/flatbuffers/schema.fbs) | 960 | 288 | 389 | 248 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/protobuf/schema.proto) | 454 | 197 | 252 | 172 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/thrift/schema.thrift) | 420 | 91 | 102 | 95 |
| JSON | None | 1159 | 321 | 441 | 344 |
| BSON | None | 1295 | 348 | 478 | 366 |
| CBOR | None | 993 | 349 | 477 | 358 |
| FlexBuffers | None | 942 | 522 | 629 | 510 |
| MessagePack | None | 989 | 366 | 476 | 365 |
| Smile | None | 1002 | 380 | 499 | 388 |
| UBJSON | None | 1117 | 374 | 489 | 377 |

<h3 id="sapcloudsdkpipeline">SAP Cloud SDK Continuous Delivery Toolkit configuration</h3>

![SAP Cloud SDK Continuous Delivery Toolkit configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/sapcloudsdkpipeline.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/asn1/schema.asn) | 1 | 21 | 20 | 24 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/avro/schema.json) | 0 | 20 | 15 | 23 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/bond/schema.bond) | 10 | 30 | 29 | 32 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/capnproto/schema.capnp) | 16 | 33 | 35 | 32 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/capnproto-packed/schema.capnp) | 7 | 27 | 26 | 29 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/flatbuffers/schema.fbs) | 24 | 35 | 43 | 38 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/protobuf/schema.proto) | 0 | 20 | 15 | 23 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/thrift/schema.thrift) | 1 | 21 | 20 | 24 |
| JSON | None | 44 | 50 | 58 | 55 |
| BSON | None | 29 | 46 | 48 | 49 |
| CBOR | None | 25 | 45 | 44 | 48 |
| FlexBuffers | None | 37 | 52 | 56 | 55 |
| MessagePack | None | 25 | 45 | 44 | 49 |
| Smile | None | 30 | 50 | 49 | 54 |
| UBJSON | None | 29 | 49 | 48 | 52 |

<h3 id="travisnotifications">TravisCI notifications configuration</h3>

![TravisCI notifications configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/travisnotifications.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/asn1/schema.asn) | 497 | 88 | 102 | 90 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/avro/schema.json) | 504 | 90 | 103 | 91 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/bond/schema.bond) | 522 | 116 | 132 | 111 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/capnproto/schema.capnp) | 640 | 129 | 152 | 120 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/capnproto-packed/schema.capnp) | 566 | 125 | 135 | 120 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/flatbuffers/schema.fbs) | 668 | 175 | 215 | 164 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/protobuf/schema.proto) | 521 | 114 | 133 | 109 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/thrift/schema.thrift) | 521 | 95 | 106 | 96 |
| JSON | None | 673 | 154 | 195 | 164 |
| BSON | None | 699 | 160 | 204 | 167 |
| CBOR | None | 627 | 147 | 192 | 160 |
| FlexBuffers | None | 228 | 214 | 244 | 207 |
| MessagePack | None | 627 | 157 | 192 | 163 |
| Smile | None | 604 | 168 | 199 | 173 |
| UBJSON | None | 658 | 163 | 198 | 169 |

<h3 id="tslintbasic">TSLint linter definition (basic)</h3>

![TSLint linter definition (basic) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/tslintbasic.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/asn1/schema.asn) | 1 | 21 | 20 | 24 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/avro/schema.json) | 1 | 21 | 20 | 24 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/bond/schema.bond) | 9 | 27 | 28 | 29 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/capnproto/schema.capnp) | 48 | 33 | 45 | 34 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/capnproto-packed/schema.capnp) | 12 | 29 | 31 | 31 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/flatbuffers/schema.fbs) | 60 | 53 | 64 | 49 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/protobuf/schema.proto) | 8 | 28 | 27 | 31 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/thrift/schema.thrift) | 8 | 26 | 27 | 28 |
| JSON | None | 67 | 68 | 74 | 70 |
| BSON | None | 71 | 74 | 82 | 74 |
| CBOR | None | 51 | 62 | 70 | 63 |
| FlexBuffers | None | 77 | 76 | 88 | 80 |
| MessagePack | None | 51 | 62 | 70 | 64 |
| Smile | None | 59 | 68 | 73 | 71 |
| UBJSON | None | 59 | 66 | 72 | 67 |

<h3 id="tslintextend">TSLint linter definition (extends only)</h3>

![TSLint linter definition (extends only) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/tslintextend.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/asn1/schema.asn) | 46 | 54 | 56 | 57 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/avro/schema.json) | 47 | 55 | 57 | 58 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/bond/schema.bond) | 49 | 57 | 59 | 60 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/capnproto/schema.capnp) | 88 | 77 | 90 | 75 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/capnproto-packed/schema.capnp) | 62 | 68 | 70 | 73 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/flatbuffers/schema.fbs) | 88 | 78 | 91 | 78 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/protobuf/schema.proto) | 47 | 55 | 57 | 58 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/thrift/schema.thrift) | 48 | 56 | 58 | 59 |
| JSON | None | 63 | 70 | 72 | 73 |
| BSON | None | 78 | 79 | 85 | 80 |
| CBOR | None | 55 | 63 | 65 | 65 |
| FlexBuffers | None | 70 | 78 | 81 | 80 |
| MessagePack | None | 55 | 63 | 65 | 65 |
| Smile | None | 61 | 69 | 71 | 72 |
| UBJSON | None | 62 | 70 | 72 | 72 |

<h3 id="tslintmulti">TSLint linter definition (multi-rule)</h3>

![TSLint linter definition (multi-rule) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/tslintmulti.png)

| Serialization Format | Schema | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |
|----------------------|--------|--------------|-----------|----------|-----------|
| ASN.1 (PER Unaligned) | [`schema.asn`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/asn1/schema.asn) | 4 | 24 | 23 | 27 |
| Apache Avro (unframed) | [`schema.json`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/avro/schema.json) | 7 | 27 | 26 | 29 |
| Microsoft Bond (Compact Binary v1) | [`schema.bond`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/bond/schema.bond) | 17 | 34 | 36 | 36 |
| Cap'n Proto (Binary Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/capnproto/schema.capnp) | 80 | 44 | 59 | 45 |
| Cap'n Proto (Packed Encoding) | [`schema.capnp`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/capnproto-packed/schema.capnp) | 23 | 37 | 42 | 41 |
| FlatBuffers | [`schema.fbs`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/flatbuffers/schema.fbs) | 84 | 71 | 94 | 69 |
| Protocol Buffers (Binary Wire Format) | [`schema.proto`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/protobuf/schema.proto) | 14 | 34 | 33 | 36 |
| Apache Thrift (Compact Protocol) | [`schema.thrift`](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/thrift/schema.thrift) | 14 | 31 | 33 | 34 |
| JSON | None | 98 | 90 | 99 | 92 |
| BSON | None | 104 | 99 | 109 | 100 |
| CBOR | None | 68 | 80 | 87 | 81 |
| FlexBuffers | None | 102 | 106 | 116 | 109 |
| MessagePack | None | 68 | 81 | 87 | 82 |
| Smile | None | 78 | 88 | 92 | 92 |
| UBJSON | None | 80 | 84 | 94 | 89 |


Running locally
---------------

The benchmark has only been ran on macOS and GNU/Linux. The following
dependencies must be available in order to locally run the benchmark:

- GNU Make
- Awk
- CMake
- Clojure's `clj` command line tool
- Python 3 and `pip`
- Node.js
- `clang`
- `gzip`
- XZ Utils
- `xxd`
- `jq`

Build the project dependencies by running the following command:

```sh
make deps
```

The benchmark can then be ran locally using the following command:

```sh
make all
```

Running the benchmark including the ASN.1 serialization formats requires
setting the `ASN1STEP` variable to the path to a license-activated `asn1step`
instance. For example:

```sh
make all ASN1STEP=/Applications/asn1step/asn1step/macosx-x86-64.trial/10.0.2/bin/asn1step
```

License
-------

This work is released under the Apache-2.0 license.
