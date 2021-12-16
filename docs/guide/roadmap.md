# ROADMAP

## Documentation 1/2

- create up docs page ✅
- complete documentation

## Styles - 5/5

- variables & utility classes ✅
- fonts ✅
- breakpoints ✅
- focus styles ✅
- normalized styles ✅
- component styles ✅

## Components - 15/15

- `icon` component ✅
- `button` component (with anchor and router-link support) ✅
- overlays
  - `modal` and `overlay` component ✅
  - add support for hash and route query ✅
- toasts
  - toasts (go away automatically) ✅
  - notifications (go away when interacting) ✅
- inputs
  - input styling ✅
  - integrate validation ✅
  - add date range support ✅
  - support default input types ✅
  - intergrate error and help text ✅
  - support options for text and select inputs ✅
  - add datetime support (date, month, time) ✅
  - add v-model and advanced model binding support ✅
  - support label placement: block/inline start/end ✅

#### Low priority:

- support overriding component styles ✅
- support modals and overlays to be used in constrained section ✅
- migrate to flatpickr for datetime inputs https://www.npmjs.com/package/vue-flatpickr-component
- input type file - dropdown area
- add table component - or is class enough?
- slider/carousel component (not sure if worth the bundle size, swiperjs seems like an okay plugin)
- slideout navigation -- slots for 'top' 'slide' 'top-when-slide'? Is it even used that often to justify adding a complex component?
- topbar loading state
- inputs:
  - icon support (+ default icons for some input types)
  - snt-fieldset - generate whole forms (scope to replace elements)
  - support errors from api calls (current_password field gets current_password error)
- custom components a11y

## Integrations - 9/12

- grpc
- api integration with popups? Wor
- i18n ✅
- husky hooks ✅
- store implementation
  - store reset ✅
  - basic methods ✅
  - store persistance ✅
  - cleanup store.factory ✅
  - generate crud actions ✅
- service implementation
  - api service ✅
  - generate service crud ✅
- external services
  - google, twitter, facebook, stripe, etc... (cleanup firebase integrations)

#### Low priority:

- stylelint
- api integrations via call config
  - isLoading: true, // show loading
  - isAutoMsg: true, // show err msg
  - isApiHost: true, // prefix api url
  - isApiMock: false, // prefix /api/mock to mock data
  - isRemoveField: true, // remove all empty params
  - removeFields: [] // manual remove empty params
