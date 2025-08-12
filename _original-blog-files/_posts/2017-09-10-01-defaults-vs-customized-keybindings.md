---
layout: post
title:  "Defaults vs Customized Keybindings"
categories: ['Tech', 'Learning Diary']
original_url: "https://simsrambles.wordpress.com/2017/09/10/defaults-vs-customized-keybindings/"
---

So very quickly following [my last post](https://simsrambles.wordpress.com/2017/09/07/starting-off-with-vim/) here on my initial thoughts with starting Vim, I proceeded to learn tmux first to immediately replacing my habit of constant spawning of new terminals in i3. So far, I've found [this](http://www.hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/) to be a nice, gentle introduction to the concepts and the commands before I move onto denser reading.

However, I've so far found some of the default keybindings to be really horrible to remember. Though one could say I should just rebind everything to suit my needs, I think the issue of whether to keep with defaults or to customize is actually a bit more complicated than it might first seem.

## A few keybindings I've disliked so far

Why does tmux's vertical splitting have to be `C-b + "` and horizontal splitting be `C-b + %`? At least i3 uses `$mod-v` and `$mod-h`, which make lots of intuitive sense and meant it took no time at all to get comfortable with them.

Another issue I have is the extremely strange choice for Vim to have the HJKL as the default directional keys, which is something I mentioned in my [previous post](https://simsrambles.wordpress.com/2017/09/07/starting-off-with-vim/). Of course, the reason these keys were chosen in the first place was [historical](http://www.catonmat.net/blog/why-vim-uses-hjkl-as-arrow-keys/), and standards such as this can get so settled that changing them will only cause anger, confusion, and broken software (as I imagine some things such as plugins and scripts can rely on them). I'm not saying we should get everyone together and devise a new standard to change the defaults to (though if needed, making a new widely recognized standard in which people optionally configure to, or even have things officially support might be cool).

i3 however has it right by assigning JKL; as the direction keys, as it should've been in the first place (at least in my opinion). This one's understandable since default `$mod-h` is used to make a horizontal split container, though it only further complicates things. If I kept HJKL for Vim and everything else, should I just keep i3's JKL; and remember to right-shift my hand each time? Or should I rebind i3 to maintain parity between all my keybinds? If I rebind, what do I rebind `$mod-h` and `$mod-v` to now?

Perhaps I should maybe just save myself the pain and rebind everything. Hell, maybe I should change the direction keys to IJKL (which makes a tonne of intuitive sense, being T-shaped), though that would mean I'd need to rebind Vim's insert mode key.

I could perhaps get into more, but I think that would be for another blog post (if I choose to discuss this further), or perhaps it might be best if I learn tools first before criticizing their specific choices.

## Arguments for rebinding keys

In favour though of rebinding is the reduced complexity of completing many tasks as my brain would have less mental overhead when switching between contexts of controlling Vim, tmux, i3, and whatever other program such as ranger. If I had to switch from Vim's HJKL to i3's JKL;, I might first have to consciously reframe my mind to switch keys. In Vim, if I wanted to move in a direction (one step at a time at least), my mind would be automatically translating my intention to unconscious mechanical movement of my fingers to strike HJKL for their respective directions. By switching to i3, I'd have to "reconfigure my mind on-the-fly" to instead translate direction into finger movements that hit the JKL; keys. The solution would clearly be switching everything to use the same direction keys.

Similarly can be said with different pane-splitting in tmux (`C-b + "` and `C-b + %`) vs i3 (`$mod-v` and `$mod-h`).

Rebinding can also optimize hand movements if done correctly. Sure, I could one day get used to the different controls, but if I optimized my bindings to make the most common operations require the least travel time or contorted hand gestures, the long-term comfort could be worth it.

Some keys can also lack any mnemonic connection. How do `C-b + "` and `C-b + %` have anything to do with horizontal and vertical splits? If I end up taking a break from using tmux (such as a long holiday), or during any "brain farts" where I randomly forget my keys for a second, being able to work backwards from mnemonics could make things easier to ease back in.

## Arguments for keeping default keys

The first and most important issue I think with whether or not to rebind is that getting used to my own weird keybinds will mean I'll have a lot of trouble using systems that aren't mine. If I'm pair-programming, I'd like to know that my partner would be able to use my machine, and likewise I'd like to know that I'd be able to use their machine. Or perhaps if I'm working on a company machine, if for whatever reason I'm stuck with default Vim, I'd like to know that I'm still capable of using it. Or perhaps I'm just quickly connecting to a web server to make a few adjustments, only to find I have to spend a quick minute making some large changes to a config file which would be much easier with Vi. Being able to just jump right into everything with no issue would ultimately make me more efficient and productive.

I'd also be able to use Vim emulators in IDEs and such out of the box.

But what if I could just get used to it? After maybe a year of constant daily use, I'd likely no longer be hindered by these context switches; I'd just do it like it's second nature. Additionally, if I learnt how to switch contexts like that, I could likely pick up more programs that differ in similar ways much more easily without further being dependent on having to rebind everything to be the exact same. Overall, I'd become a more versatile computer user.

Emphasizing cognitive flexibility might also have an advantage if I choose to pick up a new keyboard layout, such as if I had to work on a German keyboard, or a DVORAK keyboard. With the explicit ability to reframe my mind as needed and rely less on positional motor memory, keyboard layout switches might be easier in the future.

## My verdict

I think I might choose to roll with defaults for the meantime, and only after getting proficient with them will I consider reconfiguring controls.

If I find the controls to be acceptable by then and not inefficient, I think I'll keep using defaults after that (due to the advantages of everything being readily usable out-of-the-box), but if I choose to remap, at least I'd then have a better understanding of how I use the program to optimize my usage. Only by then will I know my common-cases and other habits.
