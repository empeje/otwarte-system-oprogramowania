---
title: Tweak productivity with git pre-commit hook
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

This weekend, I've been thinking that I'm not as productive as usual. While usually, I can think of any post idea I can write, this time I have little to no idea. However, I remember something about git pre-commit hook. It is something that helps me minutes to hours of manual task when I do code and keep me productive.

Have you ever have a team where they're very strict about code style and even put a linter job in the continuous integration pipeline? I have been in this kind of team too. It is interesting, but when not doing it right, you'll end up spending a lot of time fixing code style and clutter you commit message while you fix the code style one by one.

Here is the snapshot of the pipeline.

{% include image.html img="pipeline-snapshot.png" alt="pipeline-snapshot" caption="Pipeline snapshot" %}

It is a Ruby package where I need to download dependencies first in the bundle step and the downloaded dependencies will be used in the rest of the pipeline. If you see carefully there is a code-quality job. It is a job where we run `rubocop` ruby linter to statically check for code style. It is a good thing to make the style consistent, but sometimes me and fellow developer forget to fix the styling before committing to the upstream repository. In the end, I use git pre-commit hook for the solution.

It is a very simple step I just need to add these lines

```bash
#!/bin/sh
bundle exec rubocop
```

to the `.git/hooks/pre-commit` file and when I try to commit something I'll get this kind of message.

```bash
Inspecting 689 files
.............................................................................................................................................
.............................................................................................................................................
.............................................................................................................................................
.............................................................................................................................................
.............................................................................................................................

689 files inspected, no offenses detected
[a-branch a9b11f7e] A commit message
```

Good enough right? But one problem, if you somehow already have a broken styled code committed and you want to push it you'll end up having that broken styled code in your upstream repo. To overcome this you might also want to add git pre-push hook beside having git pre-commit hook.