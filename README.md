# LetecodeJS
A helper tool to practice Leetcode challenges with Javascript.

If you don't want to mess around with Leetcode, you'd better not use this tool.

Otherwise, keep reading for more reasons why you'd better not use this tool.

# Installation

## NodeJS and npm

First off, you must have `NodeJS` and `npm` installed in your environment. It's right [here](https://nodejs.org/en/download/).

If you still can't figure out how to install those tools, you'd better not use this tool.

## Visual Studio Code

If you don't use [VSCode](https://code.visualstudio.com/), we'd better not be friend, and you'd better not use this tool.

## Initialization

You would need to install `nodemon` to enjoy live coding experience while solving your problem. Because I know you are just too lazy to run the sample testcases by yourself.

Also, because you're freaking slothful, I got that installation covered for you. Just open any terminal, `cd` to LetecodeJS directory, and run (be sure to turn off you anti-virus app for no reason):

```bash
npm i
```

Also, if you don't know how to open a terminal or don't even know what the heck is that, you'd better not use this tool.

# Set up your new problem

## Folder structure

All of your problems solution would be stored in a folder named **problems**. Each problem consists of 3 files:

- **configs.js**: a bunch of options to manipulate the behavior of the tool, you can even rewrite how to judge a testcase be rewriting the function **customCheckEqual** here.
- **solution.js**: your solution function. When starting a new problem, you can grab the whole Leetcode's template and put to this file, just remember to export default the function.
- **testcases.js**: sample testcases or custom testcases. Each testcase has 2 fields: **1) `input`**, which has to be an array, contains arguments to pass in your solution function; **2) `output`**: the expected output for the given input, this value is gonna be used to test your IQ.

LetecodeJS has to be set with a problem in order to run properly. The information about the current problem is stored in a folder named **current**. But you don't wanna care about anything in this folder, as it's a dirty tricky piece of code.

You don't wanna care about anything in **core** folder as well.

Just - believe - me.

But if you don't, well, you'd better not use this tool.

## Set up a problem

Run:

```bash
npm run problem <problem-id>
```

The accepted `<problem-id>` should only contain alphanumeric, `-` and `_` characters.

This command would create a new problem template with all necessary files to get you ready for tackling a new Leetcode problem. If the problem ID has already existed, no worries, this would **not** override your old solution. Therefore, you can use this command to conveniently switch problems.

Just - believe - me.

This command would also open a VSCode tab for your new problem's **solution.js**, which is handy, isn't it? The only requirement, however, is to have `code` as the command to call your VSCode from terminal. Normally, VSCode would ask you to set that as **environment variables** during setting up, but you can still do that manually.

If you still can't set that command, well, you know, I mean, come on! Don't give up! Ask your mom!

If she wouldn't reply, though, you'd better not use this tool.

# Solve the challenge!

After setting up your problem, run this and keep your terminal alive:

```bash
npm start
```

The test result would be updated automatically as soon as you save any changes to your code. That's the power of `nodemon`.

Good luck on cracking those problems!

If you can't solve any problems even with the help from this tool, you'd better get home and cry.

# Side notes

This has nothing to do with the tool, so please don't go ahead, here's the link to [Leetcode](https://leetcode.com/problemset/all/), please get there and have fun with the kids.

Seriously, STOP READING THIS, or you'd better not use this tool.

Anyway, Cháu nhớ chị ứ ư 🥺🥺🥺