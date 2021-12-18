# Components

Components are building blocks of web applications. In scope and complexity they range from basic html elements to groups of elements or other components.

> The following components are not registered globally, and need to be imported and registered to be used.<br>
> Each component has a dedicated .scss file located in `./src/styles/components/component-name.scss`, so be sure to adjust styles to match your project requirements.

::: tip
When building an interface, try to extract common elements into components.
:::

::: danger
Limit the component usage to only a few specific cases. If you ever find an element that is reused but is different each time it appears, be careful and think twice before covering all cases inside one overly complex component.
:::

## SntButton

Custom button component helps with normalizing styling of buttons across the application. It can also be used to output `<a>` or `<router-link>` elements.

#### Properties:

| Property  | Type    | Default   | Accepted Values              | Description                                         |
| --------- | ------- | --------- | ---------------------------- | --------------------------------------------------- |
| `to`      | String  |           | Route path                   | Converts button to `router-link` element            |
| `href`    | String  |           |                              | Converts button to `a` element                      |
| `color`   | String  | 'primary' | Css variable color           | Sets button color scheme.                           |
| `type`    | String  | 'default' | 'default', 'text', 'outline' | Sets button type.                                   |
| `expand`  | Boolean | false     |                              | Sets button to span full width.                     |
| `large`   | Boolean | false     |                              | Increases button padding.                           |
| `variant` | String  | 'dark'    | 'light', 'dark'              | Sets color palette to lighter/darker color variant. |

::: tip
SntButton can accept any valid button attributes besides props above.<br>
E.g. `disabled` attribute.
:::

#### Example:

```html
<snt-button @click="onClick" color="secondary" type="text">A button</snt-button>
<snt-button href="http://localhost:8081" expand>An anchor tag</snt-button>
<snt-button to="/login" type="outline">A router-link</snt-button>
```

## SntIcon

A component created for managing svg elements.

#### Properties:

| Property     | Type             | Default        | Accepted Values                  | Description                            |
| ------------ | ---------------- | -------------- | -------------------------------- | -------------------------------------- |
| `icon`\*     | String           |                | Name of icon (from utils/icons/) | Sets button color scheme.              |
| `button`     | Boolean          | false          | Hex color                        | Enables hover color, and click events. |
| `color`      | String           | primary        | Hex or css variable color        | Sets icon color.                       |
| `hoverColor` | String           | primary-darker | Hex or css variable color        | Sets icon hover color.                 |
| `scale`      | [String, Number] |                | 0 - ∞                            | Sets icon scale.                       |

To use icons, download a svg and save it to `src/components/utils/icons/` as a vue component (e.g. `Home.vue`).

A good place to look for icons is https://fonts.google.com/icons.

#### Example:

```html
<snt-icon icon="Close" />
<snt-icon icon="Google" button color="#000" hoverColor="ternary" @click="..." />
```

## SntInput

Custom input component that should be used in place of default `<input>` or `<select>` elements.

It has built in support for solving boilerplate tasks such as managing labels, errors, hints, validation or multiple options.

#### Slots: `label`

<br>

#### Properties:

