<template>
  <div style="display: flex; align-items: center">
    <component
      :is="component"
      :class="classes"
      :style="styles"
      class="snt-icon"
      @click="button && $emit('click')"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { getColor } from "../../utils/getColor.js";

export default {
  name: "SntIcon",
  props: {
    icon: {
      type: String,
      required: true,
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
    scale: String,
  },
  data() {
    return {
      colorValue: getColor(this.color, "#000"),
      hoverColorValue: getColor(this.hoverColor, "#333"),
    };
  },
  computed: {
    component: (vm) => {
      const loaderConfig = {
        loader: () => import(`./icons/${vm.icon}.vue`),
      };
      if (process.env !== "production")
        loaderConfig.onError = () =>
          console.warn(
            `Invalid prop: <icon /> failed to resolve where icon="${vm.icon}". This is most likely due to a typo or missing icon component.`
          );
      return defineAsyncComponent(loaderConfig);
    },
    classes() {
      const classes = [];
      this.button && classes.push("pointer");
      this.color && classes.push("snt-icon-color");
      this.hoverColor && this.button && classes.push("snt-icon-hover-color");
      return classes;
    },
    styles() {
      const styles = {};
      if (this.scale) styles.transform = `scale(${this.scale})`;
      return styles;
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
