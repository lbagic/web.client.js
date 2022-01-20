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
import { defineAsyncComponent, markRaw } from "@vue/runtime-core";
import { getColor } from "../../utils/getColor.js";

export default {
  name: "SntIcon",
  props: {
    /**
     * Display icon. Accepts name of any icon from utils/icons/. Works out of the box with https://fonts.google.com/icons - might need some tweaking for other icons.
     */
    icon: {
      type: String,
      required: true,
    },
    /**
     * Enables 'click' event and hover color.
     */
    button: Boolean,
    /**
     * Icon base color.
     */
    color: String,
    /**
     * Icon hover color.
     */
    hoverColor: String,
    /**
     * Sets icon scale. Accepts values from zero to infinity and beyond.
     */
    scale: [String, Number],
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
  data() {
    return {
      component: undefined,
    };
  },
  watch: {
    icon: {
      immediate: true,
      handler(icon) {
        const loaderConfig = {
          loader: () => import(`./icons/${icon}.vue`),
        };
        if (process.env !== "production")
          loaderConfig.onError = () =>
            console.warn(`[SntIcon] Missing icon '${icon}'.`);
        this.component = markRaw(defineAsyncComponent(loaderConfig));
      },
    },
  },
  computed: {
    styles() {
      const styles = {};
      if (this.scale) styles.transform = `scale(${this.scale})`;
      if (this.button) styles.tabindex = 0;
      return styles;
    },
  },
};
</script>
