<template>
  <teleport to="body">
    <transition-group
      v-if="position.same"
      :name="wrapperAnimation(position.toast)"
      :style="wrapperStyles(position.toast)"
      class="snt-toast-wrapper"
      tag="div"
    >
      <div v-for="el in all" :key="el.id" :class="elementClasses(el)">
        <snt-icon
          v-if="el.type === 'notification'"
          icon="Close"
          color="error-lightest"
          hoverColor="error-lighter"
          button
          @click="$store.commit('Toast/removeToasts', el.id)"
        />
        <p>
          {{ el.message }}
        </p>
      </div>
    </transition-group>
    <transition-group
      v-if="!position.same"
      :name="wrapperAnimation(position.toast)"
      :style="wrapperStyles(position.toast)"
      class="snt-toast-wrapper"
      tag="div"
    >
      <div v-for="el in toasts" :key="el.id" :class="elementClasses(el)">
        {{ el.message }}
      </div>
    </transition-group>
    <transition-group
      v-if="!position.same"
      :name="wrapperAnimation(position.notification)"
      :style="wrapperStyles(position.notification)"
      class="snt-toast-wrapper"
      tag="div"
    >
      <div v-for="el in notifications" :key="el.id" :class="elementClasses(el)">
        <snt-icon
          v-if="el.type === 'notification'"
          icon="Close"
          color="error-lightest"
          hoverColor="error-lighter"
          button
          @click="$store.commit('Toast/removeToasts', el.id)"
        />
        <p>
          {{ el.message }}
        </p>
      </div>
    </transition-group>
  </teleport>
</template>

<script>
import SntIcon from "./SntIcon.vue";
const validPositions = ["top", "bottom", "right", "left", "center"];
const validator = (input) =>
  input.split(" ").every((pos) => validPositions.includes(pos));

export default {
  components: { SntIcon },
  name: "SntToast",
  props: {
    toastPosition: {
      type: String,
      validator,
      default: "top center",
    },
    notificationPosition: {
      type: String,
      validator,
      default: "bottom right",
    },
  },
  computed: {
    all: (vm) => vm.$store.state.Toast.toasts,
    toasts: (vm) => vm.all.filter((el) => el.type === "toast"),
    notifications: (vm) => vm.all.filter((el) => el.type === "notification"),
    position() {
      const toast = this.getPosition(this.toastPosition);
      const notification = this.getPosition(this.notificationPosition);
      console.log(toast);
      return {
        toast,
        notification,
        same: toast.x === notification.x && toast.y === notification.y,
      };
    },
    toastStyle: (vm) => vm.wrapperStyles(vm.position.toast),
    notificationStyle: (vm) => vm.wrapperStyles(vm.position.notification),
  },
  methods: {
    getPosition: (el) => ({
      x: el.includes("left")
        ? "left"
        : el.includes("center")
        ? "center"
        : "right",
      y: el.includes("top") ? "top" : "bottom",
    }),
    wrapperStyles(pos) {
      const styles = {};
      styles.display = "flex";
      if (pos.y === "top") {
        styles.top = "0.5rem";
        styles.flexDirection = "column";
      } else {
        styles.bottom = "0.5rem";
        styles.flexDirection = "column-reverse";
      }
      if (pos.x === "center") {
        styles.left = "50%";
        styles.transform = "translateX(-50%)";
      } else if (pos.x === "right") {
        styles.right = "1rem";
      } else if (pos.x === "left") {
        styles.left = "1rem";
      }
      return styles;
    },
    wrapperAnimation(pos) {
      return pos.y === "top"
        ? "snt-toast-animation-top"
        : "snt-toast-animation-bottom";
    },
    elementClasses(el) {
      const classes = [];
      classes.push("snt-toast");
      if (el.type === "toast") {
        classes.push(el.error ? "snt-toast-error" : "snt-toast-success");
      } else classes.push("snt-notification");
      return classes;
    },
  },
};
</script>

<style scoped lang="scss">
.snt-toast-wrapper {
  --snt-toast-transition: all cubic-bezier(0.72, 0.16, 0.28, 0.93) 0.3s;
  position: fixed;
  display: flex;
  width: 250px;
  max-width: 90vw;
}

.snt-toast {
  padding: 1rem 0.5rem;
  width: 100%;
  text-align: center;
  border-radius: 2px;
  margin: 0.5rem 0;
  overflow-wrap: break-word;
  box-shadow: 0 0 3px #0003;
}
.snt-notification {
  color: white;
  background: #000a;
  backdrop-filter: blur(2px);
  border: 1px solid black;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
}
.snt-toast-success {
  background: var(--snt-color-success-lightest);
  border: 1px solid var(--snt-color-success);
}
.snt-toast-error {
  background: var(--snt-color-error-lightest);
  border: 1px solid var(--snt-color-error);
}

.snt-toast-animation-top-move,
.snt-toast-animation-bottom-move {
  transition: var(--snt-toast-transition);
}
.snt-toast-animation-top-leave-active,
.snt-toast-animation-bottom-leave-active {
  transition: var(--snt-toast-transition);
  position: absolute;
}

.snt-toast-animation-top-enter-active {
  transition: var(--snt-toast-transition);
  position: relative;
  bottom: 0;
}
.snt-toast-animation-top-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.snt-toast-animation-top-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.snt-toast-animation-bottom-enter-active {
  transition: var(--snt-toast-transition);
  position: relative;
  top: 0;
}
.snt-toast-animation-bottom-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.snt-toast-animation-bottom-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
