OneOf Encodings
---------------

### `ONEOF_CHOICE_INDEX_PREFIX`

The encoding consists of the index to the matching branch as a Base-128 64-bit
Little Endian variable-length unsigned integer followed by the input value
encoded as indicated by the `encoding` property of the matching branch.

#### Options

| Option    | Type                    | Description                                          |
|-----------|-------------------------|------------------------------------------------------|
| `choices` | `(schema + encoding)[]` | A `schema` and a matching `encoding` for each branch |

#### Conditions

| Condition                    | Description                                     |
|------------------------------|-------------------------------------------------|
| `len(choices) > 0`           | There must be more than one possible branch     |
| `one(choices) matches value` | One and only one branch matches the input value |

#### Examples

Given an input value 4 and that matches a second branch defined as
[`ROOF_MIRROR_ENUM_VARINT`](./integer.markdown#roof_mirror_enum_varint) with a
maximum of 5, the encoding results in the branch index 1 followed by 1 = 5 - 4:

```
+------+------+
| 0x01 | 0x01 |
+------+------+
```
