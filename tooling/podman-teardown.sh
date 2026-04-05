#!/usr/bin/env sh

#   file: podman-teardown.sh
# author: simshadows <contact@simshadows.com>

set -e

image_name="simshadows/website-dev"
container_name="website-dev"

podman stop $container_name || true
podman rm $container_name || true
podman image rm localhost/$image_name || true
