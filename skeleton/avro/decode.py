import io
import sys
import json
import avro.schema
import avro.io

with open(sys.argv[1], mode='rb') as avro_data:
    data = avro_data.read()

schema = avro.schema.parse(open(sys.argv[2], "rb").read())
reader = avro.io.DatumReader(schema, schema)
bytes_reader = io.BytesIO(data)
decoder = avro.io.BinaryDecoder(bytes_reader)
result = reader.read(decoder)

print(json.dumps(result, indent=4))
