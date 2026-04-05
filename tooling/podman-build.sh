#!/usr/bin/env sh

#   file: podman-build.sh
# author: simshadows <contact@simshadows.com>

set -e

src_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$src_dir/.."

image_name="simshadows/website-dev"

podman build --pull -t $image_name $root_dir
