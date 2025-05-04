---
layout: "@layouts/MDLayout.astro"
title: "Homelab Reproduction: Container Host VMs"
description: How to reproduce my container host VMs.
keywords: []
---

## Step 1: Setting up the Proxmox VM

We use [these default settings](../defaults/proxmox-create-vm/), except we set the following:

- **Disks Tab > Disk size (GiB):** *(I'm actually not sure. I set it to 256 for now.)*
- **Memory Tab > Memory (MiB):** *(I'm actually not sure. I set it to 8192 for now.)*

## Step 2: Setting up the OS

We use Debian as the OS. Most of its installation is very straightforward.

TODO: Link to my dotfiles

