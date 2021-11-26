<template>
  <div v-bind="rootAttrs" class="snt-input-info-delimiter">
    <label ref="inputWrapper" :class="labelClass">
      <!-- label slot #before -->
      <slot v-if="hasLabel && labelPlacement.start" name="label">
        <p>{{ label }}</p>
      </slot>
      <component
        :is="element.component"
        ref="input"
        :list="listId"
        :value="value"
        v-bind="inputAttrs"
        :class="isDatetime && 'snt-datepicker-input'"
        @blur.stop="onBlur('input')"
        @keydown="onKeydown"
        @focus="onFocus"
        @input="onInput"
      >
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
      <datalist v-if="type === 'text' && hasOptions" :id="listId">
        <option v-for="(opt, index) in normalizedOptions" :key="index">
          {{ resolveLabel(opt) }}
        </option>
      </datalist>
      <!-- datepicker component -->
      <component
        :is="datepicker"
        v-show="false"
        v-if="isDatetime"
        ref="datepicker"
        v-bind="datetimeAttrs"
        v-model="dateInput"
        style="position: absolute"
        @update:modelValue="this.$refs.input.focus()"
        @closed="onBlur('datepicker')"
      />
    </label>
    <p v-if="help" class="snt-input-help">{{ help }}</p>
    <transition v-if="!hideErrors" name="snt-drop">
      <p v-if="wasBlurred && errorMessage" class="snt-input-error">
        {{ errorMessage }}
      </p>
    </transition>
  </div>
</template>
<script>
import {
  htmlErrorKeys,
  htmlErrors,
  sntInputElements,
  sntInputTypes,
} from "./SntInput.util.js";
import { defineAsyncComponent, ref } from "@vue/runtime-core";

const uniqueIndex = ref(0);
let focusElement = undefined;
document.addEventListener("focusin", (e) => (focusElement = e.target));

export default {
  name: "TestInput",
  inheritAttrs: false,
  emits: ["valid", "update:modelValue", "blur", "focus"],
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
    datetimeOptions: Object,
    hideErrors: Boolean,
    optionsValuePath: { type: String, default: "value" },
    optionsLabelPath: { type: String, default: "label" },
    options: [Array, Object],
    rootAttrs: Object,
  },
  created() {
    if (this.isDatetime) require("vue3-date-time-picker/dist/main.css");
  },
  mounted() {
    this.uniqueId = `${this.$options.__scopeId}-${this.uniqueIndex}`;
    this.uniqueIndex += 1;
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
      formattedDateInput: "",
      uniqueIndex,
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
    value() {
      if (this.isDatetime) setTimeout(this.errorHandler);
      else this.errorHandler();
    },
    dateInput(val) {
      const formatter =
        this.datetimeOptions?.format || this.element.datetimeFormat;
      if (this.type === "month") val.month = val.month + 1;
      this.formattedDateInput = this.value =
        formatter?.(val, this.datetimeAttrs?.locale) ?? val;
      this.$refs.datepicker?.closeMenu();
      this.onInput();
    },
  },
  methods: {
    onInput() {
      if (this.lastError === this.errorMessage) this.lastError = "";

      if (this.isDatetime) {
        // case: datetime
        this.value = this.formattedDateInput;
        this.output = this.dateInput;
      } else {
        const value = this.$refs.input[this.element.targetValueProperty];
        this.value = this.output =
          // case: number and range
          (this.type === "range" || this.type === "number") && isNaN(value)
            ? undefined
            : value;
      }

      // case: text with options
      if (this.type === "text" && this.hasOptions) {
        const selected = this.normalizedOptions.find(
          (el) => this.resolveLabel(el) === this.value
        );
        if (selected) {
          this.output = this.resolveValue(selected);
          this.$emit("update:modelValue", this.output);
        }

        // case: default
      } else this.$emit("update:modelValue", this.output);
    },
    onFocus() {
      this.$emit("focus");
      if (!this.isDatetime) return;
      this.$refs.datepicker?.openMenu();
    },
    onBlur(from) {
      if (this.isDatetime && from === "input") {
        setTimeout(() => {
          const inputWrapper = this.$refs.inputWrapper;
          const dpFocused = inputWrapper.contains(focusElement);
          if (!dpFocused) this.$refs.datepicker?.closeMenu();
        });
        return;
      }
      this.$refs.datepicker?.closeMenu();
      this.wasBlurred = true;
      this.$emit("blur", undefined);
    },
    onKeydown(e) {
      if (!this.isDatetime) return;
      if (e.keyCode != 9) e.preventDefault();
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
  },
  computed: {
    element: (vm) => sntInputElements[vm.type] || "text",
    inputAttrs() {
      let attrs = { ...this.$attrs };
      if (this.element.component === "input") attrs.type = this.element.type;
      return attrs;
    },
    datetimeAttrs() {
      const dtAttrs = {
        ...this.element.attrs,
        ...this.$props.datetimeOptions,
      };
      return dtAttrs;
    },
    normalizedOptions() {
      return !this.options
        ? []
        : Array.isArray(this.options)
        ? this.options
        : typeof this.options === "object"
        ? Object.entries(this.options).reduce((a, [value, label]) => {
            a.push({ label, value });
            return a;
          }, [])
        : [];
    },
    hasOptions: (vm) => !!vm.normalizedOptions.length,
    hasLabel: (vm) => vm.$slots.label || vm.label,
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
    isDatetime: (vm) => ["date", "time", "month"].includes(vm.type),
    listId: (vm) => `snt-list-${vm.uniqueId}`,
    datepicker() {
      return this.isDatetime
        ? defineAsyncComponent(() => import("vue3-date-time-picker"))
        : undefined;
    },
  },
};
</script>

<style scoped lang="scss">
.snt-datepicker-input {
  caret-color: transparent;
}
.snt-input-label__block {
  &:deep() > * + * {
    margin-block-start: var(--snt-inputfield-label-block-margin);
  }
}
.snt-input-label__inline {
  display: inline-flex;
  align-items: center;
  &:deep() > * + * {
    margin-inline-start: var(--snt-inputfield-label-inline-margin);
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
