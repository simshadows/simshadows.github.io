---
layout: post
title:  "VirtualBox Linux VM Development Environments"
categories: ['Tech', 'Learning Diary']
---

I've chosen to do the majority of my development work in a VirtualBox VM running an ultra-lightweight configuration of Arch Linux, with the VM typically running fullscreen or in a large window. All my files are in the virtual disk, I use a text editor inside the VM, and all of my tools are in there.

It works beautifully for me, but for many, native development is suitable enough. Running natively has the distinct advantage of performance, tools for practically all popular needs exists on all major platforms, and you often won't need to mess with the environment too much anyway once you're established. Even the barrier to developing for Linux systems on Windows is largely lifted thanks to Vagrant, Docker, or possibly even WSL.

And for some, native development will be the most sane option, particularly if hardware access is required as GPU access can be difficult and I/O may be poor. For instance:

- Game developers often have heavy workloads that need the GPU, and games are often developed for Windows,
- Machine learning and other scientific workloads often benefit greatly from GPU acceleration, and
- I personally have trouble accessing any USB port from within any Linux VM. (This issue may be fixed though.)

So if that's you, you know who you are. There are solutions (such as [this](https://www.virtualbox.org/manual/ch09.html#pcipassthrough)), but I haven't had a chance to play around with them yet.

However, there are many interesting advantages that make a VirtualBox Linux VM well worth considering if it works for your workload.

**Note: I'll be talking more on the pros and cons of the virtualization side of things rather than diving too specifically into my Linux setup.**

## Advantages

### Advantage 0: VirtualBox and Linux are FOSS

Not really a point I'm arguing for (hence "Advantage 0"), but it's most certainly a plus!

### Advantage 1: It's literally a Linux system that just bloody works.

For Windows users, I think this is the most important point. With a VirtualBox Linux VM, there is no need to wrestle with your native OS to get something working, and you dodge a lot of the weirdness and tech-acrobatics that can be required. Yes, it can work if you tried hard enough, but sometimes it's nice to simply not have to go through that.

On top of that, you'll be working on *literally Linux*. If you're a Windows user taking computer science classes in college and your class requires you to program in C on a Unix-like system, this can save many headaches while at the same time familiarizing you with the same environment everyone else is using.

Or if you, like me simply prefer working in Linux but for various reasons have to install Windows or Mac OS natively on your machine (such as to game on Windows or to reap other benefits Windows and Mac OS have over Linux), you can still feel right at home.

### Advantage 2: Portability

Not only does the VM work, but it generally works wherever the latest version of VirtualBox is supported.

This is particularly awesome if you have multiple machines and you want to work on all of them. In my case, I have a Windows-based gaming desktop machine and a Macbook Pro, and I simply copy the VM files between them as necessary. (I only bother copying the VM after major system changes thanks to `git`.)

Everything moves, so the result is that **it works and looks practically exactly the same, everything from your text editors to your tools, your files, and your perfectly arranged directory structure. Everything works exactly how you like it.** No need to somehow match certain settings between your computers, no need to resolve mismatched compatibility. And with the massive amount of customizability and choice in Linux-land, all those tweaks you made? Yep. They all stay with your VM.

Reformatting and reinstalling your host OS is also made simpler since you don't have to bother as much about your development environment; just reinstall VirtualBox and copy your VM back in. I've had to do that to resolve sluggish performance on my Mac.

### Advantage 3: VirtualBox Snapshots

The state of your entire machine can be versioned so you can go back to a different point at any time.

To me, this has two broad but important implications.

First, it allows you to recover faster from a broken system. However, this assumes that you create snapshots regularly. In my case, I generally make snapshots between major system changes, after successful whole-system updates, or major `/home` directory structure changes. Since I use `git` and put repositories on GitHub quite liberally, I don't really bother too much if I lose changes within repositories after being `git push`ed.

Second, snapshots enables experimentation, which I think is important for users learning how to use Linux (such as myself!). Snapshots can even be taken while the machine is running, so simply taking snapshots at key points will allow you to try new things, observe the effect, and easily recover if you end up breaking your system.

Snapshots do take host disk space though, so I only keep two snapshots into the past (deleting old ones), and I don't "fork".

### Advantage 4: Isolation

This can be a huge boon if you like tinkering and exploring, in case you mess something up or if you accidentally run malware or get hacked. Everything that happens inside the VM stays in the VM. If the VM crashes, it probably won't mess up your host OS.

*(Do remember though that this isolation is not perfect. It does however make things increasingly difficult for attackers.)*

*(Also, your VM may not be guarded against consuming your computer's resources, so your computer may freeze if you hit it too hard. That should be obvious, but I'd like to mention that for clarity.)*

### Advantage 5: A VirtualBox VM Encourages Experimentation

I've already touched on this in my discussion of snapshots, but all of these points so far are great for experimentation. I don't think I need to explain any further.

### Advantage 6: Linux is Awesome

