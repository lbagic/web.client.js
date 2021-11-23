<template>
  <p class="form-input-info" :class="classes">{{ info || error }}</p>
</template>

<script>
export default {
  name: "FormInfoInput",
  props: { info: String, error: String },
  computed: {
    classes() {
      const classes = [];
      if (!this.info && !this.error) classes.push("form-input-hidden");
      if (this.error) classes.push("form-input-error");
      return classes;
    },
  },
};
</script>

<style scoped lang="scss">
.form-input-info {
  transition: all 0.5s ease;
  font-family: DDin;
  font-size: 0.75rem;
  color: var(--color-grey);
  max-height: 40px;
  opacity: 1;
}
.form-input-error {
  color: var(--color-error);
}
.form-input-hidden {
  opacity: 0;
  max-height: 0px;
}
</style>
