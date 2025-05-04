---
layout: "@layouts/MDLayout.astro"
title: Home Server Planning
indexTitle: 2025-04-10 - Home Server Planning
description: Trying to figure out how I want to build out my home server.
keywords: []

hidetoc: true
---

## Options

- Run Linux directly.
- <https://www.proxmox.com/en/>
    - possible alternative: <https://linuxcontainers.org/incus/>
- <https://www.truenas.com/>

## Uses

- Torrents
- Network storage
    - Keep a local copy of google drive (and possibly other cloud storage services)
- Managing a FLAC music library. Maybe I can listen to it via. a web app? A mobile app?
- Automatically pulls my git repos to back them up
- Automatically backs everything up to Backblaze?
- Host a Discord bot
- Smart home stuff?
- Home security stuff?

## Ideas

- Take advantage of containerization
- Automate everything such that everything gracefully closes automatically on shut-down, and everything relaunches on startup.
- Need to automate softare updates.
- Maximum security.
    - Is it possible to put everything behind SSH?
    - What about VPN?
    - Configure strictest firewall settings possible.

