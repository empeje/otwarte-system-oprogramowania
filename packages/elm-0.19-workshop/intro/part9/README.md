# Part 8

Once again, we'll be building `src/Main.elm`, but editing a different file.

To build everything, `cd` into the `part8/` directory and run8

```shell
elm make src/Main.elm --output ../server/public/elm.js
```

Then open `http://localhost:3000` in your browser.

## Exercise

Look at `intro/server/public/index.html` to see how the localforage ports are
hooked up on the JavaScript side.

The exercise is to add the corresponding ports to `src/Session.elm`. See the
TODOs in that file for more information!

When you're done, you should once again be able to sign up for a new account,
log in, etc.