Depending on who you ask, the fact that you're running Linux can be a huge advantage or disadvantage.

In my case, I absolutely love using Linux, so I'll list it as an advantage. (I'll probably write more on this in the future, so I'll leave it at that for now.)

## Disadvantages

Such awesomeness unfortunately comes with a few major downsides that can make or break the entire experience.

### Disadvantage 1: Hardware Access Difficulty (especially GPU and USB)

I've already mentioned this earlier: while the system works excellently from within, I've had major difficulties getting the VM to interface and work with USB (VirtualBox USB passthrough has been unusably unstable for me), and I suspect GPU isn't so smooth sailing either with VirtualBox.

However, there are probably better solutions out there (or maybe VirtualBox's USB drivers are fixed). I haven't really looked into it so if you find something, I'd love it if you could [let me know](mailto:contact@simshadows.com?Subject=I%20found%20cool%20virtualization%20software%20you%20should%20try!)!

### Disadvantage 2: Performance

It should be obvious that VMs come with performance penalties. Your VM will be eating up a portion of your CPU, memory, and potentially your entire graphics card.

However, I find my experience to be pleasantly smooth (no noticeable performance penalties) with the following settings:

- 2048-4096 MB RAM assigned to the VM,
- Allow the VM to use as many cores as there are cores on your computer and with no execution cap,
- 256 MB Video RAM assigned to the VM, and
- Enabled 3D and 2D acceleration on the VM.

These settings work perfectly on my late-2013 Macbook Pro with 8GB of RAM (and it even supports me using both a Linux VM and a Windows 7 VM concurrently!), but it may not work on your machine, especially if your VMs aren't configured to be as lightweight as mine. As such, **your mileage may vary.**

If you want ballpark numbers though, my (untested) advice is to have a minimum of 8GB of RAM in your computer in order to be comfortable using a VM. Otherwise, any decent 2-core laptop manufactured after 2012 will probably serve you fine.

(Or, you could just test performance on your machine anyway since VirtualBox and Linux are free :)

### Disadvantage 3: The VM requires extra disk space

My Linux VM takes 34.86 GB at the time of writing, but it can be much smaller. Within the Linux VM, I'm only using 20.9 GB.

That consumed space is barely felt in my 256 GB Macbook though, and I suspect that might be the same with many others users.

As for the additional 14.0 GB of virtual disk bloat, I suspect it comes from several places:

1. Having to install the operating system,
2. Having to install a lot of standard tools that may already exist in the host, and
3. The virtual disk file is probably not filesystem-aware, so deleting files may not actually shrink the virtual disk file.

There is a way to lessen the impact of point #3 by "compacting" the filesystem and zeroing unallocated blocks, but that can be a hassle. I don't even bother anymore.

(For reference: My Windows 7 VM takes 51.28 GB, and it's basically a fresh install!)

### Disadvantage 4: Your entire VM is accessible

Generally, sensitive data is protected by preventing users' direct access. I'm not just talking about your business documents and various embarrassing selfies; the software itself and various cryptographic secrets can be stolen or tampered. Having a full VM sitting on disk on your host OS and accessible through your user (as opposed to needing administrator/root access) opens you up to a variety of potential attacks. For instance:

- Malware may scan your files and steal RSA private keys from your unprotected VM,
- Malware may install rootkits in the VM that can be hidden from detection, and
- If someone steals your VM, they've practically stolen your computer!

A possible solution is to [enable virtual disk encryption](https://blogs.oracle.com/scoter/virtualbox-50-enhancements-and-features:-disk-image-encryption). This should make it exceptionally more difficult to "smash-and-grab" from the disk, though it's not perfect since keyloggers and other techniques can still be used to circumvent it.

In practice, it *may* not matter too much as long as you have good security practices; if your user is compromised, it's probably just a matter of time before they gain deeper access to your machine. However, it pays to be a bit paranoid.

*(I'd also like to clarify: You probably use disk encryption with your host OS, but that can only help against physical theft of your computer (and even then, [it's not necessarily perfect](https://www.youtube.com/watch?v=pKeiKYA03eE)). You will still need to encrypt your virtual disk in order to mitigate those attacks I mentioned above.)*

### Disadvantage 5: It's practically another system to maintain

Unfortunately, having a VM also means another system for you to maintain. However, that may not actually be that bad. This is a great way to learn Linux!

### Disadvantage 6: If it ain't broke, don't fix it.

Perhaps everything is working perfectly fine for you developing in your native OS, so it can be difficult to see why you should move to a VM.

However, maybe consider trying out a VM anyway. Trying new tools in general is a great way to learn new things and improve your workflow!

## Final Thoughts

Hopefully I've provoked some ideas on the possibilities with virtualization. However, you may still be wondering: Why Linux?

After all, the entire GNU/Linux ecosystem is the other major part to consider if you want a VirtualBox __Linux__ VM.

I'll leave that for another post.

