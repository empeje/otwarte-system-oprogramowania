---
title: Why nohup maybe useful for your Continuous Integration (CI)
image: ./operating-system.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

Yesterday I was helping an Open Source project called [Planet Learning](https://github.com/ole-vi/planet/) to fix their CI system. The lead of the project wants to have a better CI by using the latest beta feature of Travis CI called multi-stage build (not to be confused with Docker multi-stage build). By using multi-stage build we can do things we can setup several stage of build and in each stage we can do more than one things.

***

Here is how it looks like in GitLab (source [here](https://gitlab.com/gitlab-org/gitlab-runner/pipelines/17571416))

{% include image.html img="gitlab-multi-stage.png" alt="gitlab-multi-stage" caption="Multi-stage build in Gitlab" %}

And here how it looks like in Travis CI (source [here](https://travis-ci.org/ole-vi/planet/builds/354490883?utm_source=github_status&utm_medium=notification))

{% include image.html img="travis-multi-stage.png" alt="travis-multi-stage" caption="Multi-stage build in Travis" %}

However, we will not talk about multi-stage build in this post (maybe in another post). Back to the story, basically what I want to build is something like the following pipeline:

1. Docker-creation: create Docker image for testing (production ready build)
  * Docker image for the app itself
  * Docker image for the db-migration
2. Automated e2e testing: use the Docker image to test using `docker-compose`
3. Publish the docker tot the Docker registry

So basically we have 3 stage and we heavily using Docker in each stage.

Here is the snapshot of the stage number 2 (automated e2e) you can see the complete setup [here](https://github.com/ole-vi/planet/blob/master/.travis.yml), but it maybe changed in the future.

```yml
    - stage: automated-test
      <<: *_use_chrome
      <<: *_use_nodejs
      before_install:
        - source ./.travis/travis_utils.sh
        - prepare_ci
        - prepare_planet_test
        - prepare_db_init_test
        - render_compose_travis
        - docker-compose -f ./.travis/planet-travis.yml up -d
        - export CHROME_BIN=chromium-browser
        - export DISPLAY=:99.0
        - sh -e /etc/init.d/xvfb start
      install:
        - rm -rf ~/.nvm && git clone https://github.com/creationix/nvm.git ~/.nvm && (cd ~/.nvm
              && git checkout `git describe --abbrev=0 --tags`) && source ~/.nvm/nvm.sh
              && nvm install $TRAVIS_NODE_VERSION
      before_script:
        - travis_retry npm install
        - travis_retry npm install -g @angular/cli
        - travis_retry npm install -g karma
      script:
        - i=$(curl -X GET http://127.0.0.1:5984/_all_dbs | jq length); if [ $i -ne 13 ]; then exit 1; fi
        - ng e2e --environment test
```

Basically, in the above setup, we use run the docker-compose first in `before_install` then after all done in the `script` we have `ng e2e --environment test` which will run a [karma](https://karma-runner.github.io/2.0/index.html) test. And the biggest point is we run the `docker-compose` in detached mode with `-d` option. Later we realize that when the test fails we don't know what's happen because we can't see the log of the `docker-compose`. Some of the problem is something like [this](https://travis-ci.org/ole-vi/planet/jobs/354468107).

{% include image.html img="travis-red-docker-compose-1.png" alt="travis-red-docker-compose-1" caption="Multi-stage build in Travis red can't debug" %}

And you know what happens? I can't debug.

{% include image.html img="what-meme.jpeg" alt="what-meme" caption="What? What!" %}

So, I turn my brain and see for potential solution. And I just remember this post titled [nohup Execute Commands After You Exit From a Shell Prompt](https://www.cyberciti.biz/tips/nohup-execute-commands-after-you-exit-from-a-shell-prompt.html) I've read long time ago. And that aha moment coming.

So basically by putting `nohup` in the front and `&` in the end of your command basically you ask the shell to run your program in "no hangup" (source [here](https://achmadjournal.com/2006/09/28/apa-itu-nohup/)). You know, `HUP` is a signal in UNIX system then with `&` you make your command run in the background. Here is changes I mage in the `.travis.yml`.

```diff
    - stage: automated-test
      <<: *_use_chrome
      <<: *_use_nodejs
      before_install:
        - source ./.travis/travis_utils.sh
        - prepare_ci
        - prepare_planet_test
        - prepare_db_init_test
        - render_compose_travis
-        - docker-compose -f ./.travis/planet-travis.yml up -d
+        - nohup docker-compose -f ./.travis/planet-travis.yml up &
        - export CHROME_BIN=chromium-browser
        - export DISPLAY=:99.0
        - sh -e /etc/init.d/xvfb start
      install:
        - rm -rf ~/.nvm && git clone https://github.com/creationix/nvm.git ~/.nvm && (cd ~/.nvm
              && git checkout `git describe --abbrev=0 --tags`) && source ~/.nvm/nvm.sh
              && nvm install $TRAVIS_NODE_VERSION
      before_script:
        - travis_retry npm install
        - travis_retry npm install -g @angular/cli
        - travis_retry npm install -g karma
      script:
        - i=$(curl -X GET http://127.0.0.1:5984/_all_dbs | jq length); if [ $i -ne 13 ]; then exit 1; fi
        - ng e2e --environment test
```

I make the `docker-compose` to run in the attached mode by removing `-d` option and running it in `nohup` and background command. And here is the result. I can now able to debug the [problem](https://travis-ci.org/ole-vi/planet/jobs/354499831)

{% include image.html img="travis-red-docker-compose-2.png" alt="travis-red-docker-compose-2" caption="Multi-stage build in Travis red now I can debug" %}

Using this simple little trick save me time to think. Hope this blog post help you if you found my blog while doing a troubleshooting.