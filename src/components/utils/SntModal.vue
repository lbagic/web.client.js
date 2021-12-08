<template>
  <teleport to="body" :disabled="disableTeleport">
    <transition name="snt-drop" appear>
      <div
        v-if="isOpen"
        class="snt-overlay"
        :style="overlayStyles"
        @click="close"
      >
        <div v-bind="$attrs" class="snt-modal snt-container-m" @click.stop>
          <slot name="close">
            <snt-icon
              v-if="!hideCloseIcon"
              icon="Close"
              class="snt-overlay-close"
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
  props: {
    ...overlayMixin.props,
    /**
     * Sets background fill color. Accepts hex, css variable name or boolean. Defaults to app primary color.
     */
    fill: {
      type: [String, Boolean],
      default: "primary",
    },
    /**
     * Sets background opacity. Defaults to 0.3.
     */
    opacity: {
      type: String,
      default: "0.3",
    },
  },
  computed: {
    overlayStyles() {
      const styles = {
        position: this.disableTeleport ? "absolute" : "fixed",
      };
      if (this.fill) styles.background = getColor(this.fill, this.fill);
      if (this.opacity && styles.background)
        styles.background = hexToRGBA(styles.background, Number(this.opacity));

      return styles;
    },
  },
};
</script>

<style scoped lang="scss">
.snt-overlay {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: var(--snt-overlay-backdrop-filter);
}
.snt-modal {
  position: relative;
  min-height: 300px;
  max-height: calc(100% - 32px);
  overflow-y: auto;
  padding: 1rem;
  background: var(--snt-app-background);
  border-radius: var(--snt-overlay-border-radius);
}
.snt-overlay-close {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
}
</style>
