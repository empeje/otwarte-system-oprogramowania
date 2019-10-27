---
title: Explicit is better than implicit
image: ./bash_logo.png
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

Today, I got stuck with something in my coding work. I was in the end of the sprint and expected to finish a chore. However int he middle of doing some code, I got stuck with bunch of question from my coworkers. Since, I help the company setting up build system for majority of the services my employer has, I often becomes the one who contacted whenever there is some problem with the build system.

***

The first question from my coworker A is easy, he is more senior than me, and I just him a self service solution. After this first question, I go back to my work. After couple hours, another coworker, B, ask for help that they build system is not working. Somehow while doing integration test, the app can't connect to database to import schema. You know it is a typical `rake db:migrate` in a rails app. I thought the disk size in the machine was full, but it is not. I promise to him to call him in the afternoon. Afternoon come, and I haven't finished with my stuff. So, I help him debug, after couple of hours, no luck.

I take a break. Going to find some food at 6PM and then back to work, I finished my task at around 8 PM. Then, I go back to my coworker problem with the build system. I try to replicate in the local environment, but no luck, I ended up having different problem. After couple of hour, I can replicate in my local and I realize something, the mysql client and the mysql server is not compatible. We are using GitLab CI and the service in GitLab CI like DB, key-value store, etc are set up like this.

```yml
services:
  - redis:latest
  - mysql:latest
```

The `yml` snippet above is the stuff from their repo. I just realized that maybe `mysql:latest` Docker image is just updated in Docker Hub 3 days ago. If it was Friday, for Sunday we have new repo is make sense. Their project works best and I guess "was designed" for MySQL 5, and their app just not ready to use new MySQL. Turned out, just downgrading the `mysql` to version 5 solve the problem. Very impressive that it took me several hours to realize.

{% include image.html img="mysql_updated.png" alt="mysql_updated" caption="MySQL updated 3 days ago" %}

Then I remember with something I read in a T-Shirt wore by guy from Python Foundation in PyCon Indonesia 2017. It is the Zen of Python.

> Beautiful is better than ugly.
  Explicit is better than implicit.
  Simple is better than complex.
  Complex is better than complicated.
  Flat is better than nested.
  Sparse is better than dense.
  Readability counts.
  Special cases aren't special enough to break the rules.
  Although practicality beats purity.
  Errors should never pass silently.
  Unless explicitly silenced.
  In the face of ambiguity, refuse the temptation to guess.
  There should be one-- and preferably only one --obvious way to do it.
  Although that way may not be obvious at first unless you're Dutch.
  Now is better than never.
  Although never is often better than *right* now.
  If the implementation is hard to explain, it's a bad idea.
  If the implementation is easy to explain, it may be a good idea.
  Namespaces are one honking great idea -- let's do more of those!
  
Yeah, the second part, "explicit is better than implicit". By saying we always pull the latest MySQL, my coworker should now that sometimes there will be the time where MySQL updated their stuff and my coworker doesn't. Yeah, sometimes people forget this simple heuristic or they forget when to use this heuristic.

If you like me building something, you might be interested in this rule. The rule of three.

> If you can't think of three things that might go wrong with your thoughts, then there's something wrong with your thinking. - Gerald Weinberg<sup>[1](https://leanpub.com/systemdesignheuristics)</sup>

This simple rule is heuristics for sanity checking your thoughts or your design or your crafts or any thing you produce. As someone who built stuff for living, I found this heuristics save my time in the future a lot. And if you also a wager, this will save you your money.

Vale.