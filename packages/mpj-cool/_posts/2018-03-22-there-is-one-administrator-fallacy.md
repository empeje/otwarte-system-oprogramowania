---
title: There is one administrator fallacy
image: ./error.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

For the last one year, as an early career professional in software engineering and development, I am very happy to involve in sort of distributed system development and getting exposed to several very good articles, books, and conference in the field. That's help me to better understand nature of distributed system and see there is many thing we can play and research in this field.

***

During 1994-1997, several folks in Sun Microsystems including L. Peter Deutsch and James Gosling (the inventor of Java) introducing the 8 fallacies of distributed system. The fallacies are <sup>[1](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing)</sup>:

1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn't change.
6. **There is one administrator.**
7. Transport cost is zero.
8. The network is homogeneous.
I think each item of the fallacy seems obvious and self-explanatory, but in practice for newbie like me in the wild, there just many ways to do things wrong.

In this article we focus in the sixth fallacy, which is **there is one administrator**. I am not a system engineer or system administrator, so when I first read this fallacy it seems obvious and easy to grasp until I doing administration myself in a distributed fashion.

Basically this fallacy means many things to a lot of different context, but I try to summarize. Before that let me share my own background. So, this idea very annoy me after leader in open source project I contribute reminds me that I need to do this and that before actually doing something on the servers we operate (I'll explain the end of the blog post). I feel not good, because I already now the fallacy, but yet I still don't actually prevent this fallacy in practice. I also have another bad time when I am doing something stupid in a build server I and other folks maintain in my current company where I make the whole continuous integration in almost every team in the company can't working due to local Docker image which not pushed to online registry deleted by me by running command I not fully understand.

Here is my take,

**There will be different administrator with different level of expertise**

As I already mentioned in the previous section when my leader in open source project I contribute to always check the logged in user before doing an operation, I realize that in context of Linux administration <em>not every administrator has the same level expertise and experience</em>. I have no to little experience managing server remotely with several people have access to the server.

**Coordination of upgrades**

Have you ever imagine you are an Android or iOS developer and your team develop back-end service that not backward compatible and only latest version of your app having already implemented your new spec? Yes, your app will break in the wild and your user will complain and give bad ratings. It is the example of one administration fallacy where the admin of iPhone or Android phone which use your app is not a single person, but many kind of people.

Another example is when you update your database, say MySQL, will your entire ecosystem support that version already? You know, someone also need to update the library or the implementation detail in their app.

**Human error**

Recall my story about deleting Docker images in build machine, where I mistakenly deleted all the images because I run a command where I not 100% know the behaviour and even worst I am doing `-f` or forced command to that command and impacted a lot of user of the service where the server serve.

***

**How to reduce mistakes for newbie like me**

This is the simple tricks the lead of the open source project I told in the previous section when you are dealing with Unix system.

Check everyone who login with `who` or `w`

```bash
who
#root@amachine:~# who
#root     pts/0        2018-03-21 14:17 (c-66-31-202-63.hsd1.ma.comcast.net)
#root     pts/1        2018-03-21 19:13 (139.192.125.209)
#root     pts/2        2018-03-21 20:21 (139.192.125.209)

w
root@amachine:~# w
# 20:22:18 up  6:05,  3 users,  load average: 1.04, 1.03, 1.00
#USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
#root     pts/0    c-66-31-202-63.h 14:17    1:04m 33.41s 33.20s top
#root     pts/1    139.192.125.209  19:13    1:06m  0.11s  0.11s -bash
#root     pts/2    139.192.125.209  20:21    1.00s  0.12s  0.03s w
```

Check history of the user who logged in with `last`

```bash
last
#root@kraken:~# last
#root     pts/2        139.192.125.209  Wed Mar 21 20:21   still logged in
#root     pts/1        139.192.125.209  Wed Mar 21 19:13   still logged in
#root     pts/2        139.192.125.209  Wed Mar 21 19:04 - 19:10  (00:05)
#root     pts/1        139.192.125.209  Wed Mar 21 18:32 - 19:13  (00:40)
#root     pts/1        139.192.125.209  Wed Mar 21 18:27 - 18:32  (00:05)
```

Just doing that before you login and coordinate with other logged user when you want to do risky stuff.

Use `screen` utility when collaborate in single machine with people distributed in different place.

```bash
#start screen
screen

#list all screen session
screen -ls

#detach screen
#CTRL+A and D

#resume screen
screen -r

#take over: detach and resume
screen -d -r
```
You can learn more about `screen` utility [here](https://www.tecmint.com/screen-command-examples-to-manage-linux-terminals/).
