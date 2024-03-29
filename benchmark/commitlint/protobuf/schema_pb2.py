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
  serialized_pb=b'\n\x0cschema.proto\"\x19\n\x07Options\x12\x0e\n\x06values\x18\x01 \x03(\t\"L\n\x04Rule\x12\x0f\n\x05level\x18\x01 \x01(\rH\x00\x12\x0e\n\x04when\x18\x02 \x01(\tH\x00\x12\x1b\n\x07options\x18\x03 \x01(\x0b\x32\x08.OptionsH\x00\x42\x06\n\x04kind\"=\n\x05Rules\x12\x18\n\tscopeCase\x18\x01 \x03(\x0b\x32\x05.Rule\x12\x1a\n\x0bsubjectCase\x18\x02 \x03(\x0b\x32\x05.Rule\"\x1d\n\x04Main\x12\x15\n\x05rules\x18\x01 \x01(\x0b\x32\x06.Rulesb\x06proto3'
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
      name='values', full_name='Options.values', index=0,
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
  serialized_end=41,
)


_RULE = _descriptor.Descriptor(
  name='Rule',
  full_name='Rule',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='level', full_name='Rule.level', index=0,
      number=1, type=13, cpp_type=3, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='when', full_name='Rule.when', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='options', full_name='Rule.options', index=2,
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
      name='kind', full_name='Rule.kind',
      index=0, containing_type=None,
      create_key=_descriptor._internal_create_key,
    fields=[]),
  ],
  serialized_start=43,
  serialized_end=119,
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
      name='scopeCase', full_name='Rules.scopeCase', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='subjectCase', full_name='Rules.subjectCase', index=1,
      number=2, type=11, cpp_type=10, label=3,
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
  serialized_start=121,
  serialized_end=182,
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
  serialized_start=184,
  serialized_end=213,
)

_RULE.fields_by_name['options'].message_type = _OPTIONS
_RULE.oneofs_by_name['kind'].fields.append(
  _RULE.fields_by_name['level'])
_RULE.fields_by_name['level'].containing_oneof = _RULE.oneofs_by_name['kind']
_RULE.oneofs_by_name['kind'].fields.append(
  _RULE.fields_by_name['when'])
_RULE.fields_by_name['when'].containing_oneof = _RULE.oneofs_by_name['kind']
_RULE.oneofs_by_name['kind'].fields.append(
  _RULE.fields_by_name['options'])
_RULE.fields_by_name['options'].containing_oneof = _RULE.oneofs_by_name['kind']
_RULES.fields_by_name['scopeCase'].message_type = _RULE
_RULES.fields_by_name['subjectCase'].message_type = _RULE
_MAIN.fields_by_name['rules'].message_type = _RULES
DESCRIPTOR.message_types_by_name['Options'] = _OPTIONS
DESCRIPTOR.message_types_by_name['Rule'] = _RULE
DESCRIPTOR.message_types_by_name['Rules'] = _RULES
DESCRIPTOR.message_types_by_name['Main'] = _MAIN
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Options = _reflection.GeneratedProtocolMessageType('Options', (_message.Message,), {
  'DESCRIPTOR' : _OPTIONS,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Options)
  })
_sym_db.RegisterMessage(Options)

Rule = _reflection.GeneratedProtocolMessageType('Rule', (_message.Message,), {
  'DESCRIPTOR' : _RULE,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Rule)
  })
_sym_db.RegisterMessage(Rule)

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
