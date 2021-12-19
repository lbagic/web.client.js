---
sidebarDepth: 3
---

# Project Stylesheets

Every web project needs stylesheets for describing the presentation of the markup layer. This starter project comes with SCSS pre-processor which has become the de facto standard for writing stylesheets.

::: warning A Note About SCSS
Although SCSS introduces additional functionalities. Some of them should be avoided in favor of using standard CSS - `scss variables` being the prime example since they are natively supported within CSS and JS.
:::

## Managing Project Styles

There are multiple ways of introducing styles to a Vue codebase:

1. **_Importing styles globally_** (entrypoint: `main.js`) is the most basic way of adding styles to the project. Styles added here can be used within the whole application.
2. **_Writing styles directly in component_** is probably the most used way of adding styles - it affects only the component in which style are written.
3. **_Injecting styles via webpack_** (entrypoint: `./vue.config.js`) is used when we want to add scss mixins and functions which will be available throughout the application.

::: danger
Do not use **_"3. Injecting styles via webpack"_** for writing classes or any other styling blocks since they will be repeatedly imported for each component - resulting in severe duplication.
:::

The following table describes the default file structure of stylesheet files in the project.<br>
When adding additional styles to the project, please follow the predefined structure.

| Root         | Path           | Description                                                                                         |
| ------------ | -------------- | --------------------------------------------------------------------------------------------------- |
| .src/styles/ | core/          | Styles injected via webpack:<br> mixins, functions, and breakpoint variables<br>❌ Avoid editing ❌ |
|              | components/    | Styles written for specific vue components                                                          |
|              | elements/      | Mix of utility and specific purpose styles<br>Example: containers, animations, typography etc...    |
|              | app.scss       | Application specific styles and variables                                                           |
|              | colors.scss    | Project color palette                                                                               |
|              | normalize.scss | Initial markup styles and normalization across browsers.<br> ❌ Avoid editing ❌                    |

::: tip
When adding classes for commonly used elements, make sure to add the **`snt`** prefix to avoid conflicts with external library class names.<br>Example: `.card` or `.container` would become `.snt-card` or `.snt-container`.
:::

## Tips For Writing CSS

Writing concise and well strucutured css might seem like a daunting task, especially when the codebase starts to grow. The initial structure for stylesheets is set and should cover most (if not all) needs for managing project styles, but still some guidelines should be followed for creating a manageable css codebase.

### CSS Selectors

When writing styles, you should always use class selectors (e.g. `.class-name`), even when an element appears only once.

### Specificity

Try keeping specificity as low as possible.

Avoid writing combinator selectors (e.g. `.class > p`, `div ul a`), especially as part of global styles. It will hinder the possibility to easily override styles later on.

_Avoid using `!important` keyword!_

### Naming Conventions

Prefer using same naming convention throughout your code.
Example:

```html
<section class="section">
  <h2 class="section-title"></h2>
  <ul class="section-list">
    <li class="section-list-item"></li>
  </ul>
</section>
```

### Browser Compatibility

::: warning
The majority of css properties are well supported across all modern browsers, but some properties still lack support or behave differenlty on different browsers.

When developing, frequently test the page on different browsers.
:::

### Using Component Styles

Most of the CSS you write will be specific for each component. Do not bloat global styles with seemingly "common" classes and style blocks, and prefer writing your css directly into components.

### Using CSS Variables

A lot of stylesheets have predefined css variables in them. Those variables should be adjusted to fit the project needs.

Variables defined in the `:root` block can easily be used inside your classes or directly on style attribute of the elements.<br> E.g. `:root { --my-color: black }`, `.class { background: var(--my-color); }`, `<p style="color: var(--my-color)"></p>`.

Some predefined classes have css variables. When you use such classes you can easily change the value of those variables inline.<br>Example: `<nav class="snt-flex" style="--gap: 20px;"></nav>`

# Predefined Styles

A shortlist of available project styles.

This is not a complete list - please refer to `./src/styles/` for complete overview.

## Breakpoints

