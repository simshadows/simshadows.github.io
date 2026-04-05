#!/usr/bin/env sh

#   file: podman-start.sh
# author: simshadows <contact@simshadows.com>

set -e

src_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
root_dir="$src_dir/.."

image_name="simshadows/website-dev"
container_name="website-dev"

podman run \
    --name $container_name \
    -p 127.0.0.1:8000:8000 \
    --mount type=bind,src=$root_dir,dst=/repo \
    --rm \
    -itd \
    $image_name
