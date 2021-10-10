<template>
  <div style="display: flex; align-items: center">
    <component
      :is="component"
      :class="classes"
      class="icon-component"
      @click="button && $emit('click')"
    />
  </div>
</template>

<script>
import { markRaw } from "@vue/reactivity";
import Apple from "./icons/Apple.vue";
import Facebook from "./icons/Facebook.vue";
import Google from "./icons/Google.vue";
import Logout from "./icons/Logout.vue";

const icons = {
  Apple,
  Facebook,
  Google,
  Logout,
};

export default {
  name: "Icon",
  props: {
    icon: {
      type: String,
      required: true,
      validator: (value) => icons[value],
    },
    button: Boolean,
    color: String,
    hover: {
      type: String,
      default: "ternary",
    },
  },
  data() {
    return {
      component: markRaw(icons[this.icon]),
      cssVariables: {
        baseColor: this.getColor(this.color),
        hoverColor: this.getColor(this.hover),
      },
    };
  },
  methods: {
    getColor(value) {
      if (value && value[0] === "#") return value;
      const cssColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--color-${value}`);
      if (cssColor) return cssColor;
      return "#000";
    },
  },
  computed: {
    classes() {
      const classes = [];
      this.button && classes.push("pointer");
      this.color && classes.push("icon-component-color");
      this.hover && this.button && classes.push("icon-component-hover");
      return classes;
    },
  },
};
</script>

<style lang="scss">
.icon-component {
  margin-top: auto;
  margin-bottom: auto;
  & > * {
    transition: all 0.2s ease-in-out;
  }
  &-color > *[stroke]:not([stroke="white"]) {
    stroke: var(--base-color);
  }

  &-color > *[fill]:not([fill="white"]) {
    fill: var(--base-color);
  }

  &-hover:hover > *[stroke]:not([stroke="white"]) {
    stroke: var(--hover-color);
  }

  &-hover:hover > *[fill]:not([fill="white"]) {
    fill: var(--hover-color);
  }
}
</style>
