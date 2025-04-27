---
title: Refactor Code & Cleaning Up Toilet
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

Today, before I take my second shower in the evening, I take time to cleaning up my toilet and bathroom, as an early-career professional and a single person living alone in capital city here in Jakarta, cleaning up toilet is not a big deal for me. You might think that I better spent my time for doing code or learn something new, but you might be don't know that I love cleaning up the toilet, because every time I do it, I learn something new, also this time. I want to talk about the similarity between refactor code and cleaning up toilet.

***

### You do stuff in your codebase daily

I know, you have a codebase where you develop new feature weekly or even daily to meet your business need. I know sometimes you take the risk to take a technical debt, I know at some point your code become messier and messier. It is natural, something that you use daily has to be changed and entropy is usually increasing.

{% include image.html img="refactor.jpg" alt="refactor" caption="Refactor later" %}

You can think about a toilet, you use it every day, you try your best to flush the toilet everything looks good at the first time. You go back tomorrow and try your best to flush and clean up the toilet. You go back again and again and again, say after 1 months you didn't notice that your toilet is not as white as before, maybe it is somewhat yellowish. Why didn't you notice? One reason, because you the changes is not significant if you look it on a daily basis. It also happens in your code, something you didn't notice that you increase your entropy to some degree each day.

### Messy code becomes a new normal

{% include image.html img="technical_debt.jpg" alt="technical_debt" caption="Technical debt" %}

Tight deadline, business needs the feature need to be deployed soon, and you take another technical debt without paying your previous debt, and now your "hacky" code is living in production. New people coming to help, can't help much because there is hack here and there, business people expect that new people mean new feature will be done faster. But the reality is the opposite, the feature you develop is somewhat slower because you also need to helps your new peer.

{% include image.html img="technical_debt_2.jpg" alt="technical_debt_2" caption="No to technical debt!" %}

Then finally your peer know your code and although he/she has something in mind to improve the code, your company just can't afford to refactor because the time is better to spend in feature development, and yet you create another hacky feature and increase your codebase entropy.

The same with toilet, you haven't had a chance to clean up your toilet, now the yellowish toilet is the new normal, you think you'll clean up that sometime after your work schedule is not as busy as now and several days later you forget that 1 month ago your toilet was white and super clean.

### Finally you have time to refactor

{% include image.html img="fry-not-sure.jpg" alt="fry-not-sure" caption="Fry not sure" %}

Now the deadline not as tight as before, you have time to do some retrospective about what feature you already develop and now the next challenge is to scale your application. No choice, you need to pay your debt. You can do it alone or you paid someone to do it. I heard some company hire consultant to refactor one file of codebase, insane!

After deep dive in the refactor process, you laugh, why you do stupid hacky way to do something in the first place, why not doing it right from the very first time? You also feel great about it after all the cleanup, your productivity becomes increasing (again).

{% include image.html img="clean-bathroom.jpg" alt="clean-bathroom" caption="Clean bathroom" %}

Similar to the toilet, now you had a chance to clean up the toilet either by yourself or you pay someone to do it. Now, the toilet is clean and you feel good, even you just realize that your toilet was shiny white 1 month ago.

### Hopefully you do refactoring frequently in monthly or weekly basis

Now you realized that increase in entropy is a nature of development unless you force to keep it constant. Same with the toilet, something that used is expected to degrade, but you always have an option to clean up the stuff after you use it. Refactor code frequently (not to say every time) helps you to keep the entropy of the project under control and manageable, you don't want to have something like global warming in your code, right?

Vale!
