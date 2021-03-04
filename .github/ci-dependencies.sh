#!/bin/sh

set -eux

apt-get install -y gnuplot python3-setuptools rlwrap

mkdir -p /tmp/dependencies

# Cap'n Proto
cd /tmp/dependencies
if [ ! -d capnproto-c++-0.8.0 ]
then
  curl -O https://capnproto.org/capnproto-c++-0.8.0.tar.gz
  tar zxf capnproto-c++-0.8.0.tar.gz
fi

cd capnproto-c++-0.8.0
./configure
make
make install

# MessagePack
cd /tmp/dependencies
if [ ! -f msgpack-tools-0.6-x86_64.deb ]
then
  wget https://github.com/ludocode/msgpack-tools/releases/download/v0.6/msgpack-tools-0.6-x86_64.deb
fi
dpkg -i msgpack-tools-0.6-x86_64.deb

# Clojure
if [ ! -f linux-install-1.10.2.796.sh ]
then
  curl -O https://download.clojure.org/install/linux-install-1.10.2.796.sh
  chmod +x linux-install-1.10.2.796.sh
fi

./linux-install-1.10.2.796.sh
