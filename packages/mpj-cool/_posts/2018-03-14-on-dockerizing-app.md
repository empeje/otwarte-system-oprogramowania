---
title: On Dockerizing Application
image: ./docker.png
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

Recently, container technology like Docker, rkt, etc gained so much attraction as it simplified the way we deploy, manage and operate software especially in web space. But in the transition things are easy to go wrong since we have previous assumption and experience (bias) when it comes to deploying software.

***

Using container technology like docker or VM-based provisioning technology like Vagrant are considered practicing [infrastructure as code](https://en.wikipedia.org/wiki/Infrastructure_as_Code) where our infrastructure is defined in a code (a file that describe how our infrastructure looks like). Now, lets take an example of Docker. Same as Vagrant or rkt, in Docker when you want to create an image of any service or application you can describe it in a file. In Docker case it is Dockerfile. In that file you describe what your application container looks like. The example of Dockerfile is something looks like this (taken from [treehouses/moodole](https://github.com/treehouses/moodole/blob/master/3.4/x86/Dockerfile)):

```dockerfile
FROM debian:stretch-slim

ENV version '3.4.0'

EXPOSE 80

ADD ./start.sh /etc/nginx/
COPY ./moodle /etc/nginx/sites-available/moodle

RUN apt-get update && \
	apt-get -y install \
	nginx php-fpm php-common \
	php-mbstring php-xmlrpc \
	php-soap php-gd php-xml \
	php-intl php-pgsql php-mysqlnd php-cli \
	php-mcrypt php-ldap php-zip php-curl \
	wget && \
	apt-get -y autoclean && \
	apt-get -y autoremove && \
	rm -rf /var/lib/apt/lists/*

RUN mkdir -p /var/www/html && \
    wget -O /var/www/moodle-${version}.tar.gz \
		https://github.com/moodle/moodle/archive/v${version}.tar.gz && \
	rm -rf /var/www/html/ && \
	cd /var/www && tar xvf moodle-${version}.tar.gz && \
	mv /var/www/moodle-${version} /var/www/html && \
	rm  moodle-${version}.tar.gz && \
	chown -R www-data:www-data /var/www/html && \
	chmod +x /etc/nginx/start.sh && \
	mkdir -p /var/www/moodledata && chmod 777 /var/www/moodledata && \
	chown -R www-data:www-data /var/www/moodledata && \
	ln -s /etc/nginx/sites-available/moodle /etc/nginx/sites-enabled/ && \
	unlink /etc/nginx/sites-enabled/default

ADD ./config.php /var/www/html/

CMD ["/etc/nginx/start.sh"]
```

It describe what is the base image of our app, what we should have inside the container and the command when we start the Docker container.

So, why I started the discussion with explanation about Dockerfile? Imagine you are a system engineer, or DevOps engineer, or system reliability engineer, you name it and you are asked by your boss perhaps a VP Engineering or CTO to Dockerize your app. Then you create a Dockerfile, build the Docker image based on the file and doing some test until you satisfied with the Dockerfile and the developer of the app confirmed that what you configure is correct. Then you create a pull request which contains your Dockerfile and some scripts that may related to your Dockerfile, and you push the created Docker image to the image registry and then at some point you want to deploy your Docker Image using orchestration technology like Kubernetes or Docker Swarm to make your [infrastructure immutable](https://techbeacon.com/immutable-infrastructure-your-systems-can-rise-dead). Cool! Well done! You can relax now. 

However one week later your developer ask you to deploy new update of the app. Then you repeat your step except the first step which is creation the Dockerfile. Now you build the image, push to the registry and then change the image tag in your orchestration tool and then doing something like rolling restart. Awesome! You can relax again.

Next week the boss of the developer (or maybe also your boss) ask the developer to increase the deployment rate not once a week, but something in the realm of 2-3 times a week. Okay this is the first week we have more frequent build. Every 2 days you help the developer to build, push and update tag of the Docker image in the orchestration tool to the latest changes. Okay this is still acceptable.

After one week of rapid deployment, your team achieve 2 times a week deployment rate since the last time they want to deploy you're busy with an incident. Hopefully next week there is no incident because if next week you have more incident maybe your dev team can't deploy the app! Imagine!

**Lesson Learned**: When you are in the migration from old style deployment lifecycle to using container technology like Docker, you should consider the container image as the new kind of artifact like the good old days when you have tar archive artifact. Generally, you should integrate the creation of the artifact in you continuous integration / continuous delivery (CI/CD) workflow and you can get the most benefit from this technology. Dockerfile is nothing, but a description of image you want to create and will do nothing if you're not building it every time the new changes comes.

So, when you go back to work after read this article, it is the time for you to update your CI, either it is on GitLab CI, Travis, or anything you need to make the Docker image creation as part of your (CI/CD) workflow so that it will be useful.

True Story:

>My employer was hiring a consultant to Dockerize most of my employer services mostly for testing purpose and later for production. Three months after they finish Dockerized all the app I joined the company and I assigned to continue the project of Dockerizing all the app because the old Dockerfile is not maintained (at the time I join the Dockerfile is not relevant and not integrated to the CI). Then I started to Dockerizing all the app (mostly update), but now I make it continuously create a Docker Image every time it there is a commit in `master` and `development` branch (we use a variant of [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html)). At the first time I take over the project I think that how much money my employer wasted in such kind of consulting if the result is nothing, but burden to the next developer. Now, every time I create a Dockerfile, I will try to create the CI pipeline to create and push it to the registry so the machine will do the repetitive job for me. Another advantages is when you've Dockerfile in your repository and automatically created by CI, whenever you want to create a change to your Dockerfile you can easily create a PR for that and a new Docker image will be created for you if the building step success, if not you can fix it until it building again.