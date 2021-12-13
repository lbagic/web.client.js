<template>
  <div ref="iconRoot" class="snt-icon-root">
    <component
      :is="component"
      :style="styles"
      :class="{
        'snt-icon': true,
        pointer: button,
        'snt-icon-hover': button,
      }"
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
    color: String,
    hoverColor: String,
    scale: String,
  },
  mounted() {
    const style = this.$refs.iconRoot.style;
    this.$watch(
      "color",
      (color) => color && style.setProperty("--color", getColor(color, "#000")),
      { immediate: true }
    );
    this.$watch(
      "hoverColor",
      (hover) =>
        hover && style.setProperty("--hover-color", getColor(hover, "#333")),
      { immediate: true }
    );
  },
  computed: {
    component() {
      const loaderConfig = {
        loader: () => import(`./icons/${this.icon}.vue`),
      };
      if (process.env !== "production")
        loaderConfig.onError = () =>
          console.warn(`[SntIcon] Missing icon '${this.icon}'.`);
      return defineAsyncComponent(loaderConfig);
    },
    styles() {
      const styles = {};
      if (this.scale) styles.transform = `scale(${this.scale})`;
      if (this.button) styles.tabindex = 0;
      return styles;
    },
  },
};
</script>
