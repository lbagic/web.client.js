# Vue Plugins

Plugins provide a way to extend the functionality of your application or introduce new components.

> If you find yourself needing additional functionalities, think twice before installing a new dependancy. It may (or may not) be preferred to implement the functionality without introducing a dependancy depending on the scale of the feature and time required to implement it.

## i18n

I18n is an internationalization-framework which solves the problem of translating the application to different languages with a straightforward configuration and api (`$t`).

For a full api reference, check the [vue-i18n documentation](https://kazupon.github.io/vue-i18n/introduction.html).

#### Example:

```json
// ./src/config/translations/en.json
{
  "general": {
    "hello_world": "Hello World"
  }
}
```

```html
<button>$t('general.hello_world')</button>
```

::: warning
If project requirement is internationalization, provide all application strings via `$t` interface.
:::

## breakpoint

Breakpoint plugin is out-of-the-box solution for using css breakpoints in javascript.

It provides a simple interface (`$bp`) for checking current breakpoint size.

::: tip
All changes to breakpoint definitions in `./src/styles/core/variables` are automatically reflected in the `breakpoint` plugin.
:::

#### Example:

```scss
// ./src/styles/core/variables
$css-variables: (
  "breakpoint": (
    "s": 0px,
    "m": 600px,
    "l": 800px,
    "xl": 1200px,
  ),
);
```

```html
<div v-if="$bp.s">Viewport is 0 - 599px wide</div>
<div v-if="$bp.m">Viewport is 600 - 799px wide</div>
<div v-if="$bp.l">Viewport is 800 - 1199px wide</div>
<div v-if="$bp.xl">Viewport is 1200px or wider</div>

<!-- would show s/m/l/xl, depending on viewport width -->
<div>Current breakpoint is: {{$bp.active}}</div>
```
