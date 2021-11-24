<template>
  <div v-bind="rootAttrs" class="snt-input-info-delimiter">
    <label :class="labelClass">
      <!-- label slot #before -->
      <slot v-if="hasLabel && labelPlacement.start" name="label">
        <p>{{ label }}</p>
      </slot>
      <component
        :is="element.component"
        ref="input"
        :list="`${uniqueId}-list`"
        :value="value"
        v-bind="inputAttrs"
        @blur.stop="onBlur"
        @focus="onFocus"
        @input="onInput"
      >
        <!-- @blur="onBlur" -->
        <option
          v-for="(opt, index) in normalizedOptions"
          :key="index"
          :value="resolveValue(opt)"
        >
          {{ resolveLabel(opt) }}
        </option>
      </component>
      <!-- label slot #after -->
      <slot v-if="hasLabel && labelPlacement.end" name="label">
        <p>{{ label }}</p>
      </slot>
      <!-- datalis for text input with options -->
      <datalist v-if="type === 'text' && hasOptions" :id="`${uniqueId}-list`">
        <option v-for="(opt, index) in normalizedOptions" :key="index">
          {{ resolveLabel(opt) }}
        </option>
      </datalist>
      <datepicker
        v-show="false"
        v-if="isDate"
        ref="datepicker"
        v-bind="inputAttrs"
        v-model="dateInput"
        style="position: absolute"
        @closed="onBlur('datetime')"
      />
    </label>
    <p v-if="help" class="snt-input-help">{{ help }}</p>
    <transition v-if="!hideErrors" name="snt-drop">
      <p v-if="wasBlurred && errorMessage" class="snt-input-error">
        {{ errorMessage }}
      </p>
    </transition>
    <p>{{ value }}</p>
  </div>
</template>
<script>
import {
  sntInputElements,
  sntInputTypes,
  normalizedOptions,
  rootAttributeSplitter,
  htmlErrors,
  htmlErrorKeys,
  getUniqueId,
} from "./SntInput.util.js";
import Datepicker from "vue3-date-time-picker";

const { rootAttrs, elementAttrs } = rootAttributeSplitter({
  rootclass: "class",
  rootstyle: "style",
});

export default {
  name: "TestInput",
  inheritAttrs: false,
  emits: ["valid", "update:modelValue", "blur"],
  components: { Datepicker },
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => sntInputTypes.includes(value),
    },
    validator: { type: Function, default: () => true },
    help: String,
    error: String,
    label: String,
    labelPosition: {
      type: String,
      validator: (value) => {
        const params = value.split(" ");
        const allowed = ["block", "inline", "start", "end"];
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
      isValid: false,
      lastError: "",
      errorMessage: "",
      dateInput: "",
      parsedDateInput: "",
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
    dateInput(val) {
      this.$refs.input.value = this.element.datetimeParser(val);
      this.onInput();
    },
  },
  methods: {
    onInput() {
      if (this.lastError === this.errorMessage) this.lastError = "";

      const value = this.$refs.input[this.element.targetValueProperty];
      console.log({ el: this.$refs.input });

      this.value = this.output =
        // case: number and range NaN edgecase
        (this.type === "range" || this.type === "number") && isNaN(value)
          ? undefined
          : value;

      // case: text with options
      if (this.type === "text" && this.hasOptions) {
        const selected = this.normalizedOptions.find(
          (el) => this.resolveLabel(el) === this.value
        );
        if (selected) {
          this.output = this.resolveValue(selected);
          this.update();
        }

        // case: default
      } else this.update();
      this.errorHandler();
    },
    onFocus() {
      if (!this.isDate) return;
      this.$refs.datepicker.openMenu();
    },
    onBlur(el) {
      if (this.isDate && el !== "datetime") return;
      this.$emit("blur", undefined);
      this.wasBlurred = true;
      this.errorHandler();
    },
    errorHandler() {
      const err = this.getError();
      this.isValid = err.isValid;
      if (!this.lastError || this.lastError !== this.errorMessage)
        this.errorMessage = err.message;
    },
    getError() {
      const validation = this.getValidationError();
      const html = this.getHtmlError();
      return {
        isValid: html.isValid && validation.isValid,
        message: validation.message || html.message,
      };
    },
    getValidationError() {
      const state = this.validator(this.value);
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
    element: (vm) => sntInputElements[vm.type],
    inputAttrs() {
      let attrs = elementAttrs(this);
      if (this.element.component === "input") attrs.type = this.element.type;
      if (this.element.attrs) attrs = { ...attrs, ...this.element.attrs };
      return attrs;
    },
    normalizedOptions,
    hasOptions() {
      return !!this.normalizedOptions.length;
    },
    hasLabel() {
      return this.$slots.label || this.label;
    },
    labelClass() {
      if (!this.hasLabel) return;
      return this.labelPlacement.inline
        ? "snt-input-label__inline"
        : "snt-input-label__block";
    },
    labelPlacement() {
      const isCheckbox = this.type === "checkbox" || this.type === "radio";
      const pos = this.labelPosition
        ? this.labelPosition
        : isCheckbox
        ? "inline end"
        : "block start";
      const block = !pos.includes("inline");
      const start = !pos.includes("end");
      return { block, inline: !block, start, end: !start };
    },
    isDate() {
      return this.element.datetimeParser;
    },
  },
};
</script>

<style scoped lang="scss">
.snt-input-label__block {
  &:deep() > * + * {
    margin-block-start: var(--snt-input-label-block-margin);
  }
}
.snt-input-label__inline {
  display: inline-flex;
  align-items: center;
  &:deep() > * + * {
    margin-inline-start: var(--snt-input-label-inline-margin);
  }
}
.snt-input-info-delimiter {
  & > *:nth-child(2) {
    margin-top: 3px;
  }
  & > *:nth-child(3) {
    margin-top: 2px;
  }
}
.snt-input-help {
  color: var(--snt-color-grey);
  font-size: var(--snt-fs-1);
  line-height: 1.2;
}
.snt-input-error {
  color: var(--snt-color-error);
  font-size: var(--snt-fs-1);
  line-height: 1.2;
}
input:not([type="checkbox"]):not([type="radio"]),
select,
textarea {
  background: #0001;
  width: 100%;
}
</style>
