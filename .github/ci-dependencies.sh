#!/bin/sh

set -eux

apt install -y gnuplot python3-setuptools rlwrap capnproto

mkdir /tmp/dependencies

# FlatBuffers
cd /tmp/dependencies
git clone https://github.com/google/flatbuffers.git
cd flatbuffers
git checkout v1.12.0
cmake .
make
make install

# MessagePack
wget https://github.com/ludocode/msgpack-tools/releases/download/v0.6/msgpack-tools-0.6-x86_64.deb
dpkg -i msgpack-tools-0.6-x86_64.deb

# Clojure
curl -O https://download.clojure.org/install/linux-install-1.10.2.796.sh
chmod +x linux-install-1.10.2.796.sh
./linux-install-1.10.2.796.sh