| Property          | Type               | Default | Accepted Values                   | Description                                                                                      |
| ----------------- | ------------------ | ------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `model`           | Object             |         |                                   | Preferred way to bind data. `:model="{ field: form }"`.                                          |
| `type`            | String             | 'text'  | Input types                       |                                                                                                  |
| `validator`       | Function           |         |                                   | Should return true if valid or an error message otherwise.                                       |
| `label`           | String             |         |                                   | Sets input label text.                                                                           |
| `labelPosition`   | String             |         | 'block', 'inline', 'start', 'end' | Sets the position of label.                                                                      |
| `help`            | String             |         |                                   | Sets help text.                                                                                  |
| `error`           | String             |         |                                   | Manually set error text.                                                                         |
| `disableErrors`   | Boolean            | false   |                                   | Disables displaying errors.                                                                      |
| `options`         | [Array, Object]    |         |                                   | Options to display when using 'select' or 'text' type.                                           |
| `optionIdBy`      | [String, Function] | 'id'    |                                   | Dot notation string pointing to object 'id', or a function that resolves it.                     |
| `optionLabelBy`   | [String, Function] | 'label' |                                   | Dot notation string pointing to object 'label', or a function that resolves it.                  |
| `datetimeOptions` | [String, Object]   |         |                                   | Refer to [datepicker documentation](https://vue3datepicker.com/api/props) for available options. |
| `rootAttrs`       | [String, Object]   |         |                                   | Attributes that will appear on root element.                                                     |

::: tip
SntInput can accept any valid input attributes besides props above.<br>
E.g. `required`, `min`, `max`, etc... play really well when you want to quickly define some basic validation.
:::

#### Example 1 - labels and help text:

```html
<snt-input type="email" label="Email" />
<snt-input
  type="password"
  help="Password should be at least 6 characters long"
  minlength="6"
/>
```

#### Example 2 - validation:

```html
<template>
  <snt-input :model="{ email: form }" type="email" required />
  <snt-input :model="{ password: form }" type="password" required />
  <snt-input
    :model="{ password_confirmation: form }"
    type="password"
    :validator="
        (value) => (value === form.password ? true : 'Passwords do not match.')
      "
    required
  />
  <snt-button :disabled="!$validate(form)" @click="onRegister">
    Register
  </snt-button>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: "",
          password: "",
          password_confirmation: "",
        },
      };
    },
  };
</script>
```

#### Example 2 - options:

```html
<!-- setting options with an array -->
<snt-input :options="['apple', 'banana', 'orange']" />
<!-- setting options with an object -->
<snt-input :options="{ zvone: 1, marko: 2 }" />
<!-- setting options with an array of objects -->
<snt-input :options="[{ id: 1, label: 'zvone' }, { id: 2, label: 'marko' }]" />
<!-- changing label and identifier keys -->
<snt-input
  optionIdBy="uniqueId"
  optionLabelBy="(el) => el.name"
  :options="[{ uniqueId: 1, name: 'zvone' }, { uniqueId: 2, name: 'marko' }]"
/>
```

## SntModal & SntOverlay

Wrapper for handling basic popover elements. Can be used in combination with router parameters for a better user experience (e.g. clicking back on browsers/phones close the popover).

#### Events: `open`, `close`, `toggle`

<br>

#### Slots: `close`

<br>

#### Properties:

| Property          | Type    | Default | Accepted Values | Description                                                                                                                 |
| ----------------- | ------- | ------- | --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `hash`            | String  |         | e.g. '#hash'    | Route hash that activates modal/oerlay.                                                                                     |
| `query`           | String  |         |                 | Route query that activates modal/oerlay                                                                                     |
| `hideCloseIcon`   | Boolean | false   |                 | Hides close icon.                                                                                                           |
| `disableTeleport` | Boolean | false   |                 | Disables teleporting to "body" element. Should be used when you want to open modal/overlay in specific element on the page. |

#### Modal only properties:

| Property     | Type              | Default   | Accepted Values          | Description            |
| ------------ | ----------------- | --------- | ------------------------ | ---------------------- |
| `background` | [String, Boolean] | 'primary' | Hex or css variable name | Sets background color. |
| `opacity`    | [String, Number]  | '0.3'     | 0 - 1                    |                        |

#### Overlay only properties:

| Property     | Type              | Default              | Accepted Values          | Description              |
| ------------ | ----------------- | -------------------- | ------------------------ | ------------------------ |
| `background` | [String, Boolean] | --snt-app-background | Hex or css variable name | Sets background color.   |
| `center`     | Boolean           | false                |                          | Centers overlay content. |

::: tip
Consider the location where you place this component. E.g. If you want a "contact" form that will be used from multiple locations inside the app, you would probably place the component inside App.vue, so it can be opened from all other views.
:::

#### Example:

```html
<snt-modal hash="#contact-us">
  <h2>Contact us</h2>
  ...
</snt-modal>

<router-link to="#contact-us">Contact Us!</router-link>
```

## SntToast

A component that creates placeholders for toasts and notifications.

#### Properties:

| Property               | Type   | Default        | Accepted Values                  | Description                 |
| ---------------------- | ------ | -------------- | -------------------------------- | --------------------------- |
| `toastPosition`        | String | 'top center'   | top, bottom, left, right, center | Sets toast location.        |
| `notificationPosition` | String | 'bottom right' | top, bottom, left, right, center | Sets notification location. |

You will only ever have one SntToast component registered in your application (in App.vue) to enable showing toasts and notifications.

#### Methods:

| Method                                   | Description                     |
| ---------------------------------------- | ------------------------------- |
| $dispatch("Toast/success", message)      | Pushes a toast success message. |
| $dispatch("Toast/error", message)        | Pushes a toast error message.   |
| $dispatch("Toast/notification", message) | Pushes a notification.          |

## Other Components

#### Carousel

A good carousel component is available at https://swiperjs.com/vue.

#### Table

This framework provides a css class `.snt-table` for styling the default html table.<br>
If the default table does not provide enough functionality for your use case, try searching the web for a fitting table component.
