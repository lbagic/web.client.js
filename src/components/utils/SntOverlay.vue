<template>
  <teleport to="body" :disabled="disableTeleport">
    <transition name="snt-drop" appear>
      <div
        v-if="isOpen"
        v-bind="$attrs"
        :class="{
          'snt-overlay': true,
          'snt-overlay-center': center,
        }"
        :style="overlayStyles"
      >
        <slot name="close" v-bind="close">
          <snt-icon
            v-if="!hideCloseIcon"
            icon="Close"
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
import { overlayMixin } from "./SntOverlay.internals.js";
import { getColor } from "../../utils/getColor.js";
import SntIcon from "./SntIcon.vue";

const defaultColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--snt-app-background");

export default {
  name: "SntOverlay",
  components: { SntIcon },
  mixins: [overlayMixin],
  emits: ["open", "close", "toggle"],
  props: {
    ...overlayMixin.props,
    /**
     * Sets background color. Accepts hex or css variable name. Defaults to app background color.
     */
    background: {
      type: [String, Boolean],
      default: defaultColor,
    },
    /**
     * Toggles displaying overlay content in center.
     */
    center: Boolean,
  },
  computed: {
    overlayStyles() {
      const styles = {
        position: this.disableTeleport ? "absolute" : "fixed",
      };
      if (this.background)
        styles.background = getColor(this.background, this.background);
      return styles;
    },
  },
};
</script>
