# ROADMAP

## Styles - 6/6

- variables & utility classes ✅
- fonts ✅
- cards
- breakpoints ✅
- focus styles ✅
- normalized styles ✅
- card styles

## Components - 9/12

- button component ✅
- revisit icon component (properties) ✅
- modal (details summary?), overlay, popup, notification, (toasts?)
- slider component
- inputs:
  - datetime input (datepicker component) ✅
  - date range input
  - input styling ✅
  - validation ✅
  - error/help ✅
  - generic inputs ✅
  - text input/select with datalist ✅
  - label before/after/inline/block ✅

low prio:

- topbar loading state
- component list/test page (list all custom components)
- inputs:
  - accessibility
  - icon support (+ default icons for some input types)
  - snt-fieldset - generate whole forms (scope to replace elements)
  - support errors from api calls (current_password field gets current_password error)

## Integrations - 9/12

- grpc
- forms plugin
- i18n ✅
- store implementation ✅
  - cleanup store.factory ✅
  - store persistance ✅
  - store reset ✅
  - generate crud actions ✅
- service implementation ✅
  - generate service crud ✅
- api implementation ✅
- external services
  - google, twitter, facebook, stripe, etc... (cleanup firebase integrations)

low prio:

- stylelint
- api integration with popups
- api integrations via call config
  - isLoading: true, // show loading
  - isAutoMsg: true, // show err msg
  - isApiHost: true, // prefix api url
  - isApiMock: false, // prefix /api/mock to mock data
  - isRemoveField: true, // remove all empty params
  - removeFields: [] // manual remove empty params

## R&D:

- xstate - custom derivative
- purgecss
- storybook
