<template>
  <div v-bind="rootAttrs" class="snt-input-wrapper">
    <label ref="inputWrapper" :class="labelClass" tabindex="-1">
      <!-- label slot #before -->
      <slot v-if="hasLabel && labelPlacement.start" name="label">
        <p>{{ label }}</p>
      </slot>
      <component
        :is="config.component"
        ref="input"
        :checked="!!value"
        :class="isDatetime && 'snt-datepicker-input'"
        :list="`snt-list-${uniqueId}`"
        :value="value"
        v-bind="inputAttrs"
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
        <p>{{ label }}</p>
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
    <p v-if="help" class="snt-input-help">{{ help }}</p>
    <transition v-if="!disableErrors" name="snt-drop">
      <p
        v-if="!disableErrors && wasBlurred && errorMessage"
        class="snt-input-error"
      >
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
  emits: [
    "valid",
    "update:modelValue",
    "blur",
    "focus",
    "select",
    "inputValue",
  ],
  props: {
    /**
     * Advanced way to bind a model. Ex. :model="{ field: form }" where form.field is defined in data.
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
     * Input field help text.
     */
    help: String,
    /**
     * Custom error message.
     */
    error: String,
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
     * Options passed to datetime component ("vue3-date-time-picker": "^2.3.6").
     * Please refer to https://vue3datepicker.com/api/props for available options.
     */
    datetimeOptions: Object,
    /**
     * Disable showing errors.
     */
    disableErrors: Boolean,
    /**
     * Dot delimited path to id, or function that resolves object id.
     */
    optionIdBy: { type: [String, Function], default: "id" },
    /**
     * Dot delimited path to label, or function that resolves object label.
     */
    optionLabelBy: { type: [String, Function], default: "label" },
    /**
     * A list of options for text or select inputs. Don't forget to set optionIdBy and optionLabelBy.
     */
    options: [Array, Object],
    /**
     * Attributes that will be applied affect the root element of snt-input component.
     */
    rootAttrs: Object,
    /**
     * **IS USED INTERNALLY. Prefer using 'v-model' instead of modelValue.
     */
    modelValue: {},
  },
  created() {
    if (this.isDatetime) require("vue3-date-time-picker/dist/main.css");
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
      this.$emit("inputValue", this.value);
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
      const htmlV = this.$refs?.input?.validity;

      let isValid = true;
      let message = undefined;

      if (propV && typeof propV === "function") {
        const state = propV(this.output);
        isValid = state === true;
        message = typeof state === "string" ? state : undefined;
        if (!isValid) return { isValid, message };
      }

      if (htmlV) {
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

    resolveBy: (object, by) =>
      typeof by === "function" ? by(object) : resolvePath(object, by),
    resolveOption(object) {
      return typeof object !== "object"
        ? { id: object, label: object }
        : {
            id: this.resolveBy(object, this.optionIdBy),
            label: this.resolveBy(object, this.optionLabelBy),
          };
    },
  },
  computed: {
    isValid() {
      const isValid = this.errorHandler();
      return isValid;
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
      return !this.options && (this.type !== "search" || this.type !== "text")
        ? []
        : Array.isArray(this.options)
        ? this.options.map((el) => this.resolveOption(el))
        : typeof this.options === "object"
        ? Object.entries(this.options).reduce(
            (a, [label, id]) => [...a, { label, id }],
            []
          )
        : [];
    },
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
  background: #f8f8f8;
  width: 100%;
}
</style>
