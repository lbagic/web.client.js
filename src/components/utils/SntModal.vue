<template>
  <teleport to="body" :disabled="disableTeleport">
    <transition name="snt-drop" appear>
      <div
        v-if="isOpen"
        class="snt-modal-root"
        :style="overlayStyles"
        @click="close"
      >
        <div v-bind="$attrs" class="snt-modal snt-container-m" @click.stop>
          <slot name="close">
            <snt-icon
              v-if="!hideCloseIcon"
              icon="Close"
              class="snt-modal-close"
              scale="1.5"
              button
              color="error-lighter"
              hoverColor="error"
              @click="close"
            />
          </slot>
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { overlayMixin } from "./SntOverlay.internals.js";
import { getColor } from "../../utils/getColor.js";
import SntIcon from "./SntIcon.vue";
import { hexToRGBA } from "../../utils/hexToRgba.js";

export default {
  name: "SntModal",
  components: { SntIcon },
  mixins: [overlayMixin],
  emits: ["open", "close", "toggle"],
  props: {
    ...overlayMixin.props,
    /**
     * Sets background color. Accepts hex, css variable name or boolean. Defaults to app primary color.
     */
    background: {
      type: [String, Boolean],
      default: "primary",
    },
    /**
     * Sets background opacity. Defaults to 0.3.
     */
    opacity: {
      type: [String, Number],
      default: "0.3",
    },
  },
  computed: {
    overlayStyles() {
      const styles = {
        position: this.disableTeleport ? "absolute" : "fixed",
      };
      if (this.background)
        styles.background = getColor(this.background, this.background);
      if (this.opacity && styles.background) {
        const opacity =
          typeof this.opacity === "number"
            ? this.opacity
            : Number(this.opacity);
        styles.background = hexToRGBA(styles.background, opacity);
      }

      return styles;
    },
  },
};
</script>
