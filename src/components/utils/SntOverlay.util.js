import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export const overlayShared = reactive({
  uniqueIndex: 0,
  activeModals: {},
  escEvent: false,
});

document.addEventListener("keydown", (e) => {
  if (e.code !== "Escape") return;
  overlayShared.escEvent = !overlayShared.escEvent;
});

watch(
  overlayShared.activeModals,
  (modals) => {
    document.body.style.overflowY = Object.values(modals).some((el) => el)
      ? "hidden"
      : "auto";
  },
  { immediate: true }
);

export const overlayMixin = {
  props: {
    hash: String,
    query: String,
  },
  created() {
    const watcher = {
      hash: ["$route.hash", (value) => (this.isOpen = value === this.hash)],
      query: [
        "$route.query",
        (value) => (this.isOpen = Object.keys(value).includes(this.query)),
      ],
    }[this.openMethod];
    if (watcher) this.$watch(...watcher, { immediate: true });
    this.$watch(
      () => overlayShared.escEvent,
      () => (this.isOpen = false)
    );
  },
  mounted() {
    const isOpenWatcher = (flag) => {
      overlayShared.activeModals[this.uniqueId] = flag;
      this.$emit(flag ? "open" : "close");
      if (!flag && this.openMethod !== "default") {
        const route = { ...this.$router.currentRoute.value };
        const param = {
          hash: undefined,
          query: { ...route.query, [this.query]: undefined },
        }[this.openMethod];
        this.$router.replace({ ...route, [this.openMethod]: param });
      }
    };
    this.$watch("isOpen", isOpenWatcher, { immediate: true });
  },
  emits: ["open", "close"],
  data() {
    return {
      uniqueId: `${this.$options.__scopeId}-${overlayShared.uniqueIndex++}`,
      isOpen: false,
      escEvent: overlayShared.escEvent,
    };
  },
  methods: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
  computed: {
    openMethod() {
      return this.hash ? "hash" : this.query ? "query" : "default";
    },
  },
};
