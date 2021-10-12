import sys
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def unquote(string):
    return string[1:-1]

fd = open(sys.argv[1], 'r')
lines = fd.readlines()
headers = list(map(unquote, lines[0].strip().split(',')))

data = {
    'category': [],
    'bytesize': [],
    'type': [],
}

json_id = len(lines)
for line in lines[1:]:
    columns = line.strip().split(',')
    id = int(columns[0])

    if columns[1] == 'json':
      json_id = id
      continue

    data['bytesize'].append(int(columns[3]))
    data['bytesize'].append(int(columns[4]))
    data['bytesize'].append(int(columns[5]))
    data['bytesize'].append(int(columns[6]))

    data['category'].append(headers[3])
    data['category'].append(headers[4])
    data['category'].append(headers[5])
    data['category'].append(headers[6])

    if id < json_id:
      data['type'].append('schema-driven')
      data['type'].append('schema-driven')
      data['type'].append('schema-driven')
      data['type'].append('schema-driven')
    else:
      data['type'].append('schema-less')
      data['type'].append('schema-less')
      data['type'].append('schema-less')
      data['type'].append('schema-less')

sns.set_theme(style="whitegrid")

sns.set(rc={
    "figure.figsize": (12, 6),
    'axes.facecolor': 'white'
})

sns.set_style("whitegrid")

ax = sns.boxplot(x="category", y="bytesize", hue="type",
    data=pd.DataFrame(data), palette={"schema-driven": "#ff3299", "schema-less": "#6666ff"})

plt.legend(bbox_to_anchor=(0.5, 1.10), loc='upper center', ncol=2)
plt.title('Byte-size of bit-string by binary serialization format and compression format', pad=40)
plt.suptitle(sys.argv[2], y=0.96)

plt.xlabel('')
plt.ylabel('Bytes')
plt.tight_layout()
plt.savefig(sys.argv[3], dpi=500)
