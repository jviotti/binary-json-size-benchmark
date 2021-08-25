import sys
import matplotlib.pyplot as plt
import numpy

labels = []
uncompressed = []
gzip = []
lz4 = []
lzma = []

def unquote(string):
    return string[1:-1]

fd = open(sys.argv[1], 'r')
lines = fd.readlines()
headers = list(map(unquote, lines[0].strip().split(',')))
for line in lines[1:]:
    columns = line.strip().split(',')
    id = int(columns[0])
    labels.append(unquote(columns[2].replace('\\n', '\n')))
    uncompressed.append(int(columns[3]))
    gzip.append(int(columns[4]))
    lz4.append(int(columns[5]))
    lzma.append(int(columns[6]))
fd.close()

x = numpy.arange(len(labels))
width = 0.21

fig, ax = plt.subplots()
fillcolor = '#444'
rects1 = ax.bar(x - width * 1.5, uncompressed, width, label=headers[3], edgecolor='#763EB2', color='#AB63FA', hatch="oo")
rects2 = ax.bar(x - width * 0.5, gzip, width, label=headers[4], edgecolor='#2C8B9B', color='#15D3F3', hatch="//")
rects3 = ax.bar(x + width * 0.5, lz4, width, label=headers[5], edgecolor='#984C3F', color='#EF553B', hatch="..")
rects4 = ax.bar(x + width * 1.5, lzma, width, label=headers[6], edgecolor='#20896D', color='#00CC96', hatch="---")

plt.grid(b=True, axis='both', linewidth=0.1)

title = sys.argv[2].replace(' ', '\\ ')
subtitle = sys.argv[3]

ax.set_ylabel('Byte Size')
ax.set_title('$\\bf{' + title + '}$' + '\n' + subtitle, pad=35)
ax.set_xticks(x)
ax.set_xticklabels(labels, ha='center')
ax.legend(loc='upper center', bbox_to_anchor=(0.5, 1.19), ncol=4)

ax.tick_params(axis="x", rotation=90)

fontsize = 3
padding = 3
ax.bar_label(rects1, padding=padding, fontsize=fontsize)
ax.bar_label(rects2, padding=padding, fontsize=fontsize)
ax.bar_label(rects3, padding=padding, fontsize=fontsize)
ax.bar_label(rects4, padding=padding, fontsize=fontsize)

fig.tight_layout()
fig.set_figheight(5)
fig.set_figwidth(10)

plt.subplots_adjust(top=0.8, bottom=0.35, left=0.07, right=0.97)
plt.savefig(sys.argv[4], dpi=500)
#  plt.show()
