---
title: Fallback environment variable Bash
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

Sometime I got a use case where I require some configuration in form of environment variables for my Docker image. And in the past I often re-invent how I create the script to fallback to some value if the environment was not set. Now I want to share about how I did it. It'll be useful for me in the future for you.

```bash
#!/usr/bin/env bash

fallback_env() {
    local TARGET_VARIABLE="$1"
    local FALLBACK_VALUE="$2"
    local CURRENT_VALUE=$(env | grep "^${TARGET_VARIABLE}=" | awk -F '=' '{print $2}')

    if [[ -z "$CURRENT_VALUE" ]]; then
        build_message "${TARGET_VARIABLE} is not set and will defaulting to ${FALLBACK_VALUE}"
        eval "export ${TARGET_VARIABLE}=${FALLBACK_VALUE}"
    fi
}
```

So basically it is a function that you can use in your Bash script so that when you use it it'll check if the environment is already set, if not it'll set it to the fallback value.

There is a gist for it which you can open in [here][GIST].

[GIST]: https://gist.github.com/empeje/257128cb16ffa17211cde7d6c7bd8a65 
