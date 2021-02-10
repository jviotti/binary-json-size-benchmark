import sys
import bson
import json

with open(sys.argv[1]) as json_data:
  data = json.load(json_data)

fd = open(sys.argv[2], "wb")
fd.write(bson.dumps(data))
fd.close()
