<!-- 
  Types date, month & time are implemented via external plugin ("vue3-date-time-picker": "^2.3.6").
  For a complete list of properties (datetimeOptions), refer to https://vue3datepicker.com/api/props
 -->
<template>
  <div v-bind="rootAttrs" class="snt-input-wrapper">
    <label ref="inputWrapper" :class="labelClass" tabindex="-1">
      <!-- label slot #before -->
      <slot v-if="hasLabel && labelPlacement.start" name="label">
        <p>{{ label }}</p>
      </slot>
      <component
        :is="element.component"
        ref="input"
        :list="listId"
        :value="value"
        :checked="!!value"
        v-bind="inputAttrs"
        :class="isDatetime && 'snt-datepicker-input'"
        @blur.stop="(e) => onBlur('input', e)"
        @keydown="onKeydown"
        @focus="onFocus"
        @click="onClick"
        @input="(e) => onInternalChange(e.target.value)"
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
      <!-- datalist for text input with options -->
      <datalist v-if="isTextWithOptions" :id="listId">
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
        v-model="dateValue"
        style="position: absolute"
        @update:modelValue="this.$refs.input.focus()"
        @closed="onBlur('datepicker')"
      />
    </label>
    <p v-if="help" class="snt-input-help">{{ help }}</p>
    <transition v-if="!hideErrors && wasBlurred" name="snt-drop">
      <p v-if="errorMessage" class="snt-input-error">
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
    modelValue: {},
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
    this.$watch(
      "modelValue",
      (model) => {
        if (this.output !== this.modelValue) this.onExternalChange(model);
        this.errorHandler(model);
      },
      { immediate: true }
    );
  },
  data() {
    return {
      value: "",
      dateValue: "",
      output: "",
      uniqueId: `${this.$options.__scopeId}-${uniqueIndex.value++}`,
      wasBlurred: false,
      isValid: false,
      lastError: "",
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
    dateValue() {
      const value =
        this.type !== "date"
          ? this.dateValue
          : Array.isArray(this.dateValue)
          ? [...this.dateValue].map((el) => el.toISOString())
          : this.dateValue.toISOString();

      this.$refs.datepicker?.closeMenu();

      this.onInternalChange(value);
    },
  },
  methods: {
    onInternalChange(value) {
      if (this.lastError === this.errorMessage) this.lastError = "";

      this.value = value;

      if (this.isDatetime) {
        this.value = this.formatDate(value);
        this.output = value;
      } else if (this.isNumber) {
        this.output = isNaN(Number(this.value))
          ? undefined
          : Number(this.value);
      } else if (this.type === "select") {
        this.output = Number(this.value);
      } else if (this.isTextWithOptions) {
        const selected = this.normalizedOptions.find(
          (el) => this.resolveLabel(el) === this.value
        );
        this.output = selected ? this.resolveValue(selected) : value;
      } else if (this.isCheckbox) {
        this.output = this.$refs.input.checked;
      } else this.output = this.value;

      // this.isDatepickerOpen = false;
      this.$emit("update:modelValue", this.output);
    },
    onExternalChange(model) {
      if (this.isDatetime) {
        this.value = this.formatDate(model);
        this.dateValue =
          this.type === "date"
            ? Array.isArray(model)
              ? [...model].map((el) => new Date(el))
              : new Date(model)
            : model;
      } else if (this.isTextWithOptions) {
        const selected = this.normalizedOptions.find(
          (el) => this.resolveValue(el) === model
        );
        if (selected) this.value = this.resolveLabel(selected);
      } else if (this.isCheckbox) {
        this.value = model;
        this.$refs.input.checked = model;
      } else this.value = model;

      this.$refs.input.value = this.value;
    },
    formatDate(value) {
      const formatter = this.datetimeOptions?.format || this.element.format;
      return formatter?.(value, this.datetimeAttrs?.locale) ?? value;
    },
    onClick() {
      this.openDatepicker();
    },
    onFocus() {
      this.$emit("focus");
      if (this.isDatetime) this.openDatepicker();
    },
    onBlur(from, e) {
      if (this.isDatetime && from === "input") {
        setTimeout(() => {
          const inputWrapper = this.$refs.inputWrapper;
          const dpFocused = inputWrapper.contains(focusElement);
          if (!dpFocused) {
            this.wasBlurred = true;
            this.closeDatepicker();
          }
        });
        return;
      } else if (this.isCheckbox && e.relatedTarget === this.$refs.inputWrapper)
        return;

      this.closeDatepicker();
      this.wasBlurred = true;
      this.$emit("blur", undefined);
    },
    openDatepicker() {
      if (this.isDatepickerOpen) return;
      this.isDatepickerOpen = true;
      this.$refs.datepicker?.openMenu();
    },
    closeDatepicker() {
      this.isDatepickerOpen = false;
      this.$refs.datepicker?.closeMenu();
    },
    onKeydown(e) {
      if (this.isDatetime && e.keyCode != 9) e.preventDefault();
    },
    errorHandler() {
      const err = this.getError();
      this.isValid = err.isValid;
      if (!this.lastError || this.lastError !== this.errorMessage)
        this.errorMessage = err.message;
    },
    getError() {
      const validation = (() => {
        const state = this.validator(this.modelValue);
        const isValid = state === true;
        const message = typeof state === "string" ? state : undefined;
        return { isValid, message };
      })();
      const html = (() => {
        const validity = this.$refs.input.validity;
        const isValid = validity.valid;
        const key = htmlErrorKeys.find((key) => validity[key]);
        const message = key ? htmlErrors[key] : undefined;
        return { isValid, message };
      })();
      return {
        isValid: validation.isValid && html.isValid,
        message: validation.message || html.message,
      };
    },
    resolveLabel(object) {
      return this.optionsLabelPath.split(".").reduce((a, c) => a[c], object);
    },
    resolveValue(object) {
      return this.optionsValuePath.split(".").reduce((a, c) => a[c], object);
    },
    calculateValueFromModel(model) {
      let value = "";
      if (this.isDatetime) value = this.formatDate(model);
      else if (this.isTextWithOptions) {
        const selected = this.options.find(
          (el) => this.resolveValue(el) === model
        );
        if (selected) value = this.resolveLabel(selected);
      } else {
        value = model;
      }

      return value;
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
      const pos = this.labelPosition
        ? this.labelPosition
        : this.isCheckbox
        ? "inline end"
        : "block start";
      const block = !pos.includes("inline");
      const start = !pos.includes("end");
      return { block, inline: !block, start, end: !start };
    },
    isNumber: (vm) => vm.type === "range" || vm.type === "number",
    isDatetime: (vm) =>
      vm.type === "date" || vm.type === "month" || vm.type === "time",
    isCheckbox: (vm) => vm.type === "checkbox" || vm.type === "radio",
    isTextWithOptions: (vm) =>
      vm.type === "text" && vm.normalizedOptions.length,
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
.snt-input-wrapper {
  & > *:nth-child(2) {
    margin-top: 3px;
  }
  & > *:nth-child(3) {
    margin-top: 2px;
  }
}
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
