<template>
  <div
    v-bind="rootAttrs"
    :class="rootClass"
    :style="rootStyle"
    class="snt-input-root"
  >
    <label ref="inputRoot" :class="labelClass" tabindex="-1">
      <!-- label slot #before -->
      <slot v-if="hasLabel && labelPlacement.start" name="label">
        <p :class="labelTextClass" :title="labelTextTitle">
          {{ label }}
        </p>
      </slot>
      <component
        :is="config.component"
        ref="input"
        :checked="!!value"
        class="snt-input"
        :data-type="type"
        :list="`snt-list-${uniqueId}`"
        :value="value"
        v-bind="inputAttrs"
        :readonly="isDatetime"
        @blur.stop="(e) => onBlur('input', e)"
        @click="onClick"
        @focus="onFocus"
        @input="(e) => onInternalChange(e)"
        @keydown="onKeydown"
      >
        <option v-if="inputAttrs.placeholder" value="" selected disabled hidden>
          {{ inputAttrs.placeholder }}
        </option>
        <option
          v-for="{ label, value } in parsedOptions"
          :key="value"
          :value="value"
        >
          {{ label }}
        </option>
      </component>
      <!-- label slot #after -->
      <slot v-if="hasLabel && labelPlacement.end" name="label">
        <p :class="labelTextClass" :title="labelTextTitle">{{ label }}</p>
      </slot>
      <!-- datalist for text input with options -->
      <datalist
        v-if="type === 'text' && parsedOptions.length"
        :id="`snt-list-${uniqueId}`"
      >
        <option v-for="{ label, value } in parsedOptions" :key="value">
          {{ label }}
        </option>
      </datalist>
      <!-- datepicker component -->
      <component
        :is="datepickerComponent"
        v-show="false"
        v-if="isDatetime"
        ref="datepicker"
        v-bind="datetimeAttrs"
        v-model="dateValue"
        style="position: absolute"
        @update:modelValue="
          (v) => {
            onInternalChange(v);
            $refs.input.focus();
          }
        "
        @closed="onBlur('datepicker')"
      />
    </label>
    <p v-if="help" class="snt-input-info-help">{{ help }}</p>
    <transition v-if="!disableErrors" name="snt-input-info-error-animation">
      <p v-if="showError" class="snt-input-info-error">{{ errorMessage }}</p>
    </transition>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "@vue/runtime-core";
import {
  htmlErrorKeys,
  htmlErrors,
  sntInputElements,
  sntInputTypes,
} from "./SntInput.internals.js";

const uniqueIndex = ref(0);
let focusElement = undefined;
document.addEventListener("focusin", (e) => (focusElement = e.target));
const resolvePath = (object, path) =>
  path.split(".").reduce((a, c) => {
    if (a[c] === undefined)
      throw new Error(
        `[SntInput] Failed to resolve path '${path}' for input option element.`
      );
    return a[c];
  }, object);

