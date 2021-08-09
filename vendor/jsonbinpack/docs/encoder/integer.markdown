Integer Encodings
-----------------

### `BOUNDED_8BITS_ENUM_FIXED`

The encoding consists of the integer value minus `minimum` encoded as an 8-bit
fixed-length unsigned integer.

#### Options

| Option    | Type  | Description                 |
|-----------|-------|-----------------------------|
| `minimum` | `int` | The inclusive minimum value |
| `maximum` | `int` | The inclusive maximum value |

#### Conditions

| Condition                    | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum |
| `value <= maximum`           | The input value must be less than or equal to the maximum    |
| `maximum - minimum < 2 ** 8` | The range must be representable in 8 bits                    |

#### Examples

Given the input value 2, where the minimum is -5 and the maximum is 5, the
encoding results in the 8-bit unsigned integer 7 = 2 - (-5):

```
+------+
| 0x07 |
+------+
```

### `FLOOR_ENUM_VARINT`

The encoding consists of the integer value minus `minimum` encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option    | Type  | Description                 |
|-----------|-------|-----------------------------|
| `minimum` | `int` | The inclusive minimum value |

#### Conditions

| Condition                    | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum |

#### Examples

Given the input value 305, where the minimum is 5, the encoding results in the
variable-length encoded integer 300:

```
+------+------+
| 0xac | 0x02 |
+------+------+
```

### `ROOF_MIRROR_ENUM_VARINT`

The encoding consists of `maximum` minus the integer value encoded as a
Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option    | Type  | Description                 |
|-----------|-------|-----------------------------|
| `maximum` | `int` | The inclusive maximum value |

#### Conditions

| Condition                    | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `value <= maximum`           | The input value must be less than or equal to the maximum    |

#### Examples

Given the input value 8, where the maximum is 10, the encoding results in the
variable-length encoded integer 2 = 10 - 8:

```
+------+
| 0x02 |
+------+
```

### `ARBITRARY_ZIGZAG_VARINT`

The encoding consists of the integer value encoded as a ZigZag-encoded Base-128
64-bit Little Endian variable-length unsigned integer.

#### Options

None

#### Conditions

None

#### Examples

The input value -25200 is encoded as the Base-128 64-bit Little Endian
variable-length unsigned integer 50399:

```
+------+------+------+
| 0xdf | 0x89 | 0x03 |
+------+------+------+
```

### `BOUNDED_MULTIPLE_8BITS_ENUM_FIXED`

The encoding consists of the integer value divided by the absolute
`multiplier`, minus the ceil of `minimum` divided by the absolute `multiplier`,
encoded as an 8-bit fixed-length unsigned integer.

#### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `minimum`    | `int` | The inclusive minimum value |
| `maximum`    | `int` | The inclusive maximum value |
| `multiplier` | `int` | The multiplier value        |

#### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum        |
| `value <= maximum`           | The input value must be less than or equal to the maximum           |
| `multiplier >= minimum`      | The multiplier integer must be greater than or equal to the minimum |
| `multiplier <= maximum`      | The multiplier integer must be less than or equal to the maximum    |
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |
| `floor(maximum / abs(multiplier)) - ceil(minimum / abs(multiplier)) < 2 ** 8` | The divided range must be representable in 8 bits |

#### Examples

Given the input value 15, where the minimum is 1, the maximum is 19, and the
multiplier is 5, the encoding results in the 8-bit unsigned integer 2:

```
+------+
| 0x02 |
+------+
```

### `FLOOR_MULTIPLE_ENUM_VARINT`

The encoding consists of the integer value divided by the absolute
`multiplier`, minus the ceil of `minimum` divided by the absolute `multiplier`,
encoded as a Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `minimum`    | `int` | The inclusive minimum value |
| `multiplier` | `int` | The multiplier value        |

#### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value >= minimum`           | The input value must be greater than or equal to the minimum        |
| `multiplier >= minimum`      | The multiplier integer must be greater than or equal to the minimum |
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |

#### Examples

Given the input value 1000, where the minimum is -2 and the multiplier is 4,
the encoding results in the Base-128 64-bit Little Endian variable-length unsigned
integer 250:

```
+------+------+
| 0xfa | 0x01 |
+------+------+
```

### `ROOF_MULTIPLE_MIRROR_ENUM_VARINT`

The encoding consists of the floor of `maximum` divided by the absolute
`multiplier`, minus the integer value divided by the absolute `multiplier`,
encoded as a Base-128 64-bit Little Endian variable-length unsigned integer.

#### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `maximum`    | `int` | The inclusive maximum value |
| `multiplier` | `int` | The multiplier value        |

#### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value <= maximum`           | The input value must be less than or equal to the maximum           |
| `multiplier <= maximum`      | The multiplier integer must be less than or equal to the maximum    |
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |

#### Examples

Given the input value 5, where the maximum is 16 and the multiplier is 5, the
encoding results in the Base-128 64-bit Little Endian variable-length unsigned
integer 2:

```
+------+
| 0x02 |
+------+
```

### `ARBITRARY_MULTIPLE_ZIGZAG_VARINT`

The encoding consists of the the integer value divided by the absolute
`multiplier` encoded as a ZigZag-encoded Base-128 64-bit Little Endian
variable-length unsigned integer.

#### Options

| Option       | Type  | Description                 |
|--------------|-------|-----------------------------|
| `multiplier` | `int` | The multiplier value        |

#### Conditions

| Condition                    | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `value % multiplier == 0`    | The input value must be divisible by the multiplier                 |

#### Examples

Given the input value 10, where the multiplier is 5, the encoding results in
the Base-128 64-bit Little Endian variable-length unsigned integer 4:

```
+------+
| 0x04 |
+------+
```
