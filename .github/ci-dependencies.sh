#!/bin/sh

set -eux

apt-get install -y gnuplot python3-setuptools rlwrap

mkdir -p /tmp/dependencies

# Clojure
if [ ! -f linux-install-1.10.2.796.sh ]
then
  curl -O https://download.clojure.org/install/linux-install-1.10.2.796.sh
  chmod +x linux-install-1.10.2.796.sh
fi

./linux-install-1.10.2.796.sh
