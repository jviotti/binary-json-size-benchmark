import io
import sys
import json
import avro.schema
import avro.io

with open(sys.argv[1]) as json_data:
    data = json.load(json_data)

schema_file = sys.argv[2]
print("Using schema: " + schema_file)
schema = avro.schema.parse(open(schema_file, "rb").read())

writer = avro.io.DatumWriter(schema)
bytes_writer = io.BytesIO()
encoder = avro.io.BinaryEncoder(bytes_writer)
writer.write(data, encoder)

raw_bytes = bytes_writer.getvalue()

fd = open(sys.argv[3], "wb")
fd.write(raw_bytes)
fd.close()
