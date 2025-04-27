---
title: Close un-deleted files on Linux
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

It is Monday, I starting my workday by having a hands all Monday meeting in the company lounge. This is where we share each other department update. Very interesting to be part of a growing company. In the middle of the update, sometimes I take a look to some graphs of service I maintain. One of them showing me some anomaly where one of the service node having disk space usage increasing time by time in the last 5 days. I've been looking to it before weekend but was not take it that serious. Turned out it takes 100% of disk space and some of the functionality of the app did not work as expected. So bad.

As someone who always sit in the middle, I used to be an SDET (Software Development Engineer in Test) where I in the intersection between Dev-Ops-QA, having a breadth knowledge but not depth, I little bit nervous handling this problem. First I use my two little tools handling this (before that I make the node to maintenance mode). I use `df -h` to see current disk usage and `du -hs` to search the biggest file in the system. Finally, I found the biggest files there, it is Logstash Forwarder who the job is forwarding system's log to the centralize log server, it's error log piles up and taking the whole disk space (so bad I don't have alert in that log process). Since it is mostly an error and I need delete it, I take decision to delete the error log, but **something weird happened**. After I delete all the logs, the disk usage is not decreasing.

After spending roughly 15 minutes to figure it out how to actually delete it. In the end I ask more senior DevOps engineer there. And he told me, there is un-deleted files. It is about something we already deleted but it is not released because it is belong to some process. Finally he doing some Google search to find the actual step to fix that and send me this awesome [link][DELETE_FILES_DISCUSSION]. The solutions was very easy. Find the PID of the process who lock this file and then restart the process. Here is my actual step, I share here just for documentation purpose.

```bash
# find the pid
find /proc/*/fd -ls | grep  '(deleted)'

# copy returned pid and search it
ps aux | grep <pid>

# kill it
kill <pid>
```

In my case I'm not actually kill it, I just restart the service directly via Unix `init.d`. For sure, there is more elaborate way to do this, but I found the command above very helpful, hopefully it can save me next time, and maybe save your time too.

[DELETE_FILES_DISCUSSION]: https://unix.stackexchange.com/questions/68523/find-and-remove-large-files-that-are-open-but-have-been-deleted
