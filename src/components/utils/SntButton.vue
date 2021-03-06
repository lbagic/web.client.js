<script>
import { h, mergeProps } from "@vue/runtime-core";
import { RouterLink } from "vue-router";
import { getColor } from "../../utils/getColor.js";

export default {
  name: "SntButton",
  props: {
    /**
     * Sets button color scheme - accepts hex values or css variable names (e.g. primary).
     */
    color: { type: String, default: "primary" },
    /**
     * Sets button type - default, text, outline.
     */
    type: {
      type: String,
      default: "default",
      validator: (input) => ["default", "text", "outline"].includes(input),
    },
    /**
     * Changes button size.
     */
    size: {
      type: String,
      validator: (value) => ["small", "large", "expand"].includes(value),
    },
    /**
     * Sets color palette to lighter/darker color variant.
     */
    variant: {
      type: String,
      default: "dark",
      validator: (value) => ["light", "dark"].includes(value),
    },
  },
  computed: {
    colors() {
      const accent = this.variant === "dark" ? "darker" : "lighter";
      return {
        default: getColor(this.color),
        accent: getColor(`${this.color}-${accent}`),
        on: getColor(`on-${this.color}`),
      };
    },
    classes() {
      const classes = ["snt-button"];
      classes.push(`snt-button-type-${this.type}`);
      if (this.size) classes.push(`snt-button-${this.size}`);

      return classes;
    },
  },
  render() {
    const attrs = this.$attrs;
    const el = attrs.href ? "a" : attrs.to ? RouterLink : "button";
    return h(el, mergeProps({ class: this.classes }, attrs), {
      default: this.$slots.default,
    });
  },
};
</script>

<style scoped lang="scss">
.snt-button-type-default {
  background: v-bind("colors.default");
  color: v-bind("colors.on");
  &:active {
    background: v-bind("colors.accent");
  }
}
.snt-button-type-outline {
  background: transparent;
  border: var(--border-width) solid v-bind("colors.default");
  color: v-bind("colors.default");
  &:active {
    border: var(--border-width) solid v-bind("colors.accent");
    color: v-bind("colors.accent");
  }
}
.snt-button-type-text {
  background: transparent;
  color: v-bind("colors.default");
  &:active {
    color: v-bind("colors.accent");
  }
}
</style>
