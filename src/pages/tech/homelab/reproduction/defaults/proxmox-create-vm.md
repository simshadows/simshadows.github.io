---
layout: "@layouts/MDLayout.astro"
title: "Proxmox Create VM: Default Settings"
description: The settings I use by default when creating a VM in Proxmox VE.
keywords: []
---

Tick the *Advanced* checkbox before proceeding with creating the VM.

## General Tab

It's all self-explanatory.

## OS Tab

Select **`Use CD/DVD disc image file (iso)`**.

- **Storage:** *(This is where the root filesystem for the VM will be stored.)*
- **ISO image:** *(Select your OS installer ISO image.)*
- **Guest OS > Type:** `Linux`
- **Guest OS > Version:** `6.x - 2.6 Kernel`

*Here, I obviously assume that you're setting up a modern Linux VM. Change the settings accordingly if you're setting up a Windows VM, or something else.*

## System Tab

- **Graphic card:** `Default`
- **Machine:** `q35`
- **BIOS:** `OVMF (UEFI)`
- **Add EFI Disk:** true
- **EFI Storage:** *(Similar to earlier, this is where the EFI volume data will be stored.)*
- **Pre-Enroll keys:** *(I actually don't know what this is. For now, I just leave it ticked.)*
- **SCSI Controller:** *(I'm actually not sure. I just leave it as default `VirtIO SCSI single`.)*
- **Qemu Agent:** true
- **Add TPM:** false

## Disks Tab

By default, there's already one virtual disk in the window. We will use that.

- **Disk**
    - **Bus/Device:** `SCSI 1`
    - **Storage:** *(Similar to earlier, this is where the volume data will be stored.)*
    - **Disk size (GiB):** *(Depends on your needs for a root filesystem.)*
    - **SSD emulation:** *(Set to `true` if the volume data is in an SSD.)*
    - **Cache:** `Default (No cache)`
    - **Discard:** true *(I should look into cases where Discard should be set to false.)*
    - **IO thread:** true *(I don't know what this is, but it's `true` by default.)*
    - **Backup:** true
    - **Skip replication:** false
    - **Async IO:** `Default (io_uring)` *(I don't know what this is, but this is the default value.)*

## CPU Tab

- **Sockets:** `1`
- **Cores:** *(Set as required. Maximum of `32` for Ryzen 3950X.)*
- **Type:** `host` *(If a generic CPU is required for whatever reason, you should set `x86-64-v3` for for Ryzen 3950X.*)

## Memory Tab

I don't like overprovisioning memory, so I untick **Ballooning Device** and set according to your VM's needs.

Here's a quick cheatsheet of MiB numbers you might want to consider: `4096`, `8192`, `16384`, `32768`, `65536`, `131072`

## Network Tab

- **No network device:** false
- **Bridge:** *(Set as needed. E.g. if `vmbr0` is connected to WAN, set the value to `vmbr0`.)*
- **Model:** `VirtIO (paravirtualized)` *(might be incompatible if you are making a Windows VM)*

