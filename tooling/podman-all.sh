#!/usr/bin/env sh

#   file: podman-all.sh
# author: simshadows <contact@simshadows.com>
#
# Runs the dev server from a clean start using a dev container.
#
# This file also serves to document the workflow of the dev container.

set -e

src_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#root_dir="$src_dir/.."

$src_dir/podman-teardown.sh
$src_dir/podman-build.sh
$src_dir/podman-start.sh
$src_dir/podman-attach.sh yarn install
$src_dir/podman-attach.sh yarn start --host

