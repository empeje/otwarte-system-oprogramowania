---
title: Solving Example Config Problem
image: ./software-engineering.jpg
categories: [teknologi]
tags: []
hidden: false
author: empeje
---

I've been contributed to some projects that has an example config that similar to these or any other variations

```bash
config.example.yml
config.yml.example
```

It is useful for new engineers when on-board to new team to start using the example configuration, but sometime no standard way for the engineers to use the example configs. People sometime just copy the config or if you like me I prefer to symlink the file. Here I want to share a little tricks to do example config copying or example config linking. Here are the examples.

Suppose I have these two configs

```
-rw-r--r--   1 empeje  staff     0 Sep  8 23:00 config.example
-rw-r--r--   1 empeje  staff     0 Sep  8 23:00 config2.example
```

I either want to have those configs to be something like this by copying it

```
-rw-r--r--  1 empeje  staff  0 Sep  8 23:00 config.example
-rw-r--r--  1 empeje  staff  0 Sep  8 23:00 config2.example
-rw-r--r--  1 empeje  staff  0 Sep  8 23:09 config
-rw-r--r--  1 empeje  staff  0 Sep  8 23:09 config2
```

or you want to symlink-ing the config

```
-rw-r--r--  1 empeje  staff   0 Sep  8 23:00 config.example
-rw-r--r--  1 empeje  staff   0 Sep  8 23:00 config2.example
lrwxr-xr-x  1 empeje  staff  14 Sep  8 23:10 config -> config.example
lrwxr-xr-x  1 empeje  staff  15 Sep  8 23:10 config2 -> config2.example
```

I prefer the latter, because usually we add the `*.example*` file to the git repository but the one that being used in development without the `.example` is not added and included in `.gitignore`. Here is the simple script to do just that.

* The copy-way

```bash
ls $CONFIG_LOCATION | grep .example | while read -r line; do cd $CONFIG_LOCATION; cp $line $(echo "$line" | sed s/.example//g); cd -; done;
```

* The symlink-way

```bash
ls $CONFIG_LOCATION | grep .example | while read -r line; do cd $CONFIG_LOCATION; ln -s $line $(echo "$line" | sed s/.example//g); cd -; done;
```

* How to delete it

```bash
ls $CONFIG_LOCATION | grep .example | while read -r line; do cd $CONFIG_LOCATION; rm $(echo "$line" | sed s/.example//g); cd -; done;
```

And here is some example in fish-shell, because I'm a fish-shell user.

```bash
# in my case the config location is in the current folder
# copy-way
env CONFIG_LOCATION=(pwd) bash -c 'ls $CONFIG_LOCATION | grep .example | while read -r line; do cd $CONFIG_LOCATION; ln -s $line $(echo "$line" | sed s/.example//g); cd -; done;'

# symlink-way
env CONFIG_LOCATION=(pwd) bash -c 'ls $CONFIG_LOCATION | grep .example | while read -r line; do cd $CONFIG_LOCATION; cp $line $(echo "$line" | sed s/.example//g); cd -; done;'

#delete it
env CONFIG_LOCATION=(pwd) bash -c 'ls $CONFIG_LOCATION | grep .example | while read -r line; do cd $CONFIG_LOCATION; rm $(echo "$line" | sed s/.example//g); cd -; done;'
```

And the next step is to embed this script or the equivalent in your tooling, either Gradle for Java or Rake for Ruby, or pick your own tooling.