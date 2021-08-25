import sys
import matplotlib.pyplot as plt
import numpy

PLOT1 = {
    'labels': [],
    'uncompressed': [],
    'gzip': [],
    'lz4': [],
    'lzma': [],
}

PLOT2 = {
    'labels': [],
    'uncompressed': [],
    'gzip': [],
    'lz4': [],
    'lzma': [],
}

PLOT3 = {
    'labels': [],
    'uncompressed': [],
    'gzip': [],
    'lz4': [],
    'lzma': [],
}

def unquote(string):
    return string[1:-1]

fd = open(sys.argv[1], 'r')
lines = fd.readlines()
headers = list(map(unquote, lines[0].strip().split(',')))

json_id = len(lines)

for line in lines[1:]:
    columns = line.strip().split(',')
    id = int(columns[0])

    label = unquote(columns[2].replace('\\n', '\n'))
    uncompressed = int(columns[3])
    gzip = int(columns[4])
    lz4 = int(columns[5])
    lzma = int(columns[6])

    if columns[1] == 'json':
      json_id = id
      PLOT2['labels'].append(label)
      PLOT2['uncompressed'].append(uncompressed)
      PLOT2['gzip'].append(gzip)
      PLOT2['lz4'].append(lz4)
      PLOT2['lzma'].append(lzma)
      continue
    if id < json_id:
      PLOT1['labels'].append(label)
      PLOT1['uncompressed'].append(uncompressed)
      PLOT1['gzip'].append(gzip)
      PLOT1['lz4'].append(lz4)
      PLOT1['lzma'].append(lzma)
    else:
      PLOT3['labels'].append(label)
      PLOT3['uncompressed'].append(uncompressed)
      PLOT3['gzip'].append(gzip)
      PLOT3['lz4'].append(lz4)
      PLOT3['lzma'].append(lzma)
fd.close()

fig = plt.figure(constrained_layout=True)
ax = fig.add_gridspec(1, 3)
ax1 = fig.add_subplot(ax[0, 0])
ax2 = fig.add_subplot(ax[0, 1])
ax3 = fig.add_subplot(ax[0, 2])

#  fig, (ax1, ax2, ax3) = plt.subplots(1, 3, sharey=True)

#  fig, (ax1, ax2, ax3) = plt.subplots(1, 3, sharey=True)

x1 = numpy.arange(len(PLOT1['labels']))
x2 = numpy.arange(len(PLOT2['labels']))
x3 = numpy.arange(len(PLOT3['labels']))
width = 0.21

plot1_rects1 = ax1.bar(x1 - width * 1.5, PLOT1['uncompressed'], width, label=headers[3], edgecolor='#763EB2', color='#AB63FA', hatch="oo")
plot1_rects2 = ax1.bar(x1 - width * 0.5, PLOT1['gzip'], width, label=headers[4], edgecolor='#2C8B9B', color='#15D3F3', hatch="//")
plot1_rects3 = ax1.bar(x1 + width * 0.5, PLOT1['lz4'], width, label=headers[5], edgecolor='#984C3F', color='#EF553B', hatch="..")
plot1_rects4 = ax1.bar(x1 + width * 1.5, PLOT1['lzma'], width, label=headers[6], edgecolor='#20896D', color='#00CC96', hatch="---")

plot2_rects1 = ax2.bar(x2 - width * 1.5, PLOT2['uncompressed'], width, label=headers[3], edgecolor='#763EB2', color='#AB63FA', hatch="oo")
plot2_rects2 = ax2.bar(x2 - width * 0.5, PLOT2['gzip'], width, label=headers[4], edgecolor='#2C8B9B', color='#15D3F3', hatch="//")
plot2_rects3 = ax2.bar(x2 + width * 0.5, PLOT2['lz4'], width, label=headers[5], edgecolor='#984C3F', color='#EF553B', hatch="..")
plot2_rects4 = ax2.bar(x2 + width * 1.5, PLOT2['lzma'], width, label=headers[6], edgecolor='#20896D', color='#00CC96', hatch="---")

plot3_rects1 = ax3.bar(x3 - width * 1.5, PLOT3['uncompressed'], width, label=headers[3], edgecolor='#763EB2', color='#AB63FA', hatch="oo")
plot3_rects2 = ax3.bar(x3 - width * 0.5, PLOT3['gzip'], width, label=headers[4], edgecolor='#2C8B9B', color='#15D3F3', hatch="//")
plot3_rects3 = ax3.bar(x3 + width * 0.5, PLOT3['lz4'], width, label=headers[5], edgecolor='#984C3F', color='#EF553B', hatch="..")
plot3_rects4 = ax3.bar(x3 + width * 1.5, PLOT3['lzma'], width, label=headers[6], edgecolor='#20896D', color='#00CC96', hatch="---")

ax1.grid(b=True, axis='both', linewidth=0.1)
ax2.grid(b=True, axis='both', linewidth=0.1)
ax3.grid(b=True, axis='both', linewidth=0.1)

ax1.set_title('Schema-driven')
#  ax2.set_title('JSON')
ax3.set_title('Schema-less')

title = sys.argv[2].replace(' ', '\\ ')
subtitle = sys.argv[3]

ax1.set_ylabel('Byte Size')
fig.suptitle('$\\bf{' + title + '}$' + '\n' + subtitle)

ax1.set_xticks(x1)
ax2.set_xticks(x2)
ax3.set_xticks(x3)

ax1.set_xticklabels(PLOT1['labels'], ha='center')
ax2.set_xticklabels(PLOT2['labels'], ha='center')
ax3.set_xticklabels(PLOT3['labels'], ha='center')

ax1.tick_params(axis="x", rotation=90)
ax2.tick_params(axis="x", rotation=90)
ax3.tick_params(axis="x", rotation=90)

ax2.tick_params(axis="y", left=False, labelleft=False)
ax3.tick_params(axis="y", left=False, labelleft=False)

#  ax1.legend(loc='upper center', bbox_to_anchor=(0.5, 1.19), ncol=4)

fontsize = 3
padding = 3
ax1.bar_label(plot1_rects1, padding=padding, fontsize=fontsize)
ax1.bar_label(plot1_rects2, padding=padding, fontsize=fontsize)
ax1.bar_label(plot1_rects3, padding=padding, fontsize=fontsize)
ax1.bar_label(plot1_rects4, padding=padding, fontsize=fontsize)
ax2.bar_label(plot2_rects1, padding=padding, fontsize=fontsize)
ax2.bar_label(plot2_rects2, padding=padding, fontsize=fontsize)
ax2.bar_label(plot2_rects3, padding=padding, fontsize=fontsize)
ax2.bar_label(plot2_rects4, padding=padding, fontsize=fontsize)
ax3.bar_label(plot3_rects1, padding=padding, fontsize=fontsize)
ax3.bar_label(plot3_rects2, padding=padding, fontsize=fontsize)
ax3.bar_label(plot3_rects3, padding=padding, fontsize=fontsize)
ax3.bar_label(plot3_rects4, padding=padding, fontsize=fontsize)

fig.tight_layout()
fig.subplots_adjust(wspace=0)
fig.set_figheight(5)
fig.set_figwidth(10)

plt.subplots_adjust(top=0.8, bottom=0.35, left=0.07, right=0.97)
plt.savefig(sys.argv[4], dpi=500)
#  plt.show()
