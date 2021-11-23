# ROADMAP

## Styles

- variables & utility classes ✅
- fonts ✅
- cards ✅
- breakpoints ✅
- buttons & links
- buttons & links - define data-state - initial, loading, hover, active, disabled

## Components

- button component (links included? for example link that looks like a button)
- revisit icon component (properties) ✅
- modal (details summary?), overlay, popup, notification, (toasts?)
- topbar loading state
- component list/test page (list all custom components)
- inputs:
  - validation ✅
  - error/help ✅
  - accessibility
  - generic inputs ✅
  - text input/select with datalist ✅
  - label before/after/inline/block ✅
  - datetime input (datepicker component)
  - icon support (+ default icons for some input types)
  - snt-fieldset - generate whole forms (scope to replace elements)
  - support errors from api calls (current_password field gets current_password error)

## Integrations

- i18n ✅
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
- stylelint
- external services
  - google, twitter, facebook, stripe, etc... (cleanup firebase integrations)

## R&D:

- xstate - custom derivative
- purgecss
- storybook
