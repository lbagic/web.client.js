---
sidebarDepth: 3
---

# Stack Overview

Shortlist of custom stack features.

## Components

### SntButton

Wrapper for handling `button`, `router link`, and `anchor` elements.

### SntIcon

Component for handling svg icons.

### SntInput

A versatile component with integrated validation. Supports most input types.
::: tip
Always prefer using `snt-input` instead of the default `input` element.
:::

### SntModal & SntOverlay

Components for managing modals and full screen overlays.

### SntToast

Component for handling toast and notification messages.

---

## Plugins

### i18n: `$t`

Internationalization plugin.
::: warning
If project is using multiple languages, never hardcode application strings - use them through i18n.
:::

### sntBreakpoints: `$breakpoint`

Plugin for managing screen breakpoints in javascript.

---

## Services

Application layer that handles calling external services (all outside communication goes through this layer).

Api and external services are placed here.

---

## Store (vuex)

A system for managing global application state.

Most of the business logic lives here.

---

## Utils

A collection of useful utilities for tackling common problems.

Notable mentions:

- `crud.js` - factory function for scaffolding crud calls (available for both service and store layer)
- `datetime.js` - for parsing dates
- `hashPassword.js` - for hashing passwords

---

## Styles (SCSS)

A small stylesheet ecosystem that handles `containers`, `breakpoints`, `colors`, `animations`, `tables`, `typography`, and a few other things.

---

## Project structure

| root  | ---            | Description                                            |
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
