<template>
  <teleport to="body">
    <transition name="snt-drop" appear>
      <div
        v-if="isOpen"
        v-bind="$attrs"
        :class="overlayClasses"
        :style="overlayStyles"
      >
        <slot name="close" v-bind="close">
          <snt-icon
            v-if="showCloseIcon"
            icon="Clear"
            class="snt-overlay-close"
            scale="1.5"
            button
            color="error-lighter"
            hoverColor="error"
            @click="close()"
          />
        </slot>
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { overlayMixin } from "./SntOverlay.util.js";
import { getColor } from "../../utils/getColor.js";
import SntIcon from "./SntIcon.vue";

const defaultColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--snt-app-background");

export default {
  name: "SntOverlay",
  inheritAttrs: false,
  components: { SntIcon },
  mixins: [overlayMixin],
  props: {
    ...overlayMixin.props,
    fill: {
      type: [String, Boolean],
      default: defaultColor,
    },
    center: Boolean,
    showCloseIcon: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    overlayClasses() {
      const classes = ["snt-overlay"];
      if (this.center) classes.push("snt-overlay-center");
      return classes;
    },
    overlayStyles() {
      const styles = {};
      if (this.fill) styles.background = getColor(this.fill, this.fill);
      return styles;
    },
  },
};
</script>

<style scoped lang="scss">
.snt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  backdrop-filter: var(--snt-overlay-backdrop-filter);
}
.snt-overlay-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.snt-overlay-close {
  position: sticky;
  top: 10px;
  right: 10px;
  float: right;
  border-radius: 100%;
  padding: 5px;
}
</style>
