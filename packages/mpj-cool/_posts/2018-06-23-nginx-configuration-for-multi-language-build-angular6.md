---
title: I18N Angular6 NGINX Configuration
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---


The story started from an open source project I support called [planet][PLANET] where we try to build a decentralize, internet-supported learning managemenet system optimized to run on resource-constrained device like a small Raspberry Pi machine.

Our user target is very niche where we develop learning community in some underserved countries (not necessarily countries but some regions in some countries). Where I believe that technology are proliferate more and more, people are getting wealthier, there is some part of the world that less fortunate. In that part of the world we try to help them to build education community with the technology required. One of the challenge we have is some time we need translate our application called [planet][PLANET] to both some exotic languages and widely popular languages.

{% include image.html img="planet_nepal.png" alt="planet_nepal" caption="Planet Nepal translation using Angular i18n" %}

---

### Brief About Planet

[Planet][PLANET] is a web app where it is entirely running on the browser and interactions to back-end service are done by API call. It backed by CouchDB as a back-end and served by NGINX as both reverse proxy and web server. It is written in Angular6 framework. Angular6 framework when build will generate an artifact containing JavaScript, HTML and CSS which will be served by any webserver, in our case it was NGINX (we didn't want to invent webserver ourself).

#### Our previous Dockerfile and NGINX configuration

Here is an example of our Dockerfile:

```Dockerfile
FROM node:8.11.2-alpine as builder
LABEL maintainer="sahil@ole.org,mappuji@ole.org"

ARG LANGUAGE_MODE="single"
ENV I18N ${LANGUAGE_MODE}

WORKDIR /ng-app

COPY package.json ./
COPY docker/planet/scripts/ ./
COPY . .

RUN npm i --silent
RUN ./compile_planet.sh

#####

FROM nginx:1.13.3-alpine
COPY docker/planet/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
COPY docker/planet/scripts/docker-entrypoint.sh ./

CMD ./docker-entrypoint.sh
```

The Dockerfile above is a multistage build Docker where the most important part is the second part where I copy the artifact to the NGINX Docker image. And the NGINX configuration for a single language setup is at minimum something like this:

```nginx
server {

  listen 80;

  sendfile on;

  default_type application/octet-stream;


  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   1100;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;


  root /usr/share/nginx/html;


  location / {
    try_files $uri $uri/ /index.html =404;
  }
}
```

### Brief about Angular i18n

In Angular6 the most common approach to internationalization is producing multiple package with AOT (Ahead-of-Time) compilation. More about this [here][ANGULARI18N]. Basically by doing this compilation, Angular create a small and optimized compiled JavaScript (it was from TypeScript), HTML and CSS. The problem is how we serve the artifact in NGINX if we have multiple languages?

#### How we build the Angular App

One of the important step when building/compiling i18n version of the Angular App is the internationalization files, format and locale, base `href`, and artifact location. Here is how I did it on [planet][PLANET]:

```shell
ng build --prod --base-href /eng/ --output-path=dist/eng
ng build --prod --base-href /ara/ --output-path=dist/ara --aot --i18n-file=src/i18n/messages.ara.xlf --i18n-locale=ar --i18n-format=xlf
ng build --prod --base-href /spa/ --output-path=dist/spa --aot --i18n-file=src/i18n/messages.spa.xlf --i18n-locale=es --i18n-format=xlf
ng build --prod --base-href /fra/ --output-path=dist/fra --aot --i18n-file=src/i18n/messages.fra.xlf --i18n-locale=fr --i18n-format=xlf
ng build --prod --base-href /nep/ --output-path=dist/nep --aot --i18n-file=src/i18n/messages.nep.xlf --i18n-locale=ne --i18n-format=xlf
```

We are using 3 digits language code in the user level as we need to translate our app to some less known language, but in code level it still use locale. Here I specified the base `href` with `--base-href` options and the output path with `--output-path` to make us easy to use it in the Dockerfile.

#### Our new Dockerfile and NGINX configuration

After we have our artifacts built, here is the Dockerfile and NGINX configuration looks like.

For the Dockerfile, there is no different since we have the build command (the `ng build`) on a script called `compile_planet.sh`.

```Dockerfile
FROM node:8.11.2-alpine as builder
LABEL maintainer="sahil@ole.org,mappuji@ole.org"

ARG LANGUAGE_MODE="single"
ENV I18N ${LANGUAGE_MODE}

WORKDIR /ng-app

COPY package.json ./
COPY docker/planet/scripts/ ./
COPY . .

RUN npm i --silent
RUN ./compile_planet.sh

#####

FROM nginx:1.13.3-alpine
COPY docker/planet/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
COPY docker/planet/scripts/docker-entrypoint.sh ./

CMD ./docker-entrypoint.sh
```

The different will be on the NGINX where it is becoming something like this:

```nginx
server {

  listen 80;

  sendfile on;

  default_type application/octet-stream;


  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   1100;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;

  root /usr/share/nginx/html;

  location /eng {
    autoindex on;
    try_files $uri$args $uri$args/ /eng/index.html =404;
  }

  location /ara {
    autoindex on;
    try_files $uri$args $uri$args/ /ara/index.html =404;
  }

  location /spa {
    autoindex on;
    try_files $uri$args $uri$args/ /spa/index.html =404;
  }

  location /nep {
    autoindex on;
    try_files $uri$args $uri$args/ /nep/index.html =404;
  }

  location /fra {
    autoindex on;
    try_files $uri$args $uri$args/ /fra/index.html =404;
  }

  location / {
    try_files $uri$args /eng/index.html =404;
  }

}
```

The most important part is we turn on `autoindex` for each languages to produce directory listing for each languages. For the `try_files` for specific languages are very similar with the original version. The other differences are in the root `/` location block in the `try_files` directive we only add `$uri$args` without `$uri$args/` because we don't want to make the other language route as part of the default language directory. We also turn off the `autoindex` in the root location block.

### Conclusions

Finally we have working Angular app with i18n which served by NGINX. For more about [planet][PLANET] checkout these URLs:

* Test our app here in [earth.ole.org][EARTH]. It still on development so if there is a bug please feel free to open on the issue link below.
* Contribute and report bugs [here][ISSUES].

### References

* [nyxz's answer on Stackoverflow][NYXZ]
* [Angular i18n][ANGULARI18N]

[PLANET]: https://github.com/open-learning-exchange/planet
[ANGULARI18N]: https://angular.io/guide/i18n
[NYXZ]: https://stackoverflow.com/questions/49889093/nginx-configuration-for-angular-i18n-application/50877984#50877984
[EARTH]: https://earth.ole.org/eng/login
[ISSUES]: https://github.com/open-learning-exchange/planet/issues