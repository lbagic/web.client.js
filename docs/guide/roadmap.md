# ROADMAP

## Documentation

| Docs (1/3)                   | status |
| ---------------------------- | ------ |
| Set up docs page             | ✅     |
| Write up whole documentation |        |
| Add interactive examples     |        |

## Styles

| Styles (7/7)                | status |
| --------------------------- | ------ |
| variables & utility classes | ✅     |
| fonts                       | ✅     |
| breakpoints                 | ✅     |
| color palette               | ✅     |
| animations                  | ✅     |
| normalized styles           | ✅     |
| component styles            | ✅     |

## Components

| Compoonents (16/16)                                       | status |
| --------------------------------------------------------- | ------ |
| `icon` component                                          | ✅     |
| `button` component                                        | ✅     |
| `button` feature: support anchors and router-link         | ✅     |
| `modal` & `overlay` component                             | ✅     |
| ↪ support hash and route query                            | ✅     |
| `toasts` (go away automatically)                          | ✅     |
| `notifications` (go away when interacting)                | ✅     |
| `input` component                                         | ✅     |
| ↪ default input types                                     | ✅     |
| ↪ styling                                                 | ✅     |
| ↪ validation                                              | ✅     |
| ↪ support types: `date`, `time`, `month`                  | ✅     |
| ↪ support date range                                      | ✅     |
| ↪ support error & help text                               | ✅     |
| ↪ add advanced `model` binding                            | ✅     |
| ↪ support label placement `block`/`inline`, `start`/`end` | ✅     |

#### Low priority:

- support overriding component styles ✅
- support modals and overlays to be used in constrained section ✅
- add table component - or is class enough?
- slider/carousel component (probably not worth bundle size - use swipper.js plugin)
- topbar loading state (connected with api calls?)
- inputs:
  - input type file - dropdown area
  - icon support (+ default icons for some input types)
  - snt-fieldset - generate whole forms
  - support errors from api calls (e.g. current_password field gets current_password error)
  - migrate to flatpickr for datetime inputs https://www.npmjs.com/package/vue-flatpickr-component
- custom components a11y

## Integrations

| Integrations (9/13)          | status |
| ---------------------------- | ------ |
| api factory                  | ✅     |
| api pagination handler       |        |
| api integration with popups? |        |
| service crud generator       | ✅     |
| grpc                         |        |
| firebase integrations        |        |
| i18n                         | ✅     |
| husky                        | ✅     |
| store implementation         | ✅     |
| ↪ scaffold basic methods     | ✅     |
| ↪ reset functionality        | ✅     |
| ↪ persistance                | ✅     |
| ↪ crud generator             | ✅     |

#### Low priority:

- stylelint
- api integrations via call config
  - isLoading: true, // show loading
  - isAutoMsg: true, // show err msg
  - isApiHost: true, // prefix api url
  - isApiMock: false, // prefix /api/mock to mock data
  - isRemoveField: true, // remove all empty params
  - removeFields: [] // manual remove empty params
