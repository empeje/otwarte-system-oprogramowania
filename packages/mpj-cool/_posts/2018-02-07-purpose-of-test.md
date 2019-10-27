---
title: The purpose of test
image: ./software-testing.jpeg
categories: [teknologi]
tags: [spotlight]
hidden: false
author: empeje
---

This post is written for software engineer, developer, programmer who adopt automated test in their development workflow.

***

In software engineering, we use automated software testing whether in form of unit test, integration test, or end-to-end test. In ideal situation we want to have all of them. I work in software testing field especially in test infrastructure for the past 1 year and I just found the insight that I hope I can better understand earlier.

Yesterday, before this article was written, I was about to go home, it was at 6PM and I about to finish my work that day and a developer beg me and ask about why the automated end-to-end test is so long. I answered, it is the way it works. If there is test failed, it won't short circuited to stop the test than developer can fix it. It was because we want to know the whole test than after we know which part are failing then developer can find the root cause of the bug or failed tests. The test will timeout after 30 minutes.

The test will retry if the first test is failed, so in total there will be 2 check to make sure that the test failed is not because test infra problem or another factor that makes the stuff flaky. Finally, we open the test report together and the CI where test running is still running the second check. We found that there is weird error regarding the db changes. We roll new feature that needs DB changes. And we have many question, is the infrastructure can haven't pull the latest DB schema changes? No! We already merge new schema MR and the infra will automagically pull the latest db schema and migrate the schema at the time test initiated. We also check the log and we see that there is no anomaly, service dependencies, like db, redis, kafka, zookeeper, etc are running properly. Then we make a conjecture that the problem was in how we generate query with Hibernate JPA (we are using Java in this project).

I forgot to mention that it is the release preparation day where developer merge new features to development branch in the repo and exhaustive test is running to make sure it is not regress any feature. We expect to deploy it tomorrow (in the day article was written, it means today). At that time we debug, discuss and try some solution. In the end we can't solve the problem in timely manner if the deadline is tomorrow. We also realize that there is wrong technical decision in the feature implementation after the technical lead who are not reviewing the code try to see the merge request.

It is already 9PM, after all we decide to propose a postpone for the deployment to PO because of implementation bug and we can go home. However, we all still curious why the problem is not raised in the integration test (test before end-to-end testing). In the end we realize that we use simulated MySQL (in memory MySQL) for integration test and somehow it is slightly different with the real MySQL we use in end-to-end testing.

I learn something
* Unit test is not enough
* Unit test + code review is not enough
* Unit test + code review + integration test is not enough
* Unit test + code review + integration test + e2e test is not enough
* Unit test + code review + integration test + e2e test + canary deployment is not enough
* And the list still goes on.

In case of software development where we depends on so many moving parts, libraries, database, kv-store like redis, pub-sub system like kafka, etc we need a layered test or multiple test to make sure that what we change is working and not regress another feature or business logic already implemented. However, like many other engineering system **we need to simplify we won't our system is too complex so we can't achieve the practicality and we won't our system to simple so that it has so many bugs**.

The many test we run is there in order to make us as a decision maker regardless your position in the organization to make a judgement about your decision, deploy or not to deploy, review the system architecture, or any kind of decision.