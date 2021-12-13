<script>
import { h } from "@vue/runtime-core";
import SntIcon from "./SntIcon.vue";
import { TransitionGroup } from "@vue/runtime-dom";

const validator = (value) =>
  ["left", "right", "center"].some((x) => value.includes(x)) &&
  ["top", "bottom"].some((y) => value.includes(y));
const parseTransitionValue = (computedStyle, cssVar) =>
  Number(computedStyle.getPropertyValue(cssVar).split("px")[0]);

export default {
  components: { SntIcon },
  name: "SntToast",
  props: {
    /**
     * Changes default toast/notification position.
     */
    toastPosition: { type: String, validator, default: "top center" },

    /**
     * Changes default toast/notification position.
     */
    notificationPosition: { type: String, validator, default: "bottom right" },
  },
  mounted() {
    const computedStyle = getComputedStyle(this.$refs.toastRoot.$el);
    this.enterFrom = parseTransitionValue(computedStyle, "--enter-from");
    this.leaveTo = parseTransitionValue(computedStyle, "--leave-to");
  },
  data() {
    return {
      enterFrom: 0,
      leaveTo: 0,
    };
  },
  computed: {
    all: (vm) => vm.$store.state.Toast.toasts,
    toasts: (vm) => vm.all.filter((el) => el.type === "toast"),
    notifications: (vm) => vm.all.filter((el) => el.type === "notification"),
    specs() {
      const { toastPosition: tp, notificationPosition: np } = this;
      const ty = tp.includes("bottom") ? "bottom" : "top";
      const tx = tp.includes("left")
        ? "left"
        : tp.includes("right")
        ? "right"
        : "center";
      const ny = np.includes("bottom") ? "bottom" : "top";
      const nx = np.includes("left")
        ? "left"
        : np.includes("center")
        ? "center"
        : "right";

      return {
        toast: { x: tx, y: ty, ...this.calcTransition(ty) },
        notification: { x: nx, y: ny, ...this.calcTransition(ny) },
        same: tx === nx && ty === ny,
      };
    },
  },
  methods: {
    calcTransition(position) {
      const movement = {
        top: { enterFrom: this.enterFrom, leaveTo: -1 * this.leaveTo },
        bottom: { enterFrom: -1 * this.enterFrom, leaveTo: this.leaveTo },
      }[position];
      for (let key in movement) movement[key] = movement[key] + "px";
      return movement;
    },
    rootStyles(pos) {
      const yStyles = {
        top: { top: "8px", flexDirection: "column" },
        bottom: { bottom: "8px", flexDirection: "column-reverse" },
      }[pos.y];
      const xStyles = {
        left: { left: "16px" },
        center: { left: "50%", transform: "translateX(-50%)" },
        right: { right: "16px" },
      }[pos.x];

      return { display: "flex", ...yStyles, ...xStyles };
    },
    elementClasses(el) {
      const classes = ["snt-toast"];
      if (el.type === "toast")
        classes.push(el.error ? "snt-toast-error" : "snt-toast-success");
      else classes.push("snt-toast-notification");
      return classes;
    },
  },
  render() {
    const closeIcon = (el) =>
      h(SntIcon, {
        icon: "Close",
        color: "error-lightest",
        hoverColor: "error-lighter",
        button: true,
        onClick: () => this.$store.commit("Toast/removeToasts", el.id),
      });
    const elementArray = (elements) =>
      elements.map((el) => {
        const msg = h("p", el.message);
        const inner = el.type === "notification" ? [closeIcon(el), msg] : msg;
        return h("div", { key: el.id, class: this.elementClasses(el) }, inner);
      });
    const rootElement = (type, elements) =>
      h(
        TransitionGroup,
        {
          tag: "div",
          class: "snt-toast-root",
          style: this.rootStyles(this.specs[type]),
          name: `snt-${type}-animation`,
          ref: "toastRoot",
        },
        { default: () => elementArray(elements) }
      );
    return this.specs.same
      ? rootElement("toast", this.all)
      : [
          rootElement("toast", this.toasts),
          rootElement("notification", this.notifications),
        ];
  },
};
</script>

<style scoped lang="scss">
.snt-toast-animation-move,
.snt-notification-animation-move {
  transition: var(--transition);
}
.snt-toast-animation-leave-active,
.snt-notification-animation-leave-active {
  transition: var(--transition);
  position: absolute;
}
.snt-toast-animation-enter-active,
.snt-notification-animation-enter-active {
  transition: var(--transition);
  position: relative;
}
.snt-toast-animation-enter-from {
  opacity: 0;
  transform: translateY(v-bind("specs.toast.enterFrom"));
}
.snt-toast-animation-leave-to {
  opacity: 0;
  transform: translateY(v-bind("specs.toast.leaveTo"));
}
.snt-notification-animation-enter-from {
  opacity: 0;
  transform: translateY(v-bind("specs.notification.enterFrom"));
}
.snt-notification-animation-leave-to {
  opacity: 0;
  transform: translateY(v-bind("specs.notification.leaveTo"));
}
</style>
