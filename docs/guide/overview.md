---
sidebarDepth: 3
---

# Stack Overview

Shortlist of custom stack features.

## Components

### `<snt-button>`

Wrapper for handling `<button>`, `<router-link>`, and `<a>` elements.

### `<snt-icon>`

Component for handling svg icons.

### `<snt-input>`

A versatile component with integrated validation. Supports most input types.
::: tip
Always prefer using `<snt-input>` instead of the default `<input>` element.
:::

### `<snt-modal>` & `<snt-overlay>`

Components for managing modals and full screen overlays.

### `<snt-toast>`

Component for handling toast and notification messages.

## Plugins

### i18n: `$t`

Internationalization plugin.
::: warning
If project is using multiple languages, never hardcode application strings - use them through i18n.
:::

### sntBreakpoints: `$breakpoint`

Plugin for managing screen breakpoints in javascript.

## Services

Application layer that handles calling external services (all outside communication goes through this layer).

Api and external services are placed here.

## Store (vuex)

A system for managing global application state.

Most of the business logic lives here.

## Utils

A collection of useful utilities for tackling common problems.

Notable mentions:

- `crud.js` - factory function for scaffolding crud calls (available for both service and store layer)
- `datetime.js` - for parsing dates
- `hashPassword.js` - for hashing passwords

## Styles (SCSS)

A small stylesheet ecosystem that handles `containers`, `breakpoints`, `colors`, `animations`, `tables`, `typography`, and a few other things.
