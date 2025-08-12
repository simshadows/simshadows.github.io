---
title: "Starting Off With Vim"
keywords: []

hidetoc: true

categories: ['Tech', 'Learning Diary']
original_url: "https://simsrambles.wordpress.com/2017/09/07/starting-off-with-vim/"
---

So over the past few days, I've been thinking of starting off with Vim. I really can't pinpoint the exact moment or thought process that led me to start down this route, but it continued on to become my current course of action: To force myself to use Vim for all my text editing (or at least within my Linux VM).

Along with that, I've also decided to further "Vimmify" my life by using more terminal-based tools (especially if they have Vi keybindings or they synergize well with Vim), using Vim emulator plugins for IDEs and graphical editors, and maybe rebinding keys on various programs to conform to Vi. I'm still in the process of exploring what exactly I can do, but for now, I've decided to also use tmux and ranger.

Rather helpfully though, I've been using exclusively i3 for the past 2 months, and at this point, I'm actually quite comfortable with it. Not that it took long. There actually isn't much complexity in the way of being productive with it at a basic level, maybe taking only 5 minutes to learn how to spawn terminals, set orientations, move things around, and use workspaces.

After getting comfortable with Vim, I'm interested in then moving on to Emacs, using Evil. However, that's an almost completely different rabbithole that I think I'll head down after achieving my current goal of becoming a Vim user.

That's my full plan. **So what do I expect to get out of it?**

1) I see this as a way to explore different workflows to improve how I do my work, along with learning a command-based editor and seeing how it fits for me.

Currently, I use Sublime Text as my main editor, usually on my host Windows/OSX system, and using shared folders used within a Linux VM running on Virtualbox. And within Linux, I'll tend to have many terminal windows open, flick between them in i3, and do any filesystem heavy lifting in a graphical file manager (usually on the host system since I do a lot of work in the shared folder; I don't remember the last time I opened Thunar since I'm fairly comfortable with a plain terminal). However, since Sublime Text on the host is limited to the shared folders, if I need to edit anything else in the Linux VM, I use nano.

Within Sublime Text, I am a very point-and-click-heavy user, though I still navigate short distances with a flurry of direction-key keypresses. And if I need to delete a large section, I'll either rapidly hammer backspace (usually if it's about a word long), hold backspace (usually up to about a long line long), or just use the mouse.

Having seen videos and people move around and edit super-quickly with Vim, and having done a bit of vimtutor on the train (I'm roughly halfway), it's hard not to be curious as to whether or not I'm capable of achieving the same level of efficiency in text editing, especially considering the very command-based nature of Vim (as opposed to the graphical nature of Sublime Text without plugins). Instead of extremely repetitive keypress spam, awkward hand movements to reach the direction keys, and slow yet imprecise mouse point-and-click action, Vim appears to trade much of that for highly efficient key combinations and hand movements, albeit at the cost of requiring the user to memorize and commit them to muscle memory. Similar can maybe be said with Vim-inspired tools such as ranger.

And in addition to making text editing more efficient, I'm also interested in becoming familiar with more advanced features and extensions, and simply exploring more tools and seeing what fits.

Of course, I could've already started using such things with Sublime Text by exploring unused features and adding extensions. However, keeping access to the convenience of simply pointing and clicking or copy pasting content around instead of using the editor's features and finding cool plugins is a tempting escape route from the steep learning curve of becoming more efficient. I suppose you can say that imposing restrictions is a way of breaking out of my current local maximum in efficiency, with the hopes of finding a better local maximum.

2) Learning command line tools allows me to be versatile, with Vi and Vim being particularly ubiquitous on *nixes.

Even if I never ultimately pick up Vim, Vi/Vim could make simple text editing tasks over command line more comfortable than nano. But if I do pick up Vim and such tools, it'll open up the possibility of doing a large amount of work over SSH rather than forcing me to form awkward workarounds such as file transfers and local file editing, and I can immediately work comfortably on many machines since I'd likely just pick up tmux and Vim.

Additionally, a CLI-based workflow will keep me in the command line. Considering how much work is done there, I'm expecting that this will make things smoother as I'd simply stay where I am and use all the same tools rather than switching between windows.

3) Vim appears highly standardized and well-supported, open-source, and will probably not change in unnecessary ways for a very long time.

I can't quite verify the truth of that just yet since I haven't explored Vim yet nor am I good with future projections, but having workflows be highly standard/supported and enduring like this is always a plus, ensuring what you learn and the extensions you write for something will remain relevant for a very long time.

Counter to this include proprietary and poorly supported tools. As nice as Word is, it's still subject to Microsoft's whims. The GUI changes over time, it's terribly unstable, Linux support is non-existent, and while compatibility from older files will probably be excellent for some time thanks to the popularity of Word, I feel I can trust Latex more for files to remain compilable for a very long time, if not being much more easily solved by defining or refactoring commands than the more proprietary files of Word. Granted, Latex IDEs and text editor plugins can change or die by the dev's hands, but at least Latex isn't dependent on them to work. Stability might also be a mixed bag depending on your IDE/editor, but again, if something's broke, just replace it.

(It should perhaps be clarified though that Latex is inherently different since it's a typesetting system rather than a word processor, but let's leave technicalities aside for now.)

4) It's an exercise in learning technologies.

I unfortunately find that I get far too comfortable with what I know. Trying Vim out could help me be more comfortable breaking out of my comfort zone, which is something I think every tech professional must strive for to be competent at what they do.

And finally...

5) Dick-waving.

This one's obviously absolutely non-essential, but as much as I'd like to say I'm much better than that... I'm probably not. In my simple mind, users of such high-skill-curve tools as Vim and Emacs get immediate street cred, their screens always look the most "cybery" (i.e. sorta like what you'd expect Hollywood 1337 h4x0r5 to have with cryptic text, fast-moving cursors, terminals, etc.), and editing looks impressively fast and efficient.

**Of course, there are probably still a few potential issues with settling with Vim,** the most evident being reliance on commands.

There will most certainly be times when Vi commands aren't supported. An immediate example is that right now, I'm writing this post using [wordpress.com](https://wordpress.com/)'s post editor, and there will be times when I'd have to work with an IDE without my Vi emulation. Mistakenly using Vi commands and navigating with the HJKL keys everywhere else would almost certainly make me look and feel dumb while costing time to fix.

I also particularly dislike the design choice to stick with the *HJKL* keys for movement rather than *JKL;* since my typing style involves resting my right index finger on the J-key notch, and keeping roughly that amount of space between my hands. A suggested solution, however, is to not bother moving all four fingers over the HJKL keys and instead use the index, middle, and ring fingers on the JKL keys while multitasking the index finger to the H key when needed. That seems much nicer to me, so I guess I'll give that a go.

Changing keyboard layouts (to different regional keyboards or even to something like DVORAK) is also made more problematic. Although command memorization by mnemonic is possible, I have a feeling some level of positional muscle memory might still be involved, especially with the HJKL movement keys. Though, it's probably highly unlikely that I'd end up having to use a DVORAK or other exotic keyboard anyway, and the challenge of typing normally on them would be challenge enough.

So those are my current thoughts with adopting Vim and a more CLI-based workflow. While I have a few issues with becoming far too dependent on my tools, it's probably still best to try going through the pain of the steep learning curve now with the hopes of adopting these new tools for a lifetime of high efficiency, or at least knowing I tried, being enlightened and inspired to continue improving my workflows, and simply for the fun of learning such a novel thing.
