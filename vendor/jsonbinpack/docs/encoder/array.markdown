Array Encodings
---------------

### `FIXED_TYPED_ARRAY`

The encoding consists of the elements of the fixed array encoded in order. The
encoding of the element at index `i` is either `prefixEncodings[i]` if set, or
`encoding`.

#### Options

| Option            | Type         | Description          |
|-------------------|--------------|----------------------|
| `size`            | `uint`       | The array length     |
| `prefixEncodings` | `encoding[]` | Positional encodings |
| `encoding`        | `encoding`   | Element encoding     |

#### Conditions

| Condition                      | Description                                                           |
|--------------------------------|-----------------------------------------------------------------------|
| `len(prefixEncodings) <= size` | The number of prefix encodings must be less than or equal to the size |
| `len(value) == size`           | The input array must have the declared size                           |

#### Examples

Given the array `[ 1, 2, true ]` where the `prefixEncodings` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) and
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) and
`encoding` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+
| 0x01 | 0x02 | 0x01 |
+------+------+------+
  1      2      true
```

### `FLOOR_TYPED_LENGTH_PREFIX`

The encoding consists of the length of the array minus `minimum` encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer followed by the
elements of the array encoded in order. The encoding of the element at index
`i` is either `prefixEncodings[i]` if set, or `encoding`.

#### Options

| Option            | Type         | Description                     |
|-------------------|--------------|---------------------------------|
| `minimum`         | `uint`       | The minimum length of the array |
| `prefixEncodings` | `encoding[]` | Positional encodings            |
| `encoding`        | `encoding`   | Element encoding                |

#### Conditions

None

#### Examples

Given the array `[ true, false, 5 ]` where the minimum is 2, the
`prefixEncodings` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
`encoding` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+------+
| 0x01 | 0x01 | 0x00 | 0x05 |
+------+------+------+------+
  size   true   false  5
```

### `ROOF_TYPED_LENGTH_PREFIX`

The encoding consists of `maximum` minus the length of the array encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer followed by the
elements of the array encoded in order. The encoding of the element at index
`i` is either `prefixEncodings[i]` if set, or `encoding`.

#### Options

| Option            | Type         | Description                     |
|-------------------|--------------|---------------------------------|
| `maximum`         | `uint`       | The maximum length of the array |
| `prefixEncodings` | `encoding[]` | Positional encodings            |
| `encoding`        | `encoding`   | Element encoding                |

#### Conditions

| Condition                         | Description                                                                           |
|-----------------------------------|---------------------------------------------------------------------------------------|
| `len(prefixEncodings) <= maximum` | The number of prefix encodings must be less than or equal to the maximum array length |

#### Examples

Given the array `[ true, false, 5 ]` where the maximum is 3, the
`prefixEncodings` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
`encoding` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+------+
| 0x00 | 0x01 | 0x00 | 0x05 |
+------+------+------+------+
  size   true   false  5
```

### `BOUNDED_8BITS_TYPED_LENGTH_PREFIX`

If `minimum` equals `maximum`, the encoding consists of the elements of the
array encoded in order. Otherwise, the encoding consists of the length of the
array minus `minimum` encoded as an 8-bit fixed-length unsigned integer
followed by the elements of the array encoded in order. In both cases, the
encoding of the element at index `i` is either `prefixEncodings[i]` if set, or
`encoding`.

#### Options

| Option            | Type         | Description                     |
|-------------------|--------------|---------------------------------|
| `minimum`         | `uint`       | The minimum length of the array |
| `maximum`         | `uint`       | The maximum length of the array |
| `prefixEncodings` | `encoding[]` | Positional encodings |
| `encoding`        | `encoding`   | Element encoding     |

#### Conditions

| Condition                              | Description                                                                           |
|----------------------------------------|---------------------------------------------------------------------------------------|
| `len(value) >= minimum`                | The length of the array must be greater than or equal to the minimum                  |
| `len(value) <= maximum`                | The length of the array must be less than or equal to the maximum                     |
| `len(prefixEncodings) <= maximum`      | The number of prefix encodings must be less than or equal to the maximum array length |
| `len(maximum) - len(minimum) < 2 ** 8` | The array length must be representable in 8 bits                                      |

#### Examples

Given the array `[ true, false, 5 ]` where the minimum is 1 and the maximum is
3, the `prefixEncodings` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
`encoding` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+------+
| 0x02 | 0x01 | 0x00 | 0x05 |
+------+------+------+------+
  size   true   false  5
```

### `BOUNDED_TYPED_LENGTH_PREFIX`

If `minimum` equals `maximum`, the encoding consists of the elements of the
array encoded in order. Otherwise, the encoding consists of the length of the
array minus `minimum` encoded as a Base-128 64-bit Little Endian
variable-length unsigned integer followed by the elements of the array encoded
in order. In both cases, the encoding of the element at index `i` is either
`prefixEncodings[i]` if set, or `encoding`.

#### Options

| Option            | Type         | Description                     |
|-------------------|--------------|---------------------------------|
| `minimum`         | `uint`       | The minimum length of the array |
| `maximum`         | `uint`       | The maximum length of the array |
| `prefixEncodings` | `encoding[]` | Positional encodings            |
| `encoding`        | `encoding`   | Element encoding                |

#### Conditions

| Condition                              | Description                                                                           |
|----------------------------------------|---------------------------------------------------------------------------------------|
| `len(value) >= minimum`                | The length of the array must be greater than or equal to the minimum                  |
| `len(value) <= maximum`                | The length of the array must be less than or equal to the maximum                     |
| `len(prefixEncodings) <= maximum`      | The number of prefix encodings must be less than or equal to the maximum array length |

#### Examples

Given the array `[ true, false, 5 ]` where the minimum is 1 and the maximum is
3, the `prefixEncodings` corresponds to
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
[`BOOLEAN_8BITS_ENUM_FIXED`](./boolean.markdown#boolean_8bits_enum_fixed) and
`encoding` corresponds to
[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed) with
minimum 0 and maximum 255, the encoding results in:

```
+------+------+------+------+
| 0x02 | 0x01 | 0x00 | 0x05 |
+------+------+------+------+
  size   true   false  5
```
