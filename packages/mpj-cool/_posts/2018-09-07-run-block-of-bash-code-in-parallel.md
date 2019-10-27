---
title: Run block of Bash code in parallel
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

Recently, I have a use case to build multi-language packages of Angular app which need to be done in compile time. I need a case where I need to compile the app in parallel since the number of language is increasing month by month. Although I still don't have a good solution for this problem, I have a workaround for the number of language I have.

These are the codes I use

```diff
#!/usr/bin/env sh

build_multi(){
-  "$(npm bin)"/ng build --prod --base-href /eng/ --output-path=dist/eng
-  "$(npm bin)"/ng build --prod --base-href /ara/ --output-path=dist/ara --aot --i18n-file=src/i18n/messages.ara.xlf --i18n-locale=ar --i18n-format=xlf
-  "$(npm bin)"/ng build --prod --base-href /spa/ --output-path=dist/spa --aot --i18n-file=src/i18n/messages.spa.xlf --i18n-locale=es --i18n-format=xlf
-  "$(npm bin)"/ng build --prod --base-href /fra/ --output-path=dist/fra --aot --i18n-file=src/i18n/messages.fra.xlf --i18n-locale=fr --i18n-format=xlf
-  "$(npm bin)"/ng build --prod --base-href /nep/ --output-path=dist/nep --aot --i18n-file=src/i18n/messages.nep.xlf --i18n-locale=ne --i18n-format=xlf
-  "$(npm bin)"/ng build --prod --base-href /som/ --output-path=dist/som --aot --i18n-file=src/i18n/messages.som.xlf --i18n-locale=so --i18n-format=xlf
+  {
+    "$(npm bin)"/ng build --prod --base-href /eng/ --output-path=dist/eng
+    "$(npm bin)"/ng build --prod --base-href /ara/ --output-path=dist/ara --aot --i18n-file=src/i18n/messages.ara.xlf --i18n-locale=ar --i18n-format=xlf
+    "$(npm bin)"/ng build --prod --base-href /spa/ --output-path=dist/spa --aot --i18n-file=src/i18n/messages.spa.xlf --i18n-locale=es --i18n-format=xlf
+  } &
+  {
+    "$(npm bin)"/ng build --prod --base-href /fra/ --output-path=dist/fra --aot --i18n-file=src/i18n/messages.fra.xlf --i18n-locale=fr --i18n-format=xlf
+    "$(npm bin)"/ng build --prod --base-href /nep/ --output-path=dist/nep --aot --i18n-file=src/i18n/messages.nep.xlf --i18n-locale=ne --i18n-format=xlf
+    "$(npm bin)"/ng build --prod --base-href /som/ --output-path=dist/som --aot --i18n-file=src/i18n/messages.som.xlf --i18n-locale=so --i18n-format=xlf
+  } &
+  wait
}
```

Basically, we wrap the sequential execution in `{}` block and make it run in the background with `&`. Then we initiate several blocks which run in the background and each block will building three languages in parallel. Then we wait until all the background processes are finished.

While this is only a suboptimal solution, this save 4 minutes of build time. Given we are using free Open Source Travis CI package to build the app and our code. Maybe you can use this technique to your own use case.