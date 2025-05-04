---
layout: "@layouts/MDLayout.astro"
title: "Homelab Reproduction: Proxmox VE"
description: How to reproduce my Proxmox VE bare-metal hypervisor.
keywords: []
---

*The contents on this page aren't ready yet. I'm still working things out! Come back later.*

## General

- **(node) > Updates**
    - **Repositories >**
        - If you have no subscription:
            - Disable the `enterprise.proxmox.com` repository.
            - Add the `No-Subscription` repository.
    - Update and reboot.

TODO when creating a virtual machine, System > Qemy Agent should be checked?

You should also check network connectivity for proxmox itself. Open up the proxmox shell and try pinging `8.8.8.8`. If you have issues, try checking the default gateway with `ip r

## Maximally-restrictive firewall

- **Datacenter > Firewall**
    - Add an entry:
        - **Direction:** in
        - **Action:** ACCEPT
        - **Interface:** vmbr0 *(Please double-check this.)*
        - **Enable:** *true*
        - **Dest. port:** 8006
        - **Comment:** Proxmox Web Server
    - Add another entry similar to it, except:
        - **Action:** DROP
        - **Dest. port:** 3128
        - **Comment:** Proxmox Virtual Environment REST API
    - Add another entry similar to it, except:
        - **Action:** DROP
        - **Dest. port:** 22
        - **Comment:** Proxmox SSH
- **Datacenter > Firewall > Options**
    - *Only do this after you've set up the three firewall rules above, otherwise you lock yourself out of Proxmox.*
    - **Firewall:** Yes
- TODO: This isn't blocking access to my TrueNAS VM. How do I configure this? (I probably just have to set the firewall for each VM, but I should look into things more to make sure I cover the full attack surface.)

## Notification Emails

I set mine up so proxmox authenticates with Gmail, and uses Gmail to send notification emails.

You can refer to these:

- https://www.youtube.com/watch?v=85ME8i4Ry6A
- https://www.naturalborncoder.com/2023/05/setting-up-email-notifications-in-proxmox-using-gmail/

You may also need to install this to get it to work (it fixed my "SASL authentication failed" "no mechanism available" error):

```
apt install libsasl2-modules
```

