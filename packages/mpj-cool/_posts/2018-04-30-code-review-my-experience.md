---
title: "Code Review: My Own Experience"
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

I practicing code review even practicing anything-in-version-control-review since 1.5 years ago when I started to contribute to Open Learning Exchange as an intern. It was a very interesting idea. You know my selfish mind at that time think I already good enough and what I push should be good, but not the case, but good is not enough. You know perfection is a lot of little things done right. Remember, the point here is __a lot__. We need to do right thing starts with the smallest fraction of our work to achieve perfection. I may exaggerate a little bit, but by doing the right thing from the start, perfection is not a very big thing.

***

> Perfection is a __lot__ of little things done right.

Okay so, I have been working for another cool company called [Midtrans](http://mappuji.org/) for about a year and it is very interesting. I've been working with a couple of teams and each of them has a very good knowledge and skills in software engineering and development.

It is just a blog about my experience there with code review. The first team I assigned was very strict with code review, but I am the exception. Because, I am the only Software Development Engineer in Test there when it comes to my work (test-related, build-system-related, deployment-related) I only received few amounts of code review, since the time mostly committed to feature development, but I know they do a very good job with code review in the feature development side. For sure, I miss the taste of anything-review from Open Learning Exchange.

Then after almost one year with the first time, I now assigned to another team. I was asked for creating a framework for developing an end-to-end test for the project (they already have, but need a couple of improvement to have more cleaner code and __high-enough to be dangerous__ test coverage). In a couple of days, I finish the whole framework with Gherkin as the testing DSL and Ruby-RSpec as the test engine and I cover almost all the main feature of the product. It is fulfilling to have built this thing from scratch by adding the DSL layer, creating the client module and many other.

After I push and demo to the PO (Product Owner) (I use GitLab CI to create a manual trigger for the pipeline, so the test will be executed after we finished the deployment) I received some reviews from my peer and it is pretty exciting. Really proud to have developers care about test-code too. Because last time another QA create a test framework and called it 'data-driven' test framework, they just create a piece of crap that read configs from an Excel sheet and picks configuration value by hardcoding the column number, one of the problems is people don't care about test-code. I know data-driven means more than just reading from an Excel sheet (But I am not creating a so-called data-driven test framework, I hate jargon!). I am not sure that maintainable enough to be maintained in the long run. That's why when developers look to my code and give reviews I feel respected by my peer as a developer! Because I am basically a software engineer - a developer too - a test developer.

He catches up many flaws I did and prevents catastrophe and problem in the future because of my previous design. He helps me to perfect my code and create a more maintainable code base even if its only for testing. After around 4-5 times review and follow-up review back and forth, we ended in a good state of code and confident to use it. Better, now the developer and PO now using it as part of their deployment checklist. I never feel this good before. Thanks, team.