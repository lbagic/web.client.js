<script>
import { h, mergeProps } from "@vue/runtime-core";
import { RouterLink } from "vue-router";
import { getColor } from "../../utils/getColor.js";

export default {
  name: "SntButton",
  props: {
    /**
     * Sets button color scheme - accepts hex values or css variable names (i.e. primary).
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
     * Sets button to span full width.
     */
    expand: Boolean,
    /**
     * Increases button padding.
     */
    large: Boolean,
    /**
     * Changes color palette to lighter color variant.
     */
    lighterVariant: Boolean,
  },
  computed: {
    colors() {
      const accent = this.lighterVariant ? "lighter" : "darker";
      return {
        default: getColor(this.color),
        accent: getColor(`${this.color}-${accent}`),
        on: getColor(`on-${this.color}`),
      };
    },
    classes() {
      const classes = ["snt-button"];
      classes.push(`snt-button-type-${this.type}`);
      if (this.expand) classes.push("snt-button-expand");
      if (this.large) classes.push("snt-button-large");

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
