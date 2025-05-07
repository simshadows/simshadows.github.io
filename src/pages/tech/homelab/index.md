---
layout: "@layouts/MDLayout.astro"
title: My Homelab Writeup
description: My homelab writeup detailing my motivations, hardware, and full setup.
keywords: []

wip: true
---

*IMPORTANT: This page and all child pages within are currently a very early work-in-progress. I'm still learning and figuring out my homelab!*

## Main Motivation

TODO

## Hardware and Hypervisor

My entire homelab consists of a single physical computer connected to my ISP-provided home router. This works for me for now because this router is capable of 1 gigabit ethernet. The hypervisor I use is [Proxmox Virtual Environment](https://www.proxmox.com/en/products/proxmox-virtual-environment/overview).

You can view [this PCPartPicker parts list](https://au.pcpartpicker.com/user/simshadows/saved/Xq9ZFT) for my full PC specs.

*Aside: My homelab is actually my old PC, which seems to fully support ECC memory, has loads of M.2 and SATA ports, a very silent case that has lots of drive mounts, and filled with Noctua fans so it's even quieter!*

It's a very small and simple homelab, so I've opted to largely use the GUI for much of the setup, and I use scripts and config files for anything simple enough.

(TODO: I should link to my reproduction guides.)

*Future work: I want to upgrade to 10 gigabit ethernet in the future! I also want a UPS.*

[Hardware Reproduction Guide](./reproduction/hardware/)

[BIOS Reproduction Guide](./reproduction/bios/)

[Proxmox Reproduction Guide](./reproduction/proxmox/)

## Network Architecture

TODO: Diagram

**Important: The actual subnets I use are a secret. Any subnets you see here are used for illustrative purposes only. If you are reproducing my homelab, you should generate your own random subnets.**

## VMs 100-199: Throwaway VMs

It's convenient because IDs default to roughly this range.

## VMs 200-299: Top-Level VMs

Any VM that is bridged directly to my home network is in this range.

There's only one VM here at the moment since everything normally just sits behind the OPNsense router.

### VM: 200 (router-opnsense)

TODO

[VM Reproduction Guide](./reproduction/opnsense/)

## VMs 300-399: Trusted Prod

### VM: 300 (truenas-prod)

TODO

[VM Reproduction Guide](./reproduction/truenas/)

### VM: 301 (debian-containers-prod)

TODO

[VM Reproduction Guide](./reproduction/container-hosts/)

#### GitLab CE

TODO

#### Web Server: Private Homepage

TODO

### VM: 399 (debian-virtual-desktop)

TODO

## VMs 400-499: Untrusted Prod

### VM: 400 (debian-containers-bittorrent)

TODO

## Ongoing Admin

With a homelab that centrally manages critical personal data and is exposed to risk, I believe that you need to commit to a strict maintenance routine including keeping everything up-to-date, double-checking any backups, and augmenting automated backup with a routine manual backup.

See [this page](./ongoing-admin/) for details on my routine.

## Future Work

As I gain familiarity with things, I want to implement more and more automation, especially for making my homelab seamlessly reproducible.