Files:<br>`./src/styles/core/mixins.scss`<br>`./src/styles/core/variables.scss`

Default breakpoint sizes:<br>
`s - 0px`, `m - 600px`, `l - 800px`, `xl - 1200px`

| Mixins | Description    |
| ------ | -------------- |
| s-only | 0px - 599px    |
| m-only | 600px - 799px  |
| m      | 600px and up   |
| l-only | 800px - 1199px |
| l      | 800px and up   |
| xl     | 1200px and up  |

Usage example:

```scss
.class {
  @include s-only {
    font-size: 20px;
  }
}
```

## Colors

File: `./src/styles/colors.scss`

Contains project color palette. Includes `primary`, `secondary`, `ternary`, and other colors.

Also generates the following variations of palette colors:<br>`light`, `lighter`, `lightest`, `max-light`, `dark`, `darker`, `darkest`, `max-dark`

Example usage:

```css
.class {
  background: var(--snt-color-primary);
  color: var(--snt-color-secondary-darkest);
}
```

## Containers

File: `./src/styles/elements/containers.scss`

| Class                 | Description                  |
| --------------------- | ---------------------------- |
| .snt-container        | Adds 16px padding            |
| .snt-container-s      | Small container              |
| .snt-container-m      | Medium container             |
| .snt-container-l      | Large container              |
| .snt-container-xl     | Extra large container        |
| .snt-container-expand | Full width container         |
| .snt-container-expand | Full width container         |
| .snt-grid             | Grid with gap                |
| .snt-grid-fill        | Grid w/ dynamic column count |
| .snt-flex             | Flexbox with gap             |
| .snt-flex-wrap        | Flexbox with gap             |

## Cards & Tables

Files:<br>
`./src/styles/elements/cards.scss`<br>
`./src/styles/elements/tables.scss`

| Class      | Description                              |
| ---------- | ---------------------------------------- |
| .snt-table | Styles for html table with sane defaults |
| .snt-card  |                                          |

## Typography

File: `./src/styles/elements/typography.scss`

Default values: `base size: 16px`, `scale factor: 1.25`

| Class          | Size  | Description                               |
| -------------- | ----- | ----------------------------------------- |
| .snt-fs-6      | ~49px | font base size \* scale factor ^ 5        |
| .snt-fs-5      | ~39px | font base size \* scale factor ^ 4        |
| .snt-fs-4      | ~31px | font base size \* scale factor ^ 3        |
| .snt-fs-3      | 25px  | (25px) font base size \* scale factor ^ 2 |
| .snt-fs-2      | 20px  | (20px) font base size \* scale factor     |
| .snt-fs-1      | 16px  | (16px) font base size                     |
| .snt-fs--1     | 12px  | font base size / scale factor             |
| .snt-fs--2     | ~10px | font base size / scale factor ^ 2         |
| .snt-fs--3     | ~8px  | font base size / scale factor ^ 3         |
| .snt-font-mono |       | SpaceMono font family                     |

## Utils

File: `./src/styles/elements/utils.scss`

| Class            | Description                |
| ---------------- | -------------------------- |
| .relative        | Relative position          |
| .absolute        | Absolute position          |
| .fixed           | Fixed position             |
| .pointer         | Pointer cursor             |
| .mx-auto         | Left and right auto margin |
| .my-auto         | Top and bottom auto margin |
| .block           | Block display              |
| .inline          | Inline display             |
| .inline-block    | Inline block display       |
| .grid            | Grid display               |
| .flex            | Flex display               |
| .align-items     | Align items center         |
| .align-content   | Align content center       |
| .align-self      | Align self center          |
| .justify-items   | Justify items center       |
| .justify-content | Justify content center     |
| .justify-self    | Justify self center        |
| .w-1-1           | Width 100%                 |
| .h-1-1           | Height 100%                |
| .underline       | Underline text decoration  |
| .italic          | Italic text style          |
| .bold            | Bold text weight           |
| .capitalize      | Capitalize text transform  |
| .uppercase       | Uppercase text transform   |
