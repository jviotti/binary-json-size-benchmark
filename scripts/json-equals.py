import sys
import json

with open(sys.argv[1], mode='r') as json_data:
    data1 = json.loads(json_data.read())

with open(sys.argv[2], mode='r') as json_data:
    data2 = json.loads(json_data.read())

if data1 == data2:
    print("Files are equal!")
    sys.exit(0)
else:
    print("Files are NOT equal!")
    sys.exit(1)
