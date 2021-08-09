Number Encodings
----------------

### `DOUBLE_VARINT_TUPLE`

The encoding consists of a sequence of two integers: The signed integer that
results from concatenating the integral part and the decimal part of the
number, if any, as a ZigZag-encoded Base-128 64-bit Little Endian
variable-length unsigned integer; and the position of the decimal mark from the
first digit of the number encoded as a ZigZag-encoded Base-128 64-bit Little
Endian variable-length unsigned integer. The presence of a negative integer
results in left zero-padding.

#### Options

None

#### Conditions

None

#### Examples

Given the input value 3.14, the encoding results in the variable-length integer
628 (the ZigZag encoding of 314) followed by the variable-length integer 2 (the
ZigZag encoding of 1).

```
+------+------+------+
| 0xf4 | 0x04 | 0x02 |
+------+------+------+
```
