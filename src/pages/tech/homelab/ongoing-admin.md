---
layout: "@layouts/MDLayout.astro"
title: Homelab Ongoing Admin
description: My routine for maintaining my homelab.
keywords: []
---

*The contents on this page aren't ready yet. I'm still working things out! Come back later.*

## Proxmox

- Notable settings when making a basic VM:
    - (Check the "Advanced" checkbox.)
    - System:
        - Machine: `q35`
        - BIOS: `OVMF (UEFI)`
        - EFI Storage: Set to whatever your local storage is (e.g. `local-lvm`).
    - Disks:
        - Bus/Device: Leave it at its default value (SCSI).
    - CPU:
        - Cores: Set as required.
        - Type: `x86-64-v3` (suitable for Ryzen 3950X)
    - Memory
        - Memory (MiB): `4096` (suitable for a test VM. Change as required.)
        - Ballooning Device: Check the box if you want memory to be allocated dynamically. For stability, I uncheck this box.
    - Network
        - Model: `VirtIO (paravirtualized)` (might be incompatible if you are making a Windows VM)

## OPNsense

You can update the software via. the console.

Most config is done via. `/conf/config.xml`. You can probably back this up, restore it, or edit it? I actually haven't tried yet.

## TrueNAS

TODO

