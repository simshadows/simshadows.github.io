#!/usr/bin/env sh

#   file: podman-attach.sh
# author: simshadows <contact@simshadows.com>

set -e

#src_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#root_dir="$src_dir/.."

#image_name="simshadows/website-dev"
container_name="website-dev"

if [[ $# -eq 0 ]]; then
    podman exec -it $container_name bash
else
    podman exec -it $container_name "$@"
fi
