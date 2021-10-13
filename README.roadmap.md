# ROADMAP

## Styles

- variables & utility classes ✅
- fonts ✅
- cards ✅
- buttons & links ✅
- buttons & links - define data-state - initial, loading, hover, active, disabled
- breakpoints ✅
- cleanup breakpoints ✅

## Components

- inputs
  - datetime input
  - form inputs
  - validation, accessibility, error/info
- modal (details summary?), overlay, popup, notification, (toasts?)
- topbar loading state

## Integrations

- store implementation ✅
  - cleanup store.factory ✅
  - store persistance ✅
  - store reset ✅
  - generate crud actions ✅
- service implementation ✅
  - generate service crud ✅
- api implementation ✅

  - integrate with popups
  - TODO - integrations via call config
    - isLoading: true, // show loading
    - isAutoMsg: true, // show err msg
    - isApiHost: true, // prefix api url
    - isApiMock: false, // prefix /api/mock to mock data
    - isRemoveField: true, // remove all empty params
    - removeFields: [] // manual remove empty params

- external services
  - google, twitter, facebook, stripe, etc... (cleanup firebase integrations)
- i18n ✅

## R&D:

- xstate - custom derivative
- purgecss
- storybook
