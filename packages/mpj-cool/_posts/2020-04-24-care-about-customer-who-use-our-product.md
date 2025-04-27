---
title: Product Support. Customer Support
image: ./startup.jpg
categories: [teknologi,bisnis]
tags: [featured]
hidden: false
author: empeje
lang: en
---

For the past 5 months, I've been absent from writing blogs. This mostly due to new activities I've been pursuing and some challenges I'm facing at work. In this article, I want to cover a thing that really bothers my mind and I can't urge enough to speak out loud about it. So this is about talking to the customer. By talking to the customer here, I mean talking to them to support them while they having difficulty using our product.

I've been lucky, I've started my career in software testing and system engineer. While doing software testing, I built an empathy to the user who uses the product I built with the team. Because no software is perfect, as no human is perfect. Having some defects in the software system is an expected scenario. I also built empathy for how people operate the software. When you work as a system engineer, you'll know how your system behaves, you'll notice that if the programmer not giving enough log, or not putting enough instrumentation to observe the system. because when your system doesn't have a good enough observability you as a system engineer will be the first person to be asked by your team to enter the system and do some inspection or even manual intervention e.g. using a script when there's an issue.

Again I've been lucky, for the past 5 months I've been talking directly to the user as I service clients as a freelance consultant or as a mentor. I've faced my client really satisfies thankful for my work. I've faced a student really thankful for my teaching who helped them pass their exam with good grades or make them excel at work. However, I've faced a situation where I should reject a client, or having them angry at me because we misunderstood something such that the work result is not satisfied enough.

Long story short, not every people already built that kind of empathy to the customer. So when I've got a lot of reports that not include a piece of meaningful information on it, I feel a bit mad.

So this is the story. Me and my team at [ErudiFi][ErudiFi] just rolled-out our new iteration of a tuition installment to the college students and vocational student in Indonesia. The product was far from perfect, there should be imperfection here and there. So as expected I got a lot of reports. For the past 1.5 years, I haven't been that much involved in operating software systems as I was 3 years ago, so when people just said "the user stuck here, the user stuck there" I'm shocked.

I keep asking the reporter with the same question:

* What is their username?
* Where did they stick? any URL or page they're referring to?
* What is the step by step process the user has followed?
* And additional info like the browser type, device type, and network they're using.

But the reporter is not always the same person, so not everyone learning it. For a few days, I keep asking the same questions until I realize I need to stop this. So, I find material about how to write a better bug report, but most articles target a QA professional. So I decided to create my own.

This is what I wrote.

> Because there's a lot of bug reports, I want to explain a bit about how to better at bug reporting. So that the tech team can respond and find the solution faster. So, folks, if we just said "user stuck here", "the user get an error there", this is doesn't help us help the customer, if we want to help the customer better, we need more context and information.
>
> 1. User Identifier, you could give us an email or phone number so that we can cross-check with data in our system
> 2. We need a step by step process that the user followed because without knowing this we can only guess. A good report can tell how the user arrives at the error in our app. Information like the currently open URL or the page they're open, it will help us isolate the bug, and finding the cure even faster.
> 3. Error frequency. If there are a few users that encounter the same issue, we can combine the report into one, so that we can have multiple samples of the same issue. It also helps us to not investigate something that actually the same thing.
> 4. We can also tell whether the issue is intermittent or a consistent pattern. This will helps us how fast we need to react to the issue.
> 5. One other very important metric is we can report how critical the issue is. For example, a blocker is an issue where we need to fix it immediately because if not it stops our business to operate as usual; a major issue is an annoying issue but not preventing the user from continuing to use our service; then there's a minor bug, for example, a cosmetics issue on the UI; and then there's a suggestion which basically only a suggestion from the reporter to helps us create a better product.
> 6. Information about the user device e.g. handphone or desktop, type of browser, and what kind of network they're connecting to Wi-Fi vs. cellular.

Then I posted this guide on the public channel for future reference, so that the member of the team can understand our issue of handling user reports. Because, we programmer are not a god, we need to have the context in order to solve a problem, without a context, information, and data, we can only guess.

### Conclusion.

* Ask for a context.
* Empathize to our peers, they'll not have the same experience as us. If we empathize with them, they'll empathize with us as well.
* Document something and let everybody on the team knows, so the knowledge diffuse and spread to the entire team.

[ErudiFi]: https://www.erudifi.com/
