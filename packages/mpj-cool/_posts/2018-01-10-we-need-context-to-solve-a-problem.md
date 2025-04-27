---
title: We need context to solve a problem
image: ./context.png
categories: [teknologi, akal-sehat]
tags: []
hidden: false
author: empeje
---

I work in Software industry especially in software development field. Here, I don't know why the term "best practice", "pattern vs. anti-pattern" seems filling many books, articles, conference talk, even in your hiring interview. Those words seems overrated. I prefer to call the so-called "best practice" as "good practice", why? It is because when I say good practice, I want to bring context to whom I talk. I want to say that this is good in this context, even if its work good in almost any cases, I can't say this as best practice because in some particular context there should be any better solution/approach/practice to solve the problem.

Today in after work hour, I read a book about microservice architecture. It is become a "thing" recently in software development field because some claimed benefit such as feature velocity, scalability, and more testable software. I am not against microservice, but I do believe that there is condition or context or situation that makes microservice architecture becomes better than monolithic architecture or any kind of architecture. Life is not black-and-white, there should be something in the middle. Back to the book I read about microservice versioning as an example of anti-pattern. When I read that paragraph I remember that in an online course I ever follow in an online education platform, the instruction said that versioning an API is good practice because we won't to break any application that already integrated or depends with our API.

To give more context, below are the a short paragraph from the [Production-Ready Microservices by Susan Fowler](http://shop.oreilly.com/product/0636920053675.do).

>*Avoid Versioning Microservices and Endpoints*
>A microservice is not a library (it is not loaded into memory at compilation-time or during runtime) but an independent software application. Due to the fast-paced nature of microservice development, versioning microservices can easily become an organiza‐ tional nightmare, with developers on client services pinning specific (outdated, unmaintained) versions of a microservice in their own code. Microservices should be treated as living, changing things, not static releases or libraries. Versioning of API endpoints is another anti-pattern that should be avoided for the same reasons.

To compare with others opinion, there is an opinion from [Vijay Alagarasan](https://www.infoq.com/profile/Vijay-Alagarasan) in his article titled [Seven Microservices Anti-patterns](https://www.infoq.com/articles/seven-uservices-antipatterns) in contrast with Susan Fowler's opinion, Vijay said something like this:

>6) Versioning Avoidance:
>Naively, we thought it would be only need one version of the service. Then we started to add major, minor versions to accommodate multiple consumers and frequent changes. Eventually, every release had to be a major release since the services were relying on consumer sign off. As a result, the number of containers increased very fast and it became a huge pain to manage them. Lack of runtime governance was another aspect that contributed to this issue. Some enterprises foolishly try to avoid versioning. Services need to be architected assuming that change is inevitable.  Have a strategy to manage the forward compatible service changes and allow your consumers to upgrade gracefully. Otherwise, it will lead to having consumers tightly bound to a service version and break when there is a change.
>The complexity grows as the number of services grows which the microservices world expects. Have a versioning strategy that can allow the consumers a graceful migration and assure providers can transparently deploy changes without affecting anyone. Limit the number of side-by-side major versions in the production and govern them.

Comparing those two opnions, I can't say much except I can extrapolate from respective author. Susan Fowler is SRE from uber and when she talk about microservice architecture, she talk about a software ecosystem built with microservice and in a face-paced environment like Uber it is very possible to have fast change in business decision and technical decision to change any microservice, so versioning microservice is not necessary because whenever there is new changes in the architecture somehow by updating the client library or by coordinating with new team who depends on that microservice to update their client after any upgrade won't break the ecosystem. OR, there is a rule that whenever we want to update microservice, it should be backward compatible.

Vijay in the other hand may come from perpectice of customer-facing API, where API exposed by our microserviced is accessible and used by the customer and we won't to introduce problem in the production and break compatibility. In that case, having a version solve our headache from breaking customer's integration to our API.

Lesson learned:
>To solve the problem or understanding any practice, knowledge, etc. We should bring context in mind. With the context in mind we can connect the dots easily and not misleaded by Jargon.