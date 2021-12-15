# ROADMAP

## Documentation

- quick start
  - husky (+ monorepo config)
  - vscode plugins
- project structure
- plugins
  - i18n
  - breakpoint
- recommende plugins
  - carousel - https://swiperjs.com/
- components
  - snt-button
  - snt-icon
  - snt-input
  - snt-modal
  - snt-overlay
  - snt-toast
- styles
  - variables
  - breakpoints

## Styles - 5/5

- variables & utility classes ✅
- fonts ✅
- breakpoints ✅
- focus styles ✅
- normalized styles ✅
- component css variables that are encapsulated in class can be short? ✅

## Components - 15/15

- button component ✅
- revisit icon component (properties) ✅
- overlays
  - modals - (hijack back button) ✅
  - overlay (modal with background; hijack back button) ✅
  - notifications (goes away when interacting) ✅
  - toasts (goes away automatically) ✅
- inputs:
  - model binding ✅
  - datetime input (datepicker component) ✅
  - date range input ✅
  - input styling ✅
  - validation ✅
  - error/help ✅
  - generic inputs ✅
  - text input/select with datalist ✅
  - label before/after/inline/block ✅

low prio:

- migrate to flatpickr for datetime inputs https://www.npmjs.com/package/vue-flatpickr-component
- support modals and overlays to be used in constrained section ✅
- styling components
- input type file - dropdown area
- table component
- slider/carousel component (not sure if worth the bundle size, swiperjs seems like an okay plugin)
- slideout navigation -- slots for 'top' 'slide' 'top-when-slide'
- slideout component
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

- husky hooks
- grpc
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
