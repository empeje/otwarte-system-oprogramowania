---
title: Check connectivity between server
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

I want to tell story about my task today. The story began from when I was in high school. I was very interested with computer, but when I graduated from high school, my parents little bit skeptical about career in computing since they have no idea about what it is and at that time career in computing is not popular as it is now. So, I decided to enter engineering physics program in one of the biggest university in the country. Well, at that time admitted here is relatively easy. I'm not that smart and the program was not popular at that time.

Now 6 years later turned out I make my career in computing, especially in software development. I'm starting my career as a software tester, a title which is not that cool for me. Yeah, I always trick my way to get my goal. When I go to the college, I choose unpopular program in order to make me easy to go to the top college. Now, I choose starting my career as software tester to make me easy to jump to another career which I more like to do, "real" programming - software development.

In my current role, I given freedom to do development or infrastructure stuffs. Sometimes I do code and sometimes I do infrastructure stuffs. Really interesting. Since I'm not a **hardcore** system administrator when I given task to check network connectivity between to server (in this case from my company to a bank), I'm feeling little bit nervous with my ability. In order to save me in the future, I want to share little tricks about **traceroute** and **tcptraceroute** and some tricks to check open port with **nc**. I also will talk about **telnet** little bit.

### What is `traceroute`?

>Traceroute is a utility that records the route (the specific gateway computers at each hop) through the Internet between your computer and a specified destination computer. It also calculates and displays the amount of time each hop took. Traceroute is a handy tool both for understanding where problems are in the Internet network and for getting a detailed sense of the Internet itself. Another utility, PING, is often used prior to using traceroute to see whether a host is present on the network.<sup>[1][TRACEROUTE]</sup>

So, put it frankly you can trace in which hop/router your network connectivity from some workstation to another workstation stuck. The standard `traceroute` package usually use to test UDP connection, but there is similar tool called `tcptraceroute` which basically do the same but for TCP connection. Here are some examples

```bash
traceroute <DESTINATION_IP_OR_HOST>
traceroute <DESTINATION_IP_OR_HOST> <PACKET_SIZE>
traceroute <DESTINATION_IP_OR_HOST> <PACKET_SIZE> -m <MAX_HOP>
tcptraceroute <DESTINATION_IP_OR_HOST> <DESTINATION_PORT>
```

Basically this tool expect each hop return with ICMP response by default, but you can also ask the `traceroute` to expect PING response by doing `-I` to the command, for example.

```bash
traceroute <DESTINATION_IP_OR_HOST> -I
```

### What is `nc`

Netcat or `nc` is a tool included in `net-tools` package in many popular Linux platform, while it is not that popular, I like this command a lot. Here is my favorite command to check port connectivity.

* Checking TCP port connectivity
```bash
nc -zv <DESTINATION> <PORT>
```

* Checking UDP port connectivity
```bash
nc -uzv <DESTINATION> <PORT>
```

### What is `telnet`

The other tool which usually use to test connectivity between server is `telnet`. It is included everywhere, so that it becomes a go to tools to test connectivity. Here is the syntax to run the command.

```bash
telnet <DESTINATION> <PORT>
```

You'll receive `connected` message in the prompt if the connection is established. Please take notes that it uses TCP/IP for the connection protocol.

This is my little notes about connectivity checking tools. Not the best one, but enough for my notes/references in the future.

[TRACEROUTE]: https://whatis.techtarget.com/definition/traceroute
