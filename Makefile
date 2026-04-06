#   file: Makefile
# author: simshadows <contact@simshadows.com>

ROOT_PATH := $(abspath .)
TOOLING_PATH := $(ROOT_PATH)/tooling

IMAGE_NAME := simshadows/website-dev
CONTAINER_NAME := website-dev

################################################################################
# 0. Meta ######################################################################
################################################################################

# Starts the dev server from scratch
.PHONY: all
all: clean build up yarn-install start

# Build release artifacts from scratch, to be deployed in Prod
.PHONY: all-release
all-release: clean build up yarn-install release


################################################################################
# 1. Setup #####################################################################
################################################################################


# Build image
.PHONY: build
build:
	podman build --pull -t $(IMAGE_NAME) $(ROOT_PATH)


# Start container
.PHONY: up
up:
	podman run \
		--name $(CONTAINER_NAME) \
		-p 127.0.0.1:8000:8000 \
		--mount type=bind,src=$(ROOT_PATH),dst=/repo \
		--rm \
		-itd \
		$(IMAGE_NAME)


################################################################################
# 2. Actions ###################################################################
################################################################################


# Open shell
.PHONY: shell bash
shell bash:
	podman exec -it $(CONTAINER_NAME) bash


# Run `yarn install`
.PHONY: yarn-install
yarn-install:
	podman exec -it $(CONTAINER_NAME) yarn install


# Start dev server
.PHONY: start dev
start dev:
	podman exec -it $(CONTAINER_NAME) yarn start --host


# Build release artifacts, to be deployed in Prod
.PHONY: release
release:
	podman exec -it $(CONTAINER_NAME) yarn build


################################################################################
# 3. Teardown ##################################################################
################################################################################


# Stop container
.PHONY: down
down:
	podman stop $(CONTAINER_NAME) || true


# Clean up images/containers
# (Does not clean up anything else.)
.PHONY: clean teardown destroy
clean teardown destroy: down
	podman rm $(CONTAINER_NAME) || true
	podman image rm localhost/$(IMAGE_NAME) || true

