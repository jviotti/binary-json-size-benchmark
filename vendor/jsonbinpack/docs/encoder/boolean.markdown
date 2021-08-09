Boolean Encodings
-----------------

### `BOOLEAN_8BITS_ENUM_FIXED`

The encoding consists of the 8-bit fixed-length constants `0x00` (false) and
`0x01` (true).

#### Options

None

#### Conditions

None

#### Examples

The input value `true` is encoded as follows:

```
+------+
| 0x01 |
+------+
```

The input value `false` is encoded as follows:

```
+------+
| 0x00 |
+------+
```
