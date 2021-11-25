<template>
  <div style="display: flex; align-items: center">
    <component
      :is="component"
      :class="classes"
      class="snt-icon"
      @click="button && $emit('click')"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";

export default {
  name: "SntIcon",
  props: {
    icon: {
      type: String,
      required: true,
      default: "Google",
    },
    button: Boolean,
    color: {
      type: String,
      default: "primary-lighter",
    },
    hoverColor: {
      type: String,
      default: "primary-darker",
    },
  },
  data() {
    return {
      colorValue: this.getColor(this.color),
      hoverColorValue: this.getColor(this.hoverColor),
    };
  },
  methods: {
    getColor(value) {
      if (value && value[0] === "#") return value;
      const cssColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--snt-color-${value}`);
      if (cssColor) return cssColor;
      return "#000";
    },
  },
  computed: {
    component: (vm) =>
      defineAsyncComponent({
        loader: () => import(`./icons/${vm.icon}.vue`),
        onError: () =>
          console.warn(
            `Invalid prop: <icon /> failed to resolve where icon="${vm.icon}". This is most likely due to a typo or missing icon component.`
          ),
      }),
    classes() {
      const classes = [];
      this.button && classes.push("pointer");
      this.color && classes.push("snt-icon-color");
      this.hoverColor && this.button && classes.push("snt-icon-hover-color");
      return classes;
    },
  },
};
</script>

<style scoped lang="scss">
:deep().snt-icon {
  & > * {
    transition: all 0.2s ease-in-out;
  }
  // &-color > *[stroke]:not([stroke="white"]) {
  &-color > *[stroke] {
    stroke: v-bind(colorValue);
  }

  // &-color > *[fill]:not([fill="white"]) {
  &-color > *[fill] {
    fill: v-bind(colorValue);
  }

  // &-hover-color:hover > *[stroke]:not([stroke="white"]) {
  &-hover-color:hover > *[stroke] {
    stroke: v-bind(hoverColorValue);
  }

  // &-hover-color:hover > *[fill]:not([fill="white"]) {
  &-hover-color:hover > *[fill] {
    fill: v-bind(hoverColorValue);
  }
}
</style>
