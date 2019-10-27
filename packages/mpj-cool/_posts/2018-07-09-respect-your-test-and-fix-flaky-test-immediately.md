---
title: Respect you test and fix flaky test immediately
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

Like other mainstream people, I often spent days without done any fulfilling activity. Fulfilling activity may vary from person to person. For example you might be fulfilled when you meet your girlfriend or a girl you like and approach. Another people might be fulfilled when they helping people. Or if you like me, you might be feeling fulfilled when you find and idea and go back to your room and write something about it either a blogpost, scientific article or any kind of article.

Yeah, today I learn something in which might intersect with your interest. It is about testing a software. As any professional software engineer like you, I and my team write test for our application to make sure that our application when shipped to production will have certain of feature delivered. Some people might be not diligent enough and they just give up write test, but they will face problem soon. However, if you already write test you might encounter another problem such as slow test execution and flaky test. As one of my favorite author said, once you fix a problem another problem will arise.

******

### A flaky test

{% include image.html img="flaky_tests.jpg" alt="flaky_tests" caption="Flaky tests" %}

It is a story of flaky test. I am just joining a new team and turned out we have a lot of technical debt. Test were written but it used external dependencies for execution which deployed in different environment from our test take place and to make it even worst the kind of test that depends on external dependencies are not integration test but also end-to-end test.

### The test suite is not trusted anymore

{% include image.html img="flaky-tests-flaky-tests-everywhere.jpg" alt="flaky-tests-flaky-tests-everywhere" caption="Flaky tests everywhere..." %}

At some point when the number of flaky test is too damn high you'll be in trouble. It is the time where the amount of time you invest in fixing and figuring out the test is less than the amount of time if you just retry the test. At this time you'll be brainwashed unconsciously that the one with problem is not your code but your test sute. You began to understimate your test and tolerate if your test is flaky. You began to inert when you should fixing the problem instead.

### The dillematic phase: which one broken my code or my test?

{% include image.html img="shitty_unit_tests.png" alt="shitty_unit_tests" caption="Shitty unit testing" %}

*Note what I should mention above is test in general, not only unit test*

The next phase after your test suite is not trusted anymore is the time where you're in confusion about which one broken, the code or the test. Since mainstream developer already test something in their local with their constraint including time, mental pressure, etc, the possibility of bug being shipped by developer is high, but the developer most likely to defend that their code is working and the test is wrong since it is flaky. The test suite is not good enough to test my code 😎.

Congratulations, you'll have incident soon if you ignore the fact that your test suite of your app is red and you need to check and not only check, but fix it! If not the incident is the thing you deserve. Remember as Mr. Charlie Munger said

> To get what you want, you have to deserve what you want. The world is not yet a crazy enough place to reward a whole bunch of undeserving people.

Yeah, if you not care much to your code and test you'll have shitty application as a result. Our time just nearly deploying a buggy application which handle money transfer and potentially create billions of rupiahs of financial loss when we try deploying stuff where our e2e test show red but we still want to deploy. Luckyly we have a thorough manual testing in staging so that the financial loss because of this bug never happen.

### Fix your test and flaky test immediately to rescue

I understand that having a perfect code and test are improbable if not impossible, you should do more about building feature not testing feature. Now my advice as virtual friend is to fix your test immediately when flaky test happen, because flaky test is like a cancer to our body. The effect is latent and it is growing undetectable until it is big enough.
