---
title: A shell script pattern
image: ./operating-system.jpg
categories: [teknologi]
tags: [spotlight]
hidden: false
author: empeje
---

For the last one year, I created and developed shell scripts in the quantity I can't imagine before, I still not completely understand shell and it scripting language, but becoming better and better understand about how to deal with it.

***

{% include image.html img="bash_logo.png" alt="bash_logo" caption="Bash Logo" %}

Here, I want to share a pattern I use when I develop a shell script to make it more manageable. It'll be a very short blog, so without further a do, lets get started.

#### First of all, don't forget to add shebang to your script

Long ago when I just started doing code professionally, like 1,5 year ago, when I create a script, whether it is just a simple Python script or simple Bash script, I just create a file with that extension and then run the script by doing something like `python my_script.py`. Later I realize that there is something called shebang.

In Unix or Unix-like environment shebang will define with what program your shell script will be executed. This is the typical shebang I use for bash script.

```bash
#!/usr/bin/env bash

here_some_scripts
```

By adding shebang, actually by adding shebang you can specify with what program your program will be executed, it can be as simple as `/usr/bin/bash` or if you want to make your script run in many different platform I suggest you to use `/usr/bin/env bash` because it will try to check your system where the bash is and then execute it. Pretty handy right?

#### Split your code into small atomic function

Again, long ago, I just simply create script in a sequential manner with small amount of functions, then I realize that my code was not that reusable. Then I after I learn about OOP and functional programming, I began to borrow the idea from that paradigm to make my script consist of atomic function. Here is the example of my script looks like.

```bash
#!/usr/bin/env bash

create_tunnel(){
    echo "it is a function"
}

get_options(){
    echo "it is another function"
}
```

This way I make my code reusable and I can even create a set of library and doing `source /path/to/script.sh` to import my collection of function.

#### Parameterized your script to reduce hardcoded value

Yes, sometimes you'll need some code to be hardcoded in some cases like when you do math formula. Something like `diameter = radius * 2` is better than `diameter = radius * DIAMETER_TO_RADIUS_CONVERSION_FACTOR`. Because, it just mor make sense and obvious to make it just `diameter = radius * 2`. However other than math formula, it is more like rule of thumb to avoid hard-coded value, except you make it obvious why you choose a magic number or a magic string.

Now imagine I create a script for creating a bunch of tunnel for different ports. Then it is easy for me to just hardcoded my host url to some value, but if I want to use the same script for future purpose without or with small modifications, now I began to parameterized my hardcoded values. Here is the example of my script.

```bash
#!/usr/bin/env bash

create_tunnel(){
    echo "it is a function"
}

get_options(){
    while getopts "h:p:u:" option; do
      case $option in
        h) HOST=${OPTARG};;
        p) PORT=${OPTARG};;
        u) USED_USER=${OPTARG};;
      esac
    done
}
```

This way if my script called `script.sh` I can run my script with the following parameter `script.sh -h 192.168.0.1 -p 2222 -u mpj`. Pretty handy right?

#### Create your main entry point to be main function

In couple of programming language other than bash script, it is common to have `main` function as an entry point. I borrow that idea and implement it in my program.

I usually make a main function entry point like this.

```bash
#!/usr/bin/env bash

create_tunnel(){
    echo "it is a function"
}

get_options(){
    while getopts "h:p:u:" option; do
      case $option in
        h) HOST=${OPTARG};;
        p) PORT=${OPTARG};;
        u) USED_USER=${OPTARG};;
      esac
    done
}

main(){
    get_options $@
    echo $HOST
    echo $PORT
    echo $USED_USER
    create_tunnel $HOST $PORT $USED_USER
}
```

However the script above execute nothing because nothing executed, it just a bunch of function declaration. So you need to call `main` in the end of your script. The end of your script would be something like

```bash
#!/usr/bin/env bash

create_tunnel(){
    if [ -z $1 ]; then
        echo WARNING: remote host not set, defaulting to 103.44.27.153
        REMOTE_HOST=103.44.27.153
    else
        REMOTE_HOST=$1
    fi

    if [ -z $2 ]; then
        echo WARNING: remote port not set, defaulting to 2222
        REMOTE_PORT=2222
    else
        REMOTE_PORT=$2
    fi

    if [ -z $3 ]; then
        echo WARNING: remote user not set, defaulting to root
        REMOTE_ROOT=root
    else
        REMOTE_ROOT=$3
    fi

    ssh -N -L 3000:127.0.0.1:3000 $REMOTE_ROOT@$REMOTE_HOST -p $REMOTE_PORT >/dev/null 2>&1 &
    ssh -N -L 3001:127.0.0.1:3001 $REMOTE_ROOT@$REMOTE_HOST -p $REMOTE_PORT >/dev/null 2>&1 &
    ssh -N -L 8080:127.0.0.1:8080 $REMOTE_ROOT@$REMOTE_HOST -p $REMOTE_PORT >/dev/null 2>&1 &
    ssh -N -L 8000:127.0.0.1:8000 $REMOTE_ROOT@$REMOTE_HOST -p $REMOTE_PORT >/dev/null 2>&1 &
    ssh -N -L 8001:127.0.0.1:8001 $REMOTE_ROOT@$REMOTE_HOST -p $REMOTE_PORT >/dev/null 2>&1 &
    ssh -N -L 8443:127.0.0.1:8443 $REMOTE_ROOT@$REMOTE_HOST -p $REMOTE_PORT >/dev/null 2>&1 &
}

get_options(){
    while getopts "h:p:u:" option; do
      case $option in
        h) HOST=${OPTARG};;
        p) PORT=${OPTARG};;
        u) USED_USER=${OPTARG};;
      esac
    done
}

main(){
    get_options $@
    echo $HOST
    echo $PORT
    echo $USED_USER
    create_tunnel $HOST $PORT $USED_USER
}

main $@
```

**Important**: I add `$@` to make my main function receive all the parameters given to the script and pass all of them to my main function.

Now you should have a better understanding about the pattern I use.

#### Last, don't forget to make your script executable

In order for shebang to be useful and you can call your script by typing the name of your script with only their name, you need to do this 

```bash
chmod +x /path/to/script.sh
```

Now you can call your script easily and hopefully you can make your next bash/shell script more maintainable, reusable and you'll be more happy to write a new one and read old one because you have a good pattern underlying scripts.

Happy scripting!

#### Inspiration 

* [Elegant locking of bash program](http://www.kfirlavi.com/blog/2012/11/06/elegant-locking-of-bash-program/)