set terminal png size 1200,550
set terminal png enhanced

set grid
set key off
set border 3

set boxwidth 80 absolute
set style fill solid 1.0 noborder

set xrange [0 : 8000]
set xlabel '100 Bytes Groups'

set ylabel 'Count'
set xtics 0,500

bin_width = 100;

bin_number(x) = floor(x/bin_width)

rounded(x) = bin_width * ( bin_number(x) + 0.5 )

plot 'datasets/schemastore-byte-size.dat' \
using (rounded($1)):(1) smooth frequency with boxes
