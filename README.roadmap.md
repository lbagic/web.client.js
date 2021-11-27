# ROADMAP

- project documentation (plugins etc)

## Styles - 5/5

- variables & utility classes ✅
- fonts ✅
- breakpoints ✅
- focus styles ✅
- normalized styles ✅

## Components - 11/13

- button component ✅
- revisit icon component (properties) ✅
- overlays
  - modals - (hijack back button) ✅
  - overlay (modal with background; hijack back button) ✅
  - notifications (goes away when interacting)
  - toasts (goes away automatically)
- inputs:
  - datetime input (datepicker component) ✅
  - input styling ✅
  - validation ✅
  - error/help ✅
  - generic inputs ✅
  - text input/select with datalist ✅
  - label before/after/inline/block ✅

low prio:

- input type file - dropdown area
- table component
- slider/carousel component
- slideout navigation -- slots for 'top' 'slide' 'top-when-slide'
- slideout component
- component documentation
- date range input
- topbar loading state
- inputs:
  - icon support (+ default icons for some input types)
  - snt-fieldset - generate whole forms (scope to replace elements)
  - support errors from api calls (current_password field gets current_password error)
- a11y:
  - inputs
  - overlays
  - buttons

## Integrations - 9/12

- forms plugin
- api integration with popups
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

- grpc
- stylelint
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
