<template>
  <div v-bind="rootAttrs">
    <label>
      <slot name="label">
        <p>Label - {{ type }}</p>
      </slot>
      <div style="display: flex">
        <component
          :is="element.component"
          v-bind="inputAttrs"
          ref="input"
          :value="value"
          :list="uniqueId + '-list'"
          @input="onInput"
          @blur="this.wasBlurred = true"
        >
          <option
            v-for="(opt, index) in normalizedOptions"
            :key="index"
            :value="resolveValue(opt)"
          >
            {{ resolveLabel(opt) }}
          </option>
        </component>
        <datalist :id="uniqueId + '-list'" ref="datalist">
          <option v-for="(opt, index) in normalizedOptions" :key="index">
            {{ resolveLabel(opt) }}
          </option>
        </datalist>
      </div>
    </label>
    <p v-if="help" class="snt-input-help">{{ help }}</p>
    <p v-if="!hideErrors && wasBlurred && errorMessage" class="snt-input-error">
      {{ errorMessage }}
    </p>
    <p>value: {{ value }}</p>
    <p>output: {{ output }}</p>
  </div>
</template>

<script>
import {
  componentMap,
  componentTypes,
  normalizedOptions,
  rootAttributeSplitter,
  htmlErrors,
  htmlErrorKeys,
  getUniqueId,
} from "./SntInput.util.js";

const { rootAttrs, elementAttrs } = rootAttributeSplitter({
  rootclass: "class",
  rootstyle: "style",
});

export default {
  name: "TestInput",
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => componentTypes.includes(value),
    },
    validator: { type: Function, default: () => true },
    help: String,
    error: String,
    labelPosition: {
      type: String,
      validator: (value) => {
        const params = value.split(" ");
        const allowed = ["inline", "block", "start", "end"];
        return params.every((param) => allowed.includes(param));
      },
    },
    hideErrors: Boolean,
    optionsValuePath: { type: String, default: "value" },
    optionsLabelPath: { type: String, default: "label" },
    options: [Array, Object],
  },
  mounted() {
    this.uniqueId = getUniqueId(this.$options.__scopeId);
    this.isValid = this.errorHandler(this.$refs.input.value);
    this.value = this.output =
      this.inputAttrs.value ??
      this.$refs.input.value ??
      this.element.defaultValue;
  },
  data() {
    return {
      uniqueId: undefined,
      value: "",
      output: "",
      wasBlurred: false,
      lastError: false,
      isValid: false,
      errorMessage: "",
    };
  },
  watch: {
    isValid(flag) {
      this.$emit("valid", flag);
    },
    error: {
      immediate: true,
      handler() {
        this.errorMessage = this.lastError = this.error;
      },
    },
  },
  methods: {
    onInput(e) {
      if (this.lastError === this.errorMessage) this.lastError = "";
      this.errorHandler(e.target.value);

      const value = e.target[this.element.targetValueProperty];

      // case: number and range NaN edgecase
      this.value = this.output = isNaN(value) ? undefined : value;

      // case: text with options
      if (this.type === "text" && this.normalizedOptions.length) {
        const selected = this.normalizedOptions.find(
          (el) => this.resolveLabel(el) === this.value
        );
        if (selected) {
          this.output = this.resolveValue(selected);
          this.update();
        }

        // case: default
      } else this.update();
    },
    errorHandler(value) {
      const err = this.getError(value);
      this.isValid = err.isValid;
      if (this.lastError !== this.errorMessage) this.errorMessage = err.message;
    },
    getError(input) {
      const validation = this.getValidationError(input);
      const html = this.getHtmlError();
      return {
        isValid: html.isValid && validation.isValid,
        message: validation.message || html.message,
      };
    },
    getValidationError(input) {
      const state = this.validator(input);
      const isValid = state === true;
      const message = typeof state === "string" ? state : undefined;
      return { isValid, message };
    },
    getHtmlError() {
      const validity = this.$refs.input.validity;
      const isValid = validity.valid;
      const key = htmlErrorKeys.find((key) => validity[key]);
      const message = key ? htmlErrors[key] : undefined;
      return { isValid, message };
    },
    resolveLabel(object) {
      return this.optionsLabelPath.split(".").reduce((a, c) => a[c], object);
    },
    resolveValue(object) {
      return this.optionsValuePath.split(".").reduce((a, c) => a[c], object);
    },
    update() {
      this.$emit("update:modelValue", this.output);
    },
  },
  computed: {
    rootAttrs,
    element: (vm) => componentMap[vm.type],
    inputAttrs: (vm) => {
      const attrs = elementAttrs(vm);
      if (vm.element.component === "input") attrs.type = vm.type;
      return attrs;
    },
    normalizedOptions,
  },
};
</script>

<style scoped lang="scss">
.snt-input-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.snt-input-help {
  color: var(--snt-color-grey);
}
.snt-input-error {
  color: var(--snt-color-error);
}
input:not([type="checkbox"]):not([type="radio"]),
select,
textarea {
  background: #0001;
  width: 100%;
}

label {
  // display: inline-flex;
  // flex-direction: row-reverse;
  // align-items: center;
  // vertical-align: middle;
}
</style>
