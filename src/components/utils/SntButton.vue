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
