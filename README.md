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
| [CircleCI Definition (Blank)](#circleciblank) | tier 1 minified < 100 bytes numeric non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circleciblank/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/circleciconfig/version-2.0.json) |
| [CircleCI Matrix Definition](#circlecimatrix) | tier 1 minified < 100 bytes numeric non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/circlecimatrix/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/circleciconfig/matrix-simple.json) |
| [CommitLint Configuration](#commitlint) | tier 1 minified < 100 bytes textual redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlint/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/commitlintrc/commitlintrc-test5.json) |
| [CommitLint Configuration (Basic)](#commitlintbasic) | tier 1 minified < 100 bytes boolean non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/commitlintbasic/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/commitlintrc/commitlintrc-test3.json) |
| [Entry Point Regulation Manifest](#epr) | tier 2 minified >= 100 < 1000 bytes textual redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/epr/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/epr-manifest/official-example.json) |
| [ESLint Configuration Document](#eslintrc) | tier 3 minified >= 1000 bytes numeric redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/eslintrc/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/eslintrc/WebAnalyzer.json) |
| [ECMAScript Module Loader Definition](#esmrc) | tier 2 minified >= 100 < 1000 bytes boolean non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/esmrc/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/esmrc/.esmrc_.json) |
| [GeoJSON Example Document](#geojson) | tier 2 minified >= 100 < 1000 bytes numeric redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/geojson/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/geojson/multi-polygon.json) |
| [GitHub FUNDING Sponsorship Definition (Empty)](#githubfundingblank) | tier 2 minified >= 100 < 1000 bytes boolean redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubfundingblank/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/github-funding/ebookfoundation.json) |
| [GitHub Workflow Definition](#githubworkflow) | tier 2 minified >= 100 < 1000 bytes textual non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/githubworkflow/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/github-workflow/919.json) |
| [Grunt.js Clean Task Definition](#gruntcontribclean) | tier 1 minified < 100 bytes textual redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/gruntcontribclean/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/grunt-clean-task/with-options.json) |
| [ImageOptimizer Azure Webjob Configuration](#imageoptimizerwebjob) | tier 1 minified < 100 bytes textual non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/imageoptimizerwebjob/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/imageoptimizer/default.json) |
| [JSON-e Templating Engine Reverse Sort Example](#jsonereversesort) | tier 1 minified < 100 bytes numeric redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonereversesort/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/jsone/reverse-sort.json) |
| [JSON-e Templating Engine Sort Example](#jsonesort) | tier 1 minified < 100 bytes numeric redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonesort/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/jsone/sort.json) |
| [JSON Feed Example Document](#jsonfeed) | tier 2 minified >= 100 < 1000 bytes textual non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonfeed/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/feed/microblog.json) |
| [JSON Resume Example](#jsonresume) | tier 3 minified >= 1000 bytes textual non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/jsonresume/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/resume/richardhendriks.json) |
| [.NET Core Project](#netcoreproject) | tier 3 minified >= 1000 bytes textual redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/netcoreproject/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/project/EF-project.json) |
| [Nightwatch.js Test Framework Configuration](#nightwatch) | tier 3 minified >= 1000 bytes boolean redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/nightwatch/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/nightwatch/default.json) |
| [OpenWeatherMap API Example Document](#openweathermap) | tier 2 minified >= 100 < 1000 bytes numeric non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweathermap/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/openweather.current/example.json) |
| [OpenWeather Road Risk API Example](#openweatherroadrisk) | tier 2 minified >= 100 < 1000 bytes numeric non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/openweatherroadrisk/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/openweather.roadrisk/example.json) |
| [NPM Package.json Example Manifest](#packagejson) | tier 3 minified >= 1000 bytes textual non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejson/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/package/package-test.json) |
| [NPM Package.json Linter Configuration Manifest](#packagejsonlintrc) | tier 3 minified >= 1000 bytes textual redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/packagejsonlintrc/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/npmpackagejsonlintrc/npmpackagejsonlintrc-test.json) |
| [SAP Cloud SDK Continuous Delivery Toolkit Configuration](#sapcloudsdkpipeline) | tier 1 minified < 100 bytes boolean redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/sapcloudsdkpipeline/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/cloud-sdk-pipeline-config-schema/empty.json) |
| [TravisCI Notifications Configuration](#travisnotifications) | tier 2 minified >= 100 < 1000 bytes textual redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/travisnotifications/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/travis/notification-secure.json) |
| [TSLint Linter Definition (Basic)](#tslintbasic) | tier 1 minified < 100 bytes boolean non-redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintbasic/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/tslint/tslint-test19.json) |
| [TSLint Linter Definition (Extends Only)](#tslintextend) | tier 1 minified < 100 bytes textual non-redundant flat | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintextend/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/tslint/tslint-test5.json) |
| [TSLint Linter Definition (Multi-rule)](#tslintmulti) | tier 1 minified < 100 bytes boolean redundant nested | [Link](https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/tslintmulti/document.json) | [Link](https://github.com/SchemaStore/schemastore/blob/0b6bd2a08005e6f7a65a68acaf3064d6e2670872/src/test/tslint/tslint-test25.json) |

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

<h3 id="circleciblank">CircleCI Definition (Blank)</h3>

![CircleCI Definition (Blank) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/circleciblank.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 10.375 | 8 | 20 | 7.140 |
| GZIP (compression level 9) | 26.625 | 25 | 8 | 3.160 |
| LZ4 (compression level 9) | 29.125 | 27 | 18 | 6.679 |
| LZMA (compression level 9) | 29.125 | 28 | 9 | 2.976 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 14 | 14 | 8 | 3.317 |
| GZIP (compression level 9) | 33.667 | 34 | 8 | 2.981 |
| LZ4 (compression level 9) | 33 | 33 | 8 | 3.317 |
| LZMA (compression level 9) | 37.333 | 38 | 7 | 2.625 |

![CircleCI Definition (Blank) violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/circleciblank.png)

<h3 id="circlecimatrix">CircleCI Matrix Definition</h3>

![CircleCI Matrix Definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/circlecimatrix.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 44.125 | 29 | 89 | 32.903 |
| GZIP (compression level 9) | 47.500 | 43 | 50 | 14.790 |
| LZ4 (compression level 9) | 55.250 | 48 | 70 | 21.376 |
| LZMA (compression level 9) | 48.500 | 45.500 | 41 | 12.104 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 102.667 | 89.500 | 85 | 32.412 |
| GZIP (compression level 9) | 107.167 | 103.500 | 45 | 16.446 |
| LZ4 (compression level 9) | 116.667 | 108.500 | 60 | 25.011 |
| LZMA (compression level 9) | 107.167 | 104.500 | 41 | 14.713 |

![CircleCI Matrix Definition violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/circlecimatrix.png)

<h3 id="commitlint">CommitLint Configuration</h3>

![CommitLint Configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/commitlint.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 82.250 | 62.500 | 116 | 42.558 |
| GZIP (compression level 9) | 61.875 | 58 | 54 | 15.972 |
| LZ4 (compression level 9) | 73.500 | 66 | 73 | 22.798 |
| LZMA (compression level 9) | 64 | 61.500 | 46 | 13.370 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 93.667 | 87 | 73 | 24.918 |
| GZIP (compression level 9) | 80.667 | 77.500 | 30 | 12.284 |
| LZ4 (compression level 9) | 89.500 | 84 | 36 | 14.021 |
| LZMA (compression level 9) | 83.333 | 81.500 | 29 | 11.353 |

![CommitLint Configuration violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/commitlint.png)

<h3 id="commitlintbasic">CommitLint Configuration (Basic)</h3>

![CommitLint Configuration (Basic) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/commitlintbasic.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 7.125 | 2.500 | 24 | 8.810 |
| GZIP (compression level 9) | 24.375 | 22.500 | 11 | 4.181 |
| LZ4 (compression level 9) | 25.375 | 21.500 | 26 | 8.845 |
| LZMA (compression level 9) | 27 | 25.500 | 11 | 3.674 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 20.333 | 20.500 | 8 | 2.925 |
| GZIP (compression level 9) | 40.167 | 40 | 8 | 2.853 |
| LZ4 (compression level 9) | 39.333 | 39.500 | 8 | 2.925 |
| LZMA (compression level 9) | 44.167 | 43.500 | 8 | 2.967 |

![CommitLint Configuration (Basic) violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/commitlintbasic.png)

<h3 id="epr">Entry Point Regulation Manifest</h3>

![Entry Point Regulation Manifest chart](https://www.jviotti.com/binary-json-size-benchmark/charts/epr.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 318 | 256.500 | 341 | 121.184 |
| GZIP (compression level 9) | 217.625 | 197.500 | 122 | 41.632 |
| LZ4 (compression level 9) | 255.875 | 223.500 | 172 | 58.569 |
| LZMA (compression level 9) | 206.875 | 190 | 106 | 35.059 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 440.333 | 420.500 | 208 | 64.500 |
| GZIP (compression level 9) | 284.500 | 269 | 107 | 35.795 |
| LZ4 (compression level 9) | 340.833 | 318.500 | 111 | 42.132 |
| LZMA (compression level 9) | 277.833 | 263 | 96 | 33.153 |

![Entry Point Regulation Manifest violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/epr.png)

<h3 id="eslintrc">ESLint Configuration Document</h3>

![ESLint Configuration Document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/eslintrc.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 167.125 | 155.500 | 255 | 73.359 |
| GZIP (compression level 9) | 140.750 | 133 | 147 | 46.040 |
| LZ4 (compression level 9) | 167.750 | 160.500 | 221 | 65.019 |
| LZMA (compression level 9) | 136.500 | 128.500 | 134 | 42.620 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 1064 | 1024.500 | 230 | 96.871 |
| GZIP (compression level 9) | 545 | 534.500 | 131 | 43.390 |
| LZ4 (compression level 9) | 745.833 | 725.500 | 112 | 39.897 |
| LZMA (compression level 9) | 565.500 | 554.500 | 97 | 32.968 |

![ESLint Configuration Document violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/eslintrc.png)

<h3 id="esmrc">ECMAScript Module Loader Definition</h3>

![ECMAScript Module Loader Definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/esmrc.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 37.375 | 26.500 | 68 | 25.485 |
| GZIP (compression level 9) | 50.500 | 46.500 | 45 | 14.500 |
| LZ4 (compression level 9) | 53.625 | 45.500 | 63 | 21.136 |
| LZMA (compression level 9) | 52.875 | 51 | 39 | 12.524 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 77.167 | 74 | 32 | 12.549 |
| GZIP (compression level 9) | 91.833 | 90 | 26 | 9.599 |
| LZ4 (compression level 9) | 96.167 | 93 | 32 | 12.549 |
| LZMA (compression level 9) | 94.333 | 92.500 | 27 | 9.826 |

![ECMAScript Module Loader Definition violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/esmrc.png)

<h3 id="geojson">GeoJSON Example Document</h3>

![GeoJSON Example Document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/geojson.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 343 | 290.500 | 475 | 144.554 |
| GZIP (compression level 9) | 131.750 | 115.500 | 120 | 36.779 |
| LZ4 (compression level 9) | 167.500 | 144 | 161 | 50.806 |
| LZMA (compression level 9) | 122 | 106.500 | 103 | 31.064 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 255.833 | 218 | 294 | 101.480 |
| GZIP (compression level 9) | 139 | 128.500 | 76 | 28.384 |
| LZ4 (compression level 9) | 169.167 | 155.500 | 102 | 36.269 |
| LZMA (compression level 9) | 132.667 | 124 | 58 | 23.809 |

![GeoJSON Example Document violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/geojson.png)

<h3 id="githubfundingblank">GitHub FUNDING Sponsorship Definition (Empty)</h3>

![GitHub FUNDING Sponsorship Definition (Empty) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/githubfundingblank.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 31.125 | 21.500 | 52 | 18.114 |
| GZIP (compression level 9) | 47.125 | 41.500 | 35 | 12.752 |
| LZ4 (compression level 9) | 48.750 | 40.500 | 44 | 15.967 |
| LZMA (compression level 9) | 49.625 | 46 | 32 | 11.313 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 133.167 | 131 | 28 | 9.616 |
| GZIP (compression level 9) | 129.167 | 129.500 | 29 | 9.335 |
| LZ4 (compression level 9) | 151.667 | 150 | 25 | 8.654 |
| LZMA (compression level 9) | 139.167 | 138 | 17 | 5.520 |

![GitHub FUNDING Sponsorship Definition (Empty) violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/githubfundingblank.png)

<h3 id="githubworkflow">GitHub Workflow Definition</h3>

![GitHub Workflow Definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/githubworkflow.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 256.875 | 195 | 299 | 114.993 |
| GZIP (compression level 9) | 197.375 | 177 | 122 | 42.661 |
| LZ4 (compression level 9) | 226.250 | 195 | 188 | 63.174 |
| LZMA (compression level 9) | 192.250 | 177 | 104 | 36.338 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 334.667 | 313.500 | 124 | 52.169 |
| GZIP (compression level 9) | 248.333 | 239 | 101 | 33.703 |
| LZ4 (compression level 9) | 298 | 279.500 | 113 | 44.415 |
| LZMA (compression level 9) | 254.167 | 244.500 | 102 | 34.730 |

![GitHub Workflow Definition violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/githubworkflow.png)

<h3 id="gruntcontribclean">Grunt.js Clean Task Definition</h3>

![Grunt.js Clean Task Definition chart](https://www.jviotti.com/binary-json-size-benchmark/charts/gruntcontribclean.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 43.750 | 25 | 103 | 37.019 |
| GZIP (compression level 9) | 46.375 | 39.500 | 48 | 16.248 |
| LZ4 (compression level 9) | 54.375 | 41 | 72 | 24.728 |
| LZMA (compression level 9) | 48.750 | 43.500 | 42 | 14.202 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 77.667 | 73.500 | 45 | 16.819 |
| GZIP (compression level 9) | 88.500 | 86.500 | 35 | 12.148 |
| LZ4 (compression level 9) | 93.500 | 90 | 34 | 13.574 |
| LZMA (compression level 9) | 90.833 | 88.500 | 38 | 12.928 |

![Grunt.js Clean Task Definition violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/gruntcontribclean.png)

<h3 id="imageoptimizerwebjob">ImageOptimizer Azure Webjob Configuration</h3>

![ImageOptimizer Azure Webjob Configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/imageoptimizerwebjob.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 45.500 | 28 | 79 | 31.048 |
| GZIP (compression level 9) | 55.500 | 48 | 39 | 14.629 |
| LZ4 (compression level 9) | 60 | 47 | 61 | 23.500 |
| LZMA (compression level 9) | 57.750 | 52 | 34 | 12.387 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 76.167 | 72 | 41 | 14.916 |
| GZIP (compression level 9) | 88.500 | 86.500 | 27 | 10.720 |
| LZ4 (compression level 9) | 93 | 89 | 39 | 14.468 |
| LZMA (compression level 9) | 88.667 | 87.500 | 27 | 10.094 |

![ImageOptimizer Azure Webjob Configuration violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/imageoptimizerwebjob.png)

<h3 id="jsonereversesort">JSON-e Templating Engine Reverse Sort Example</h3>

![JSON-e Templating Engine Reverse Sort Example chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonereversesort.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 63.875 | 22.500 | 229 | 76.734 |
| GZIP (compression level 9) | 50.875 | 41 | 58 | 19.915 |
| LZ4 (compression level 9) | 59.375 | 41.500 | 96 | 32.821 |
| LZMA (compression level 9) | 51.500 | 42.500 | 54 | 18.228 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 75.667 | 66.500 | 69 | 24.817 |
| GZIP (compression level 9) | 87.333 | 82.500 | 36 | 14.174 |
| LZ4 (compression level 9) | 92.833 | 85.500 | 58 | 21.598 |
| LZMA (compression level 9) | 89.167 | 85.500 | 35 | 12.877 |

![JSON-e Templating Engine Reverse Sort Example violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/jsonereversesort.png)

<h3 id="jsonesort">JSON-e Templating Engine Sort Example</h3>

![JSON-e Templating Engine Sort Example chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonesort.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 20.625 | 12.500 | 39 | 14.899 |
| GZIP (compression level 9) | 35.750 | 31.500 | 22 | 7.677 |
| LZ4 (compression level 9) | 38.500 | 31.500 | 35 | 13.010 |
| LZMA (compression level 9) | 38.125 | 35.500 | 19 | 6.489 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 33.833 | 28.500 | 44 | 15.214 |
| GZIP (compression level 9) | 50 | 48 | 25 | 8.775 |
| LZ4 (compression level 9) | 52 | 47.500 | 39 | 13.528 |
| LZMA (compression level 9) | 53.833 | 52.500 | 20 | 7.221 |

![JSON-e Templating Engine Sort Example violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/jsonesort.png)

<h3 id="jsonfeed">JSON Feed Example Document</h3>

![JSON Feed Example Document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonfeed.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 458.125 | 416 | 186 | 71.273 |
| GZIP (compression level 9) | 285.250 | 265.500 | 93 | 37.519 |
| LZ4 (compression level 9) | 337.500 | 304 | 142 | 54.706 |
| LZMA (compression level 9) | 282.375 | 265 | 83 | 33.087 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 552 | 540 | 81 | 34.409 |
| GZIP (compression level 9) | 350 | 341.500 | 86 | 28.065 |
| LZ4 (compression level 9) | 426.833 | 415.500 | 77 | 28.945 |
| LZMA (compression level 9) | 356 | 347.500 | 69 | 23.944 |

![JSON Feed Example Document violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/jsonfeed.png)

<h3 id="jsonresume">JSON Resume Example</h3>

![JSON Resume Example chart](https://www.jviotti.com/binary-json-size-benchmark/charts/jsonresume.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 2479.125 | 2243 | 1009 | 395.795 |
| GZIP (compression level 9) | 1456.375 | 1377.500 | 404 | 161.848 |
| LZ4 (compression level 9) | 1964.375 | 1846 | 536 | 208.459 |
| LZMA (compression level 9) | 1450 | 1384.500 | 366 | 137.258 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 2905.333 | 2865.500 | 663 | 222.548 |
| GZIP (compression level 9) | 1690.333 | 1629 | 411 | 143.683 |
| LZ4 (compression level 9) | 2297 | 2223 | 397 | 155.296 |
| LZMA (compression level 9) | 1696.833 | 1643 | 354 | 121.171 |

![JSON Resume Example violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/jsonresume.png)

<h3 id="netcoreproject">.NET Core Project</h3>

![.NET Core Project chart](https://www.jviotti.com/binary-json-size-benchmark/charts/netcoreproject.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 370.750 | 289.500 | 394 | 150.329 |
| GZIP (compression level 9) | 158.500 | 157 | 186 | 58.118 |
| LZ4 (compression level 9) | 201.875 | 194.500 | 245 | 78.273 |
| LZMA (compression level 9) | 153 | 153 | 149 | 47.157 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 949 | 921 | 214 | 74.166 |
| GZIP (compression level 9) | 468.500 | 455.500 | 124 | 41.604 |
| LZ4 (compression level 9) | 585.333 | 571.500 | 106 | 36.063 |
| LZMA (compression level 9) | 465 | 451.500 | 118 | 39.648 |

![.NET Core Project violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/netcoreproject.png)

<h3 id="nightwatch">Nightwatch.js Test Framework Configuration</h3>

![Nightwatch.js Test Framework Configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/nightwatch.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 195.250 | 141.500 | 375 | 122.472 |
| GZIP (compression level 9) | 165.750 | 145 | 198 | 63.192 |
| LZ4 (compression level 9) | 186.625 | 155 | 282 | 87.853 |
| LZMA (compression level 9) | 159.250 | 146.500 | 150 | 49.487 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 1237 | 1222 | 299 | 101.423 |
| GZIP (compression level 9) | 703.333 | 676.500 | 229 | 75.832 |
| LZ4 (compression level 9) | 940.167 | 909.500 | 268 | 93.060 |
| LZMA (compression level 9) | 720.500 | 697.500 | 206 | 69.663 |

![Nightwatch.js Test Framework Configuration violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/nightwatch.png)

<h3 id="openweathermap">OpenWeatherMap API Example Document</h3>

![OpenWeatherMap API Example Document chart](https://www.jviotti.com/binary-json-size-benchmark/charts/openweathermap.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 224.875 | 194 | 236 | 77.059 |
| GZIP (compression level 9) | 213.875 | 204 | 144 | 41.017 |
| LZ4 (compression level 9) | 232.875 | 212.500 | 200 | 60.563 |
| LZMA (compression level 9) | 211.750 | 208 | 119 | 32.847 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 459.333 | 425.500 | 278 | 95.878 |
| GZIP (compression level 9) | 395.333 | 385.500 | 155 | 50.543 |
| LZ4 (compression level 9) | 452 | 432 | 197 | 67.629 |
| LZMA (compression level 9) | 386.333 | 375.500 | 144 | 46.974 |

![OpenWeatherMap API Example Document violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/openweathermap.png)

<h3 id="openweatherroadrisk">OpenWeather Road Risk API Example</h3>

![OpenWeather Road Risk API Example chart](https://www.jviotti.com/binary-json-size-benchmark/charts/openweatherroadrisk.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 211.500 | 179.500 | 172 | 59.846 |
| GZIP (compression level 9) | 188.875 | 172.500 | 95 | 30.002 |
| LZ4 (compression level 9) | 210.375 | 186 | 129 | 43.212 |
| LZMA (compression level 9) | 185.375 | 174.500 | 79 | 24.854 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 381.667 | 357.500 | 162 | 57.203 |
| GZIP (compression level 9) | 306 | 297 | 101 | 34.186 |
| LZ4 (compression level 9) | 335.167 | 321 | 123 | 42.444 |
| LZMA (compression level 9) | 290.500 | 284 | 101 | 33.955 |

![OpenWeather Road Risk API Example violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/openweatherroadrisk.png)

<h3 id="packagejson">NPM Package.json Example Manifest</h3>

![NPM Package.json Example Manifest chart](https://www.jviotti.com/binary-json-size-benchmark/charts/packagejson.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 1745.875 | 1584.500 | 770 | 296.205 |
| GZIP (compression level 9) | 924.125 | 896 | 332 | 109.574 |
| LZ4 (compression level 9) | 1211.875 | 1155 | 452 | 150.355 |
| LZMA (compression level 9) | 921.250 | 910 | 244 | 83.510 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 2140.833 | 2083 | 403 | 164.341 |
| GZIP (compression level 9) | 1188.167 | 1152 | 312 | 103.044 |
| LZ4 (compression level 9) | 1572.167 | 1527.500 | 294 | 109.793 |
| LZMA (compression level 9) | 1195.833 | 1160.500 | 282 | 92.854 |

![NPM Package.json Example Manifest violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/packagejson.png)

<h3 id="packagejsonlintrc">NPM Package.json Linter Configuration Manifest</h3>

![NPM Package.json Linter Configuration Manifest chart](https://www.jviotti.com/binary-json-size-benchmark/charts/packagejsonlintrc.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 533.125 | 458 | 759 | 240.859 |
| GZIP (compression level 9) | 145.375 | 125.500 | 213 | 67.578 |
| LZ4 (compression level 9) | 182.750 | 150.500 | 303 | 97.339 |
| LZMA (compression level 9) | 135.375 | 121 | 170 | 52.875 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 1056.333 | 997.500 | 353 | 119.172 |
| GZIP (compression level 9) | 389.833 | 370 | 174 | 60.278 |
| LZ4 (compression level 9) | 508 | 483.500 | 153 | 54.724 |
| LZMA (compression level 9) | 394 | 371.500 | 152 | 52.760 |

![NPM Package.json Linter Configuration Manifest violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/packagejsonlintrc.png)

<h3 id="sapcloudsdkpipeline">SAP Cloud SDK Continuous Delivery Toolkit Configuration</h3>

![SAP Cloud SDK Continuous Delivery Toolkit Configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/sapcloudsdkpipeline.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 7.375 | 4 | 24 | 8.276 |
| GZIP (compression level 9) | 25.875 | 24 | 15 | 5.797 |
| LZ4 (compression level 9) | 25.375 | 23 | 28 | 9.286 |
| LZMA (compression level 9) | 28.125 | 26.500 | 15 | 5.183 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 29.167 | 29 | 12 | 4.017 |
| GZIP (compression level 9) | 47.833 | 47.500 | 7 | 2.672 |
| LZ4 (compression level 9) | 48.167 | 48 | 12 | 4.017 |
| LZMA (compression level 9) | 51.167 | 50.500 | 7 | 2.672 |

![SAP Cloud SDK Continuous Delivery Toolkit Configuration violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/sapcloudsdkpipeline.png)

<h3 id="travisnotifications">TravisCI Notifications Configuration</h3>

![TravisCI Notifications Configuration chart](https://www.jviotti.com/binary-json-size-benchmark/charts/travisnotifications.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 554.875 | 521.500 | 171 | 60.705 |
| GZIP (compression level 9) | 116.500 | 115 | 87 | 26.538 |
| LZ4 (compression level 9) | 134.750 | 132.500 | 113 | 34.741 |
| LZMA (compression level 9) | 112.625 | 110 | 74 | 22.416 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 573.833 | 627 | 471 | 157.541 |
| GZIP (compression level 9) | 168.167 | 161.500 | 67 | 21.474 |
| LZ4 (compression level 9) | 204.833 | 198.500 | 52 | 18.004 |
| LZMA (compression level 9) | 173.167 | 168 | 47 | 15.689 |

![TravisCI Notifications Configuration violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/travisnotifications.png)

<h3 id="tslintbasic">TSLint Linter Definition (Basic)</h3>

![TSLint Linter Definition (Basic) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/tslintbasic.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 18.375 | 8.500 | 59 | 21.089 |
| GZIP (compression level 9) | 29.750 | 27.500 | 32 | 9.549 |
| LZ4 (compression level 9) | 32.750 | 27.500 | 44 | 13.890 |
| LZMA (compression level 9) | 31.250 | 30 | 25 | 7.446 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 61.333 | 59 | 26 | 9.690 |
| GZIP (compression level 9) | 68 | 67 | 14 | 5.416 |
| LZ4 (compression level 9) | 75.833 | 72.500 | 18 | 6.793 |
| LZMA (compression level 9) | 69.833 | 69 | 17 | 5.928 |

![TSLint Linter Definition (Basic) violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/tslintbasic.png)

<h3 id="tslintextend">TSLint Linter Definition (Extends Only)</h3>

![TSLint Linter Definition (Extends Only) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/tslintextend.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 59.375 | 48.500 | 42 | 17.204 |
| GZIP (compression level 9) | 62.500 | 56.500 | 24 | 9.605 |
| LZ4 (compression level 9) | 67.250 | 58.500 | 35 | 14.051 |
| LZMA (compression level 9) | 64.750 | 59.500 | 21 | 8.333 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 63.500 | 61.500 | 23 | 8.221 |
| GZIP (compression level 9) | 70.333 | 69.500 | 16 | 6.368 |
| LZ4 (compression level 9) | 73.167 | 71.500 | 20 | 7.537 |
| LZMA (compression level 9) | 72.333 | 72 | 15 | 6.128 |

![TSLint Linter Definition (Extends Only) violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/tslintextend.png)

<h3 id="tslintmulti">TSLint Linter Definition (Multi-rule)</h3>

![TSLint Linter Definition (Multi-rule) chart](https://www.jviotti.com/binary-json-size-benchmark/charts/tslintmulti.png)

| Serialization Format | Schema | Uncompressed | GZIP (compression level 9) | LZ4 (compression level 9) | LZMA (compression level 9) |
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

#### Schema-driven statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 30.375 | 15.500 | 80 | 30.311 |
| GZIP (compression level 9) | 37.750 | 34 | 47 | 13.800 |
| LZ4 (compression level 9) | 43.250 | 34.500 | 71 | 21.782 |
| LZMA (compression level 9) | 39.625 | 36 | 42 | 12.369 |

#### Schema-less statistics

| Category | Average | Median | Range | Std.dev |
|--------|--------|--------|--------|--------|
| Uncompressed | 83.333 | 79 | 36 | 14.636 |
| GZIP (compression level 9) | 89.667 | 86 | 26 | 9.638 |
| LZ4 (compression level 9) | 97.500 | 93 | 29 | 11.087 |
| LZMA (compression level 9) | 92.167 | 90.500 | 28 | 9.856 |

![TSLint Linter Definition (Multi-rule) violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/tslintmulti.png)


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
