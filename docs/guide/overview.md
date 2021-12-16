---
sidebarDepth: 3
---

# Stack Overview

Shortlist of custom stack features.

## [Components](/in-depth/components)

### [SntButton](/in-depth/components#sntbutton)

Wrapper for handling `button`, `router link`, and `anchor` elements.

### [SntIcon](/in-depth/components#snticon)

Component for handling svg icons.

### [SntInput](/in-depth/components#sntinput)

A versatile component with integrated validation. Supports most input types.
::: tip
Always prefer using `snt-input` instead of the default `input` element.
:::

### [SntModal & SntOverlay](/in-depth/components#sntmodal-sntoverlay)

Components for managing modals and full screen overlays.

### [SntToast](/in-depth/components#snttoast)

Component for handling toast and notification messages.

---

## [Plugins](/in-depth/plugins)

### [i18n: `$t`](/in-depth/plugins#i18n)

Internationalization plugin.\
Provides an accessible interface to create an application that supports multiple languages.

For full documentation visit https://kazupon.github.io/vue-i18n/introduction.html.

### [breakpoint: `$bp`](/in-depth/plugins#breakpoint)

Plugin for managing screen breakpoints in javascript.\
Works in tandem with your css media declarations.

---

## [Services](/in-depth/services)

Service layer is a place through which all outside communication flows.\
It provides a "dumb" api interface which is used by other parts of application for calling external providers.

Api methods and scripts that connect to external providers are placed here.

Read more - [Creating API Endpoint](/in-depth/services#creating-api-endpoint), [Creating Service Endpoint](/in-depth/services#creating-service-endpoint)

---

## [Store (vuex)](/in-depth/store)

A system for managing global application state. Separated into multiple self-contained modules, it has proven to be a good solution for managing medium to large scale applications.

Most of the business logic should live here.

For full documentation visit https://vuex.vuejs.org/.

---

## [Styles (SCSS)](/in-depth/styles)

A small stylesheet ecosystem that handles `containers`, `breakpoints`, `colors`, `animations`, `tables`, `typography`, and a few other things.

---

## Utils

A collection of useful utilities for tackling common problems.

Notable mentions:

- `crud.js` - factory function for scaffolding crud calls (available for both service and store layer)
- `datetime.js` - for parsing dates
- `hashPassword.js` - for hashing passwords

::: tip
Reference `./src/utils` to check out other utility functions. Feel free to add more functions if you need them.
:::

---

## Project structure

| root  | path           | Description                                            |
| ----- | -------------- | ------------------------------------------------------ |
| src/  | assets/        | Static project assets (i.e. images)                    |
|       | components/    | Vue components (used within views or other components) |
|       | config/        | Project plugins, startup scripts, and translations     |
|       | router/        | Vue router                                             |
|       | services/      | Service layer                                          |
|       | store/         | Vuex store with modules                                |
|       | styles/        | Project styles                                         |
|       | utils/         | Javascript utility functions                           |
|       | views/         | Vue components (usually mapped 1:1 with routes)        |
|       | App.vue        | Entrypoint vue component                               |
|       | main.js        | Application entrypoint                                 |
|       | main.config.js | Configuration file for main.js                         |
| docs/ | ---            | Documentation pages                                    |
| ...   | ---            | Project config files, env files, readme, docker etc... |
