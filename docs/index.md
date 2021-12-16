---
sidebarDepth: 3
---

# What is Sintezis Web Stack?

Sintezis Web Stack is a frontend framework solution built with Vue.js 3.

The actual framework is a barebones Vue.js installation with predefined configuration and a few custom solutions that solve some of the most common web development problems.
::: tip
Skim through the docs so you get the general feel of what this framework provides. You can check out the full list of custom additions on the [stack overview page](/guide/overview).
:::

This documentation does not cover Vue.js basics, they have a good [documentation site](https://v3.vuejs.org/guide/introduction.html) which you can **and should** reference whenever you have vue-related questions.

Besides the documentation site, Vue has an active community of developers who are willing to answer any questions related to Vue on the [official discord channel](https://discord.gg/vue).

## Starting a Project

Follow these steps to create a new project from Sintezis Web Stack.

```bash
git clone ssh://git@gitlab.sintezis.co:8022/sintezis/stacks/web.stack.js.git
cd web.stack.js
git remote set-url origin git://new.url.here
```

### Running The Application

```bash
npm install
npm run serve
```

Application is now available at http://localhost:8080.\
Documentation is served on http://localhost:8081.

## Mandatory Configuration

The following topics include steps for initial project configuration.

### Setting up VSCode

**Mandatory VSCode extensions:**\
[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - enforces coding styles\
[Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - enforces coding styles\
[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - Vue.js tooling

**The following extensions & settings are optional but help with productivity:**

[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) - renaming one html tag will auto-rename the other\
[advanced-new-file](https://marketplace.visualstudio.com/items?itemName=patbenatar.advanced-new-file) - ctrl+alt+n to create new file

Add the following to your VSCode settings:

```json
"editor.bracketPairColorization.enabled": true,
"editor.guides.bracketPairs": "active",
```

::: tip
Pressing `ctrl + ,` opens VSCode settings.
:::

### Setting up Husky

[Husky](https://typicode.github.io/husky/#/) improves your commits and more 🐶 woof!\
We use Husky to execute `npm run lint` as a pre-commit hook which enables painless enforcing of coding styles and standards.

Husky **runs out of the box** without additional config **unless a monorepo structure is used**.
::: warning
If this project is part of a monorepo make sure to modify `.husky/pre-commit` by including the project path (example below).
:::

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

cd ./path/to/project && npx lint-staged # <-- edit ./path/to/project

```

### Creating .env File

Example .env file is located in project root `.env.example`.\
To set it up, run the following command.

```bash
cp .env.example .env
```

Adjust the .env file according to your project needs.

Feel free to remove any unecessary variables from .env file, but also **remember to update .env.example** as you add more variables to your .env file.
::: danger
Never set values in .env.example. It may lead to leaks and unauthorized uses of private keys.
:::

## A Note To All WSL2 Users

If you are developing on a windows machine and running your project in WSL, you may encounter a bug where visiting http://localhost:8080 does not load your site.

The issue happens when WSL does not properly forward its ports. Download and run [this script](https://gist.github.com/lbzg/db64bf9f34f3cd8863e9911fd581417a) in such cases.
