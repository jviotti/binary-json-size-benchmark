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
  serialized_pb=b'\n\x0cschema.proto\"$\n\x0b\x45nvironment\x12\x15\n\rbuildSuiteDir\x18\x01 \x01(\t\"\x1b\n\x04With\x12\x13\n\x0bnodeVersion\x18\x01 \x01(\t\"_\n\x04Step\x12\x0c\n\x04uses\x18\x01 \x01(\t\x12\x0b\n\x03run\x18\x02 \x01(\t\x12\x18\n\x10workingDirectory\x18\x03 \x01(\t\x12\x14\n\x05with1\x18\x04 \x01(\x0b\x32\x05.With\x12\x0c\n\x04name\x18\x05 \x01(\t\"H\n\x05\x42uild\x12\x0e\n\x06runsOn\x18\x01 \x01(\t\x12\x19\n\x03\x65nv\x18\x02 \x01(\x0b\x32\x0c.Environment\x12\x14\n\x05steps\x18\x03 \x03(\x0b\x32\x05.Step\"\x1d\n\x04Jobs\x12\x15\n\x05\x62uild\x18\x01 \x01(\x0b\x32\x06.Build\"5\n\x04Main\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\n\n\x02on\x18\x02 \x03(\t\x12\x13\n\x04jobs\x18\x03 \x01(\x0b\x32\x05.Jobsb\x06proto3'
)




_ENVIRONMENT = _descriptor.Descriptor(
  name='Environment',
  full_name='Environment',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='buildSuiteDir', full_name='Environment.buildSuiteDir', index=0,
      number=1, type=9, cpp_type=9, label=1,
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
  serialized_start=16,
  serialized_end=52,
)


_WITH = _descriptor.Descriptor(
  name='With',
  full_name='With',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='nodeVersion', full_name='With.nodeVersion', index=0,
      number=1, type=9, cpp_type=9, label=1,
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
  serialized_start=54,
  serialized_end=81,
)


_STEP = _descriptor.Descriptor(
  name='Step',
  full_name='Step',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='uses', full_name='Step.uses', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='run', full_name='Step.run', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='workingDirectory', full_name='Step.workingDirectory', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='with1', full_name='Step.with1', index=3,
      number=4, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='name', full_name='Step.name', index=4,
      number=5, type=9, cpp_type=9, label=1,
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
  serialized_start=83,
  serialized_end=178,
)


_BUILD = _descriptor.Descriptor(
  name='Build',
  full_name='Build',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='runsOn', full_name='Build.runsOn', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='env', full_name='Build.env', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='steps', full_name='Build.steps', index=2,
      number=3, type=11, cpp_type=10, label=3,
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
  serialized_start=180,
  serialized_end=252,
)


_JOBS = _descriptor.Descriptor(
  name='Jobs',
  full_name='Jobs',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='build', full_name='Jobs.build', index=0,
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
  serialized_start=254,
  serialized_end=283,
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
      name='name', full_name='Main.name', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='on', full_name='Main.on', index=1,
      number=2, type=9, cpp_type=9, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='jobs', full_name='Main.jobs', index=2,
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
  ],
  serialized_start=285,
  serialized_end=338,
)

_STEP.fields_by_name['with1'].message_type = _WITH
_BUILD.fields_by_name['env'].message_type = _ENVIRONMENT
_BUILD.fields_by_name['steps'].message_type = _STEP
_JOBS.fields_by_name['build'].message_type = _BUILD
_MAIN.fields_by_name['jobs'].message_type = _JOBS
DESCRIPTOR.message_types_by_name['Environment'] = _ENVIRONMENT
DESCRIPTOR.message_types_by_name['With'] = _WITH
DESCRIPTOR.message_types_by_name['Step'] = _STEP
DESCRIPTOR.message_types_by_name['Build'] = _BUILD
DESCRIPTOR.message_types_by_name['Jobs'] = _JOBS
DESCRIPTOR.message_types_by_name['Main'] = _MAIN
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Environment = _reflection.GeneratedProtocolMessageType('Environment', (_message.Message,), {
  'DESCRIPTOR' : _ENVIRONMENT,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Environment)
  })
_sym_db.RegisterMessage(Environment)

With = _reflection.GeneratedProtocolMessageType('With', (_message.Message,), {
  'DESCRIPTOR' : _WITH,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:With)
  })
_sym_db.RegisterMessage(With)

Step = _reflection.GeneratedProtocolMessageType('Step', (_message.Message,), {
  'DESCRIPTOR' : _STEP,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Step)
  })
_sym_db.RegisterMessage(Step)

Build = _reflection.GeneratedProtocolMessageType('Build', (_message.Message,), {
  'DESCRIPTOR' : _BUILD,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Build)
  })
_sym_db.RegisterMessage(Build)

Jobs = _reflection.GeneratedProtocolMessageType('Jobs', (_message.Message,), {
  'DESCRIPTOR' : _JOBS,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Jobs)
  })
_sym_db.RegisterMessage(Jobs)

Main = _reflection.GeneratedProtocolMessageType('Main', (_message.Message,), {
  'DESCRIPTOR' : _MAIN,
  '__module__' : 'schema_pb2'
  # @@protoc_insertion_point(class_scope:Main)
  })
_sym_db.RegisterMessage(Main)


# @@protoc_insertion_point(module_scope)