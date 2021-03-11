# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: schema.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='schema.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n\x0cschema.proto\"\x18\n\x07Options\x12\r\n\x05items\x18\x01 \x03(\t\"\x1f\n\x0e\x42ooleanOptions\x12\r\n\x05items\x18\x01 \x03(\x08\"p\n\x0b\x43omplexRule\x12\x11\n\x07textual\x18\x01 \x01(\tH\x00\x12\x1b\n\x07options\x18\x02 \x01(\x0b\x32\x08.OptionsH\x00\x12)\n\x0e\x62ooleanOptions\x18\x03 \x01(\x0b\x32\x0f.BooleanOptionsH\x00\x42\x06\n\x04kind\"\xdb\x07\n\x05Rules\x12\x15\n\rrequireAuthor\x18\x01 \x01(\t\x12\x1a\n\x12requireDescription\x18\x02 \x01(\t\x12\x16\n\x0erequireEngines\x18\x03 \x01(\t\x12\x16\n\x0erequireLicense\x18\x04 \x01(\t\x12\x13\n\x0brequireName\x18\x05 \x01(\t\x12\x19\n\x11requireRepository\x18\x06 \x01(\t\x12\x16\n\x0erequireVersion\x18\x07 \x01(\t\x12\x13\n\x0brequireBugs\x18\x08 \x01(\t\x12\x17\n\x0frequireHomepage\x18\t \x01(\t\x12\x17\n\x0frequireKeywords\x18\n \x01(\t\x12\x0f\n\x07\x62inType\x18\x0b \x01(\t\x12\x12\n\nconfigType\x18\x0c \x01(\t\x12\x17\n\x0f\x64\x65scriptionType\x18\r \x01(\t\x12\x1b\n\x13\x64\x65vDependenciesType\x18\x0e \x01(\t\x12\x17\n\x0f\x64irectoriesType\x18\x0f \x01(\t\x12\x13\n\x0b\x65nginesType\x18\x10 \x01(\t\x12\x11\n\tfilesType\x18\x11 \x01(\t\x12\x14\n\x0chomepageType\x18\x12 \x01(\t\x12\x14\n\x0ckeywordsType\x18\x13 \x01(\t\x12\x13\n\x0blicenseType\x18\x14 \x01(\t\x12\x10\n\x08mainType\x18\x15 \x01(\t\x12\x0f\n\x07manType\x18\x16 \x01(\t\x12\x10\n\x08nameType\x18\x17 \x01(\t\x12\x18\n\x10preferGlobalType\x18\x18 \x01(\t\x12\x13\n\x0bprivateType\x18\x19 \x01(\t\x12\x16\n\x0erepositoryType\x18\x1a \x01(\t\x12\x13\n\x0bscriptsType\x18\x1b \x01(\t\x12\x13\n\x0bversionType\x18\x1c \x01(\t\x12\'\n\x11validValuesAuthor\x18\x1d \x03(\x0b\x32\x0c.ComplexRule\x12(\n\x12validValuesPrivate\x18\x1e \x03(\x0b\x32\x0c.ComplexRule\x12.\n\x18noRestrictedDependencies\x18\x1f \x03(\x0b\x32\x0c.ComplexRule\x12\x38\n\"noRestrictedPreReleaseDependencies\x18  \x03(\x0b\x32\x0c.ComplexRule\x12\x38\n\"noRestrictedInvalidDevDependencies\x18! \x03(\x0b\x32\x0c.ComplexRule\x12;\n%noRestrictedPreReleaseDevDependencies\x18\" \x03(\x0b\x32\x0c.ComplexRule\x12\x12\n\nnameFormat\x18# \x01(\t\x12\x15\n\rversionFormat\x18$ \x01(\t\"\x1d\n\x04Main\x12\x15\n\x05rules\x18\x01 \x01(\x0b\x32\x06.Rulesb\x06proto3'
)




_OPTIONS = _descriptor.Descriptor(
  name='Options',
  full_name='Options',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='items', full_name='Options.items', index=0,
      number=1, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=16,
  serialized_end=40,
)


_BOOLEANOPTIONS = _descriptor.Descriptor(
  name='BooleanOptions',
  full_name='BooleanOptions',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='items', full_name='BooleanOptions.items', index=0,
      number=1, type=8, cpp_type=7, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=42,
  serialized_end=73,
)


_COMPLEXRULE = _descriptor.Descriptor(
  name='ComplexRule',
  full_name='ComplexRule',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='textual', full_name='ComplexRule.textual', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='options', full_name='ComplexRule.options', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='booleanOptions', full_name='ComplexRule.booleanOptions', index=2,
      number=3, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
    _descriptor.OneofDescriptor(
      name='kind', full_name='ComplexRule.kind',
      index=0, containing_type=None,
      create_key=_descriptor._internal_create_key,
    fields=[]),
  ],
  serialized_start=75,
  serialized_end=187,
)


