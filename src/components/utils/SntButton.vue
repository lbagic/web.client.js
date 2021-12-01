<script>
import { h, mergeProps } from "@vue/runtime-core";
import { RouterLink } from "vue-router";
import { getColor } from "../../utils/getColor.js";

export default {
  name: "SntButton",
  props: {
    color: { type: String, default: "primary" },
    expand: Boolean,
    large: Boolean,
    lighterVariant: Boolean,
    outline: Boolean,
    text: Boolean,
  },
  computed: {
    colors() {
      const variant = this.lighterVariant ? "lighter" : "darker";
      return {
        default: getColor(this.color),
        variant: getColor(`${this.color}-${variant}`),
        on: getColor(`on-${this.color}`),
      };
    },
    classes() {
      const classes = ["snt-button-base"];
      if (!(this.text || this.outline)) classes.push("snt-button-default");
      if (this.expand) classes.push("snt-button-expand");
      if (this.large) classes.push("snt-button-large");
      if (this.outline) classes.push("snt-button-outline");
      if (this.text) classes.push("snt-button-text");

      return classes;
    },
    customAttrs: (vm) => ({
      class: vm.classes,
    }),
  },
  render() {
    const attrs = this.$attrs;
    const el = attrs.href ? "a" : attrs.to ? RouterLink : "button";
    return h(el, mergeProps(this.customAttrs, attrs), {
      default: this.$slots.default,
    });
  },
};
</script>

<style scoped lang="scss">
.snt-button-base {
  --snt-button-border-width: 1.5px;
  --snt-button-border-radius: 2px;
  --snt-button-padding: 6px 12px;
  --snt-button-large-padding: 12px 24px;

  cursor: pointer;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: var(--snt-button-border-width) solid transparent;
  padding: var(--snt-button-padding);
  font-size: 16px;
  line-height: 1.5;
  border-radius: var(--snt-button-border-radius);
  transition-timing-function: ease-in-out;
  transition-duration: 0.15s;
  transition-property: color, background-color, border-color, box-shadow;
}
.snt-button-base[disabled] {
  opacity: 0.66 !important;
  cursor: default !important;
  pointer-events: none !important;
}
.snt-button-default {
  background: v-bind("colors.default");
  color: v-bind("colors.on");
  &:active {
    background: v-bind("colors.variant");
  }
}
.snt-button-outline {
  background: transparent;
  border: var(--snt-button-border-width) solid v-bind("colors.default");
  color: v-bind("colors.default");
  &:active {
    border: var(--snt-button-border-width) solid v-bind("colors.variant");
    color: v-bind("colors.variant");
  }
}
.snt-button-text {
  background: transparent;
  color: v-bind("colors.default");
  &:active {
    color: v-bind("colors.variant");
  }
}
.snt-button-large {
  padding: var(--snt-button-large-padding);
}
.snt-button-expand {
  width: 100%;
}
</style>