export default {
  name: "TestInput",
  inheritAttrs: false,
  emits: ["valid", "update:modelValue", "blur", "focus", "select", "input"],
  props: {
    /**
     * Preferred way to bind data. E.g. :model="{ field: form }" where form.field is defined in data. Will autogenerate validation flag under 'form._valid.field'.
     */
    model: Object,
    /**
     * Input type - defaults to text.
     */
    type: {
      type: String,
      default: "text",
      validator: (value) => sntInputTypes.includes(value),
    },
    /**
     * Input validation function. Should return:
     * [true] - field is valid;
     * [false] - field is invalid;
     * [string] - field is invalid, shows string as error.
     */
    validator: { type: Function },
    /**
     * Input field label text.
     */
    label: String,
    /**
     * Space delimited string defining direction and placement of label.
     * Valid values: block/inline, start/end. Ex. 'block end'
     */
    labelPosition: {
      type: String,
      validator: (value) => {
        const params = value.split(" ");
        const allowed = ["block", "inline", "start", "end"];
        return params.every((param) => allowed.includes(param));
      },
    },
    /**
     * Input field help text.
     */
    help: String,
    /**
     * Custom error message.
     */
    error: String,
    /**
     * Disable showing errors.
     */
    disableErrors: Boolean,
    /**
     * A list of options for text or select inputs, or a function that returns options. Don't forget to set optionId and optionLabel.
     */
    options: [Array, Object, Function],
    /**
     * Dot delimited path to id, or function that resolves object id.
     */
    optionId: { type: [String, Function], default: "id" },
    /**
     * Dot delimited path to label, or function that resolves object label.
     */
    optionLabel: { type: [String, Function], default: "label" },
    /**
     * Recalculates options based on input.
     */
    watchOptions: Boolean,
    /**
     * Enforce validation based on provided options.
     */
    strictOptions: { type: Boolean, default: true },
    /**
     * Attributes that will be applied to the root element.
     */
    rootAttrs: Object,
    /**
     * Classes that will be applied to the the root element.
     */
    rootClass: [Object, String],
    /**
     * Styles that will be applied to the root element.
     */
    rootStyle: [Object, String],
    /**
     * Options passed to datetime component ("vue3-date-time-picker": "^2.3.6").
     * Please refer to https://vue3datepicker.com/api/props for available options.
     */
    datetimeOptions: Object,
    /**
     * Prefer using 'model' over 'v-bind' to bind data when you need to include validation.
     */
    modelValue: {
      default: "",
    },
  },
  created() {
    if (this.isDatetime) require("vue3-date-time-picker/dist/main.css");
    if (typeof this.options === "function") {
      this.recalculateOptions();
      if (this.watchOptions)
        this.$watch("value", (value) => this.recalculateOptions(value));
      this.internalOptions = this.options();
    } else this.internalOptions = this.options;
  },
  mounted() {
    this.$watch(
      this.extModel ? `extModel.form.${this.extModel.prop}` : "modelValue",
      (model) => {
        this.onExternalChange(model);
        if (this.extModel) this.output = model;
      },
      { immediate: true }
    );

    this.$watch(
      (vm) => [vm.value, vm.output, vm.wasBlurred],
      this.errorHandler,
      { immediate: true }
    );

    if (this.extModel)
      this.$watch(
        "output",
        (output) => (this.extModel.form[this.extModel.prop] = output)
      );
  },
  data() {
    return {
      value: "",
      dateValue: "",
      output: "",
      uniqueId: `${this.$options.__scopeId}-${uniqueIndex.value++}`,
      internalOptions: undefined,
      wasBlurred: false,
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
  },
  methods: {
    onInternalChange(input) {
      if (this.lastError === this.errorMessage) this.lastError = "";
      this.config.onInternal(this, input);
      this.$emit("update:modelValue", this.output);
      this.$emit("input", this.value);
    },
    onExternalChange(model) {
      this.config.onExternal(this, model);
      this.$refs.input.value = this.value;
    },
    errorHandler() {
      const err = this.getError();
      this.errorMessage = err.message;
      if (this.extModel) {
        if (!this.extModel.form._valid) this.extModel.form._valid = {};
        this.extModel.form._valid[this.extModel.prop] = err.isValid;
      }
      return err.isValid;
    },
    getError() {
      const propV = this.validator;
      let htmlV = this.$refs?.input?.validity;

      let isValid = true;
      let message = undefined;

      if (propV && typeof propV === "function") {
        const state = propV(this.output);
        isValid = state === true;
        message = typeof state === "string" ? state : undefined;
        if (!isValid) return { isValid, message };
      }

      if (this.strictOptions && this.parsedOptions.length && this.output) {
        const state =
          this.parsedOptions.some(({ id }) => id === this.output) ||
          this.$t("forms.html-error-type-mismatch");
        isValid = state === true;
        message = typeof state === "string" ? state : undefined;
        if (!isValid) return { isValid, message };
      }

      if (htmlV) {
        if (this.isDatetime && this.inputAttrs.required === "" && !this.value) {
          htmlV = { ...htmlV };
          htmlV.valid = false;
          htmlV.valueMissing = true;
        }
        isValid = htmlV.valid;
        const key = htmlErrorKeys.find((key) => htmlV[key]);
        const message = key ? htmlErrors[key] : undefined;
        if (!isValid) return { isValid, message };
      }

      return { isValid: true, message: undefined };
    },
    formatDate(value) {
      const formatter = this.datetimeOptions?.format || this.config.format;
      return (
        formatter?.(value, { locale: this.datetimeAttrs?.locale }) ?? value
      );
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
          const inputRoot = this.$refs.inputRoot;
          const dpFocused = inputRoot.contains(focusElement);
          if (!dpFocused) {
            this.wasBlurred = true;
            this.closeDatepicker();
          }
        });
        return;
      } else if (this.isCheckbox && e.relatedTarget === this.$refs.inputRoot)
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
      if (this.isDatetime && (e.key === "Backspace" || e.key === "Delete"))
        this.onInternalChange("");
    },
    resolveBy: (object, by) =>
      typeof by === "function" ? by(object) : resolvePath(object, by),
    recalculateOptions(value) {
      this.internalOptions = this.options(value);
    },
    resolveOption(object) {
      return typeof object !== "object"
        ? { id: object, label: object }
        : {
            id: this.resolveBy(object, this.optionId),
            label: this.resolveBy(object, this.optionLabel),
          };
    },
  },
  computed: {
    isValid() {
      const isValid = this.errorHandler();
      return isValid;
    },
    showError() {
      return !this.disableErrors && this.wasBlurred && this.errorMessage;
    },
    config() {
      return sntInputElements[this.type ?? "text"];
    },
    extModel() {
      if (!this.model || typeof this.model !== "object") return;
      const entries = Object.entries(this.model);
      if (entries.length > 1)
        throw new Error(
          "[SntInput] model object should have only one key-value pair."
        );
      const [prop, form] = entries[0];
      return {
        form,
        prop,
      };
    },
    inputAttrs() {
      let attrs = { ...this.$attrs };
      if (this.config.component === "input") attrs.type = this.config.type;
      return attrs;
    },
    datetimeAttrs() {
      const dtAttrs = {
        ...this.config.datetimeOptions,
        ...this.$props.datetimeOptions,
      };
      return dtAttrs;
    },
    parsedOptions() {
      const options = this.internalOptions;
      return !options && (this.type !== "search" || this.type !== "text")
        ? []
        : Array.isArray(options)
        ? options.map((el) => this.resolveOption(el))
        : typeof options === "object"
        ? Object.entries(options).reduce(
            (a, [label, id]) => [
              ...a,
              { [this.optionLabel]: label, [this.optionId]: id },
            ],
            []
          )
        : [];
    },
    hasLabel: (vm) => vm.$slots.label || vm.label,
    labelClass() {
      if (!this.hasLabel) return;
      return this.labelPlacement.inline
        ? "snt-input-label-inline"
        : "snt-input-label-block";
    },
    isRequired() {
      const req = this.inputAttrs.required;
      return req === "" || req === true;
    },
    labelTextClass() {
      if (!this.isRequired) return;
      return "snt-input-label-required";
    },
    labelTextTitle() {
      if (!this.isRequired) return;
      return this.$t("forms.field-is-required");
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
    isDatetime: (vm) =>
      vm.type === "date" || vm.type === "month" || vm.type === "time",
    isCheckbox: (vm) => vm.type === "checkbox" || vm.type === "radio",
    datepickerComponent() {
      return this.isDatetime
        ? defineAsyncComponent(() => import("vue3-date-time-picker"))
        : undefined;
    },
  },
};
</script>