_RULES = _descriptor.Descriptor(
  name='Rules',
  full_name='Rules',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='requireAuthor', full_name='Rules.requireAuthor', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireDescription', full_name='Rules.requireDescription', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireEngines', full_name='Rules.requireEngines', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireLicense', full_name='Rules.requireLicense', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireName', full_name='Rules.requireName', index=4,
      number=5, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireRepository', full_name='Rules.requireRepository', index=5,
      number=6, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireVersion', full_name='Rules.requireVersion', index=6,
      number=7, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireBugs', full_name='Rules.requireBugs', index=7,
      number=8, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireHomepage', full_name='Rules.requireHomepage', index=8,
      number=9, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='requireKeywords', full_name='Rules.requireKeywords', index=9,
      number=10, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='binType', full_name='Rules.binType', index=10,
      number=11, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='configType', full_name='Rules.configType', index=11,
      number=12, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='descriptionType', full_name='Rules.descriptionType', index=12,
      number=13, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='devDependenciesType', full_name='Rules.devDependenciesType', index=13,
      number=14, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='directoriesType', full_name='Rules.directoriesType', index=14,
      number=15, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='enginesType', full_name='Rules.enginesType', index=15,
      number=16, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='filesType', full_name='Rules.filesType', index=16,
      number=17, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='homepageType', full_name='Rules.homepageType', index=17,
      number=18, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='keywordsType', full_name='Rules.keywordsType', index=18,
      number=19, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='licenseType', full_name='Rules.licenseType', index=19,
      number=20, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='mainType', full_name='Rules.mainType', index=20,
      number=21, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='manType', full_name='Rules.manType', index=21,
      number=22, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='nameType', full_name='Rules.nameType', index=22,
      number=23, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='preferGlobalType', full_name='Rules.preferGlobalType', index=23,
      number=24, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='privateType', full_name='Rules.privateType', index=24,
      number=25, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='repositoryType', full_name='Rules.repositoryType', index=25,
      number=26, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='scriptsType', full_name='Rules.scriptsType', index=26,
      number=27, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='versionType', full_name='Rules.versionType', index=27,
      number=28, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='validValuesAuthor', full_name='Rules.validValuesAuthor', index=28,
      number=29, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='validValuesPrivate', full_name='Rules.validValuesPrivate', index=29,
      number=30, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='noRestrictedDependencies', full_name='Rules.noRestrictedDependencies', index=30,
      number=31, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='noRestrictedPreReleaseDependencies', full_name='Rules.noRestrictedPreReleaseDependencies', index=31,
      number=32, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='noRestrictedInvalidDevDependencies', full_name='Rules.noRestrictedInvalidDevDependencies', index=32,
      number=33, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='noRestrictedPreReleaseDevDependencies', full_name='Rules.noRestrictedPreReleaseDevDependencies', index=33,
      number=34, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='nameFormat', full_name='Rules.nameFormat', index=34,
      number=35, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='versionFormat', full_name='Rules.versionFormat', index=35,
      number=36, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=190,
  serialized_end=1177,
)


_MAIN = _descriptor.Descriptor(
  name='Main',
  full_name='Main',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='rules', full_name='Main.rules', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=1179,
  serialized_end=1208,
)

_COMPLEXRULE.fields_by_name['options'].message_type = _OPTIONS
_COMPLEXRULE.fields_by_name['booleanOptions'].message_type = _BOOLEANOPTIONS
_COMPLEXRULE.oneofs_by_name['kind'].fields.append(
  _COMPLEXRULE.fields_by_name['textual'])
_COMPLEXRULE.fields_by_name['textual'].containing_oneof = _COMPLEXRULE.oneofs_by_name['kind']
_COMPLEXRULE.oneofs_by_name['kind'].fields.append(
  _COMPLEXRULE.fields_by_name['options'])
_COMPLEXRULE.fields_by_name['options'].containing_oneof = _COMPLEXRULE.oneofs_by_name['kind']
_COMPLEXRULE.oneofs_by_name['kind'].fields.append(
  _COMPLEXRULE.fields_by_name['booleanOptions'])
_COMPLEXRULE.fields_by_name['booleanOptions'].containing_oneof = _COMPLEXRULE.oneofs_by_name['kind']
_RULES.fields_by_name['validValuesAuthor'].message_type = _COMPLEXRULE
_RULES.fields_by_name['validValuesPrivate'].message_type = _COMPLEXRULE
_RULES.fields_by_name['noRestrictedDependencies'].message_type = _COMPLEXRULE
_RULES.fields_by_name['noRestrictedPreReleaseDependencies'].message_type = _COMPLEXRULE
_RULES.fields_by_name['noRestrictedInvalidDevDependencies'].message_type = _COMPLEXRULE
_RULES.fields_by_name['noRestrictedPreReleaseDevDependencies'].message_type = _COMPLEXRULE
_MAIN.fields_by_name['rules'].message_type = _RULES
DESCRIPTOR.message_types_by_name['Options'] = _OPTIONS
DESCRIPTOR.message_types_by_name['BooleanOptions'] = _BOOLEANOPTIONS
DESCRIPTOR.message_types_by_name['ComplexRule'] = _COMPLEXRULE
DESCRIPTOR.message_types_by_name['Rules'] = _RULES
DESCRIPTOR.message_types_by_name['Main'] = _MAIN
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Options = _reflection.GeneratedProtocolMessageType('Options', (_message.Message,), {
  'DESCRIPTOR' : _OPTIONS,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Options)
  })
_sym_db.RegisterMessage(Options)

BooleanOptions = _reflection.GeneratedProtocolMessageType('BooleanOptions', (_message.Message,), {
  'DESCRIPTOR' : _BOOLEANOPTIONS,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:BooleanOptions)
  })
_sym_db.RegisterMessage(BooleanOptions)

ComplexRule = _reflection.GeneratedProtocolMessageType('ComplexRule', (_message.Message,), {
  'DESCRIPTOR' : _COMPLEXRULE,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:ComplexRule)
  })
_sym_db.RegisterMessage(ComplexRule)

Rules = _reflection.GeneratedProtocolMessageType('Rules', (_message.Message,), {
  'DESCRIPTOR' : _RULES,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Rules)
  })
_sym_db.RegisterMessage(Rules)

Main = _reflection.GeneratedProtocolMessageType('Main', (_message.Message,), {
  'DESCRIPTOR' : _MAIN,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Main)
  })
_sym_db.RegisterMessage(Main)


# @@protoc_insertion_point(module_scope)