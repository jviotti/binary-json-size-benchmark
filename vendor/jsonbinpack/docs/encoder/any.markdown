Any Encodings
-------------

### `ANY_PACKED_TYPE_TAG_BYTE_PREFIX`

The encoding consists of a type tag followed by the input value serialized
using a predetermined encoding. This encoding supports the following type tags:

- `0b00000000` (Shared string): If the byte-length is less than 31, the
	byte-length plus 1 is encoded as an unsigned integer in the most-significant
	5 bits of the type tag followed by the input value as defined in
	[`SHARED_STRING_POINTER_RELATIVE_OFFSET`](./string.markdown#shared_string_pointer_relative_offset).
	Otherwise, the input value is encoded as defined in
	[`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
	where `minimum` is 0.
- `0b00000001` (String): If the byte-length is less than 31, the byte-length
	plus 1 is encoded as an unsigned integer in the most-significant 5 bits of
	the type tag followed by the input value as defined in
	[`UTF8_STRING_NO_LENGTH`](./string.markdown#utf8_string_no_length).
	Otherwise, the type tag is followed by the non-shared input value as defined
	in
	[`FLOOR_PREFIX_LENGTH_ENUM_VARINT`](./string.markdown#floor_prefix_length_enum_varint)
	where `minimum` is 0.
- `0b00000010` (Long string): If the byte-length is greater than or equal to 31
	but less than 62, the byte-length minus 31 is encoded as an unsigned integer
	in the most-significant 5 bits of the type tag followed by the input value as
	defined in
	[`UTF8_STRING_NO_LENGTH`](./string.markdown#utf8_string_no_length).
- `0b00000011` (Object): If the number of pairs is greater than 30, the input
	value is encoded as the type tag followed by
	[`ARBITRARY_TYPED_KEYS_OBJECT`](./object.markdown#arbitrary_typed_keys_object)
	where `keyEncoding` is
	[`STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH`](./string.markdown#string_unbounded_scoped_prefix_length)
	and `encoding` is [`ANY_PACKED_TYPE_TAG_BYTE_PREFIX`](./any.markdown#any_packed_type_tag_byte_prefix).
	Otherwise, the number of pairs plus 1 is encoded as an unsigned integer in
	the most-significant 5 bits of the type tag followed by the input value
	encoded as defined in
	[`ARBITRARY_TYPED_KEYS_OBJECT_WITHOUT_LENGTH`](./object.markdown#arbitrary_typed_keys_object_without_length)
	where `keyEncoding` is
	[`STRING_UNBOUNDED_SCOPED_PREFIX_LENGTH`](./string.markdown#string_unbounded_scoped_prefix_length)
	and `encoding` is [`ANY_PACKED_TYPE_TAG_BYTE_PREFIX`](./any.markdown#any_packed_type_tag_byte_prefix).
- `0b00000100` (Array): If the number of items is greater than 30, the input
	value is encoded as the type tag followed by
	[`FLOOR_TYPED_LENGTH_PREFIX`](./array.markdown#floor_typed_length_prefix)
	where `minimum` is `0`, `prefixEncodings` is `[]`, and `encoding` is
	[`ANY_PACKED_TYPE_TAG_BYTE_PREFIX`](./any.markdown#any_packed_type_tag_byte_prefix). Otherwise, the number of
	items plus 1 is encoded as an unsigned integer in the most-significant 5 bits
	of the type tag followed by the input value encoded as defined in
	[`FIXED_TYPED_ARRAY`](./array.markdown#fixed_typed_array) where
	`prefixEncodings` is `[]` and `encoding` is
	[`ANY_PACKED_TYPE_TAG_BYTE_PREFIX`](./any.markdown#any_packed_type_tag_byte_prefix).
- `0b00000101` (Positive integer byte): If the value is less than 31, the value
	plus 1 is encoded as an unsigned integer in the most-significant 5 bits of
	the type tag. Otherwise, the type tag is followed by the input value as
	defined in
	[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed)
	where `minimum` is 0 and `maximum` is 255.
- `0b00000110` (Negative integer byte): If the absolute value minus 1 is less
	than 31, the absolute value plus 1 is encoded as an unsigned integer in the
	most-significant 5 bits of the type tag. Otherwise, the type tag is followed
	by the absolute input value minus 1 as defined in
	[`BOUNDED_8BITS_ENUM_FIXED`](./integer.markdown#bounded_8bits_enum_fixed)
	where `minimum` is 0 and `maximum` is 255.
- `0b00000111` (False): The `false` constant.
- `0b00001111` (True): The `true` constant.
- `0b00010111` (Null): The `null` constant.
- `0b00011111` (Positive integer): The type tag is followed by the input value
	as defined in [`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint).
- `0b00100111` (Negative integer): The type tag is followed by the absolute
	input value minus 1 as defined in
	[`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint).
- `0b00101111` (Number): The type tag is followed by the input value as defined
	in [`DOUBLE_VARINT_TUPLE`](./number.markdown#double_varint_tuple).
- `0b00111111` (Long string with base exponent 7): The type tag is followed by
	the byte-length of the string as defined in
	[`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint) where `minimum`
	is `2 ** 7` followed by the input value encoded as defined in
	[`UTF8_STRING_NO_LENGTH`](./string.markdown#utf8_string_no_length).
- `0b01000111` (Long string with base exponent 8): The type tag is followed by
	the byte-length of the string as defined in
	[`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint) where `minimum`
	is `2 ** 8` followed by the input value encoded as defined in
	[`UTF8_STRING_NO_LENGTH`](./string.markdown#utf8_string_no_length).
- `0b01001111` (Long string with base exponent 9): The type tag is followed by
	the byte-length of the string as defined in
	[`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint) where `minimum`
	is `2 ** 9` followed by the input value encoded as defined in
	[`UTF8_STRING_NO_LENGTH`](./string.markdown#utf8_string_no_length).
- `0b01010111` (Long string with base exponent 10): The type tag is followed by
	the byte-length of the string as defined in
	[`FLOOR_ENUM_VARINT`](./integer.markdown#floor_enum_varint) where `minimum`
	is `2 ** 10` followed by the input value encoded as defined in
	[`UTF8_STRING_NO_LENGTH`](./string.markdown#utf8_string_no_length).

#### Options

None

#### Conditions

None

#### Examples

Given the input value `[ "foo", true, 2000 ]`, the encoding results in:

```
+------+------+------+------+------+------+------+------+------+
| 0x24 | 0x21 | 0x66 | 0x6f | 0x6f | 0x0f | 0x1f | 0xd0 | 0x0f |
+------+------+------+------+------+------+------+------+------+
                f      o      o      true          ^^^^^^^^^^^
								                                   2000
```
