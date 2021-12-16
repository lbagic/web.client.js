---
sidebarDepth: 3
---

# Stack Overview

Shortlist of custom stack features.

## Components

#### SntButton

Wrapper for handling `<button>`, `<router-link>`, and `<a>` elements.

#### SntIcon

Component for handling svg icons.

#### SntInput

A versatile component with integrated validation. Supports most input types.\
Always prefer using `<snt-input>` instead of the default `<input>` element.

#### SntModal / SntOverlay

Components for managing modals and full screen overlays.

#### SntToast

Component for handling toast and notification messages.

## Plugins

#### i18n ($t)

Internationalization plugin.

#### sntBreakpoints ($breakpoint)

Plugin for managing screen breakpoints in javascript.

## Services

Application layer that handles calling external services (all outside communication goes through this layer).

## Store (vuex)

A system for managing global application state. Most of the business logic lives here.

## Utils

A collection of useful utilities for tackling various problems.

Notable mentions:

- `crud.js` - factory function for scaffolding crud calls (available for both service and store layer)
- `datetime.js` - for parsing dates
- `hashPassword.js` - for hashing passwords

## Styles (SCSS)

A small stylesheet ecosystem that handles `containers`, `breakpoints`, `colors`, `animations`, `tables`, `typography`, and a few other things.
