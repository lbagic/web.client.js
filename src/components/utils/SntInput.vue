<script>
// <template>
//   <div v-bind="rootAttrs">
//     <label>
//       <slot name="label">
//         <p>{{ label }}</p>
//       </slot>
//       <div style="display: flex">
//         <component
//           :is="element.component"
//           v-bind="inputAttrs"
//           ref="input"
//           :value="value"
//           :list="uniqueId + '-list'"
//           @input="onInput"
//           @blur="this.wasBlurred = true"
//         >
//           <option
//             v-for="(opt, index) in normalizedOptions"
//             :key="index"
//             :value="resolveValue(opt)"
//           >
//             {{ resolveLabel(opt) }}
//           </option>
//         </component>
//         <datalist
//           v-if="type === 'text' && hasOptions"
//           :id="uniqueId + '-list'"
//           ref="datalist"
//         >
//           <option v-for="(opt, index) in normalizedOptions" :key="index">
//             {{ resolveLabel(opt) }}
//           </option>
//         </datalist>
//       </div>
//     </label>
//     <p v-if="help" class="snt-input-help">{{ help }}</p>
//     <p v-if="!hideErrors && wasBlurred && errorMessage" class="snt-input-error">
//       {{ errorMessage }}
//     </p>
//   </div>
// </template>
import { h } from "@vue/runtime-core";
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
  render() {
    const wrapperChildren = [];
    const labelChildren = [];
    const inputWrapChildren = [];
    const labelSlot =
      this.$slots.label || this.label
        ? this.$slots.label?.() ?? this.label
        : undefined;

    if (this.type === "checkbox") console.log(labelSlot);
    // attach label before
    if (labelSlot && this.labelPosition.includes("start"))
      labelChildren.push(labelSlot);

    // input wrapper with children

    let selectOptionList = [];
    if (this.type === "select" && this.hasOptions) {
      selectOptionList = this.normalizedOptions.map((opt, index) =>
        h(
          "option",
          { key: index, value: this.resolveValue(opt) },
          this.resolveLabel(opt)
        )
      );
    }
    console.log(this.type === "text" && this.inputAttrs);
    const inputElementConfig = {
      onInput: this.onInput,
      onBlur: () => (this.wasBlurred = true),
      ...this.inputAttrs,
      ref: "input",
      value: this.value,
    };
    if (this.type === "text" && this.hasOptions)
      inputElementConfig.list = this.uniqueId + "-list";

    const inputElement = h(
      this.element.component,
      inputElementConfig,
      selectOptionList
    );

    inputWrapChildren.push(inputElement);

    if (this.type === "text" && this.hasOptions) {
      const inputOptionList = this.normalizedOptions.map((opt, index) =>
        h("option", { key: index }, this.resolveLabel(opt))
      );

      const inputDatalistElement = h(
        "datalist",
        { id: `${this.uniqueId}-list` },
        inputOptionList
      );

      inputWrapChildren.push(inputDatalistElement);
    }

    const inputWrapper = h(
      "div",
      { style: "display: flex" },
      inputWrapChildren
    );

    labelChildren.push(inputWrapper);

    // attach label after
    if (labelSlot && this.labelPosition.includes("end"))
      labelChildren.push(labelSlot);

    const label = h("label", labelChildren);
    wrapperChildren.push(label);

    // attach help
    if (this.help) {
      const help = h("p", { class: "snt-input-help" }, this.help);
      wrapperChildren.push(help);
    }

    // attach errors
    if (!this.hideErrors && this.wasBlurred && this.errorMessage) {
      const error = h("p", { class: "snt-input-error" }, this.errorMessage);
      wrapperChildren.push(error);
    }
    const wrapper = h("div", this.rootAttrs, wrapperChildren);
    return wrapper;
  },
  name: "TestInput",
  inheritAttrs: false,
  emits: ["valid"],
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => componentTypes.includes(value),
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
      default: "block start",
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
    hasOptions() {
      return !!this.normalizedOptions.length;
    },
  },
};
</script>

<style scoped lang="scss">
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

// label {
// display: inline-flex;
// flex-direction: row-reverse;
// align-items: center;
// vertical-align: middle;
// }
</style>
