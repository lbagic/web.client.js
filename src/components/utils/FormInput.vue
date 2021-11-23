<script>
import Vue from "vue";
import FormInputInfo from "./FormInputInfo.vue";

const isTextField = (type) =>
  [
    "text",
    "number",
    "date",
    "email",
    "password",
    "tel",
    "datetime-local",
    "month",
    "search",
    "time",
    "url",
    "week",
  ].includes(type);

export default {
  name: "FormInput",
  props: {
    type: { type: String, default: "text" },
    validator: { type: Function, default: () => true },
    info: { type: String },
  },
  components: { FormInputInfo },
  created() {},
  mounted() {
    if (this.type !== "checkbox") {
      const InfoComponent = Vue.extend(FormInputInfo);
      this.infoInstance = new InfoComponent();
      this.infoInstance.$mount();
      this.$el.insertAdjacentElement("afterend", this.infoInstance.$el);
      this.infoInstance.info = this.info;
    }
    this.htmlValid = this.$el.validity.valid;
    this.value = this.$el.value;
  },
  data() {
    return {
      infoInstance: undefined,
      value: undefined,
      wasFocused: false,
      htmlValid: undefined,
    };
  },
  watch: {
    isValid(x) {
      this.$emit("valid", x);
    },
    errorHandler(flag) {
      if (!this.infoInstance) return;
      if (flag[0]) {
        const errorMessage = this.validator(this.value);
        this.infoInstance.error =
          typeof errorMessage === "string" ? errorMessage : "";
      } else {
        this.infoInstance.error = "";
      }
    },
  },
  computed: {
    isValid() {
      let valid = this.htmlValid;
      if (this.validator) {
        const state = this.validator(this.value);
        let validator = false;
        if (state === undefined) validator = false;
        else if (typeof state === "string") validator = false;
        else if (typeof state === "boolean") validator = state;
        valid = valid && validator;
      }
      return valid;
    },
    showError() {
      return this.wasFocused && !this.isValid;
    },
    errorHandler() {
      return [this.showError, this.value];
    },
    element() {
      const elementMap = { textarea: "textarea" };
      return elementMap[this.type] || "input";
    },
    classes() {
      const classes = ["x-base"];
      if (this.showError && isTextField(this.type)) classes.push("x-error");
      if (isTextField(this.type)) classes.push("x-border");
      return classes;
    },
    datePlaceholder() {
      return {
        date: "yyyy-mm-dd",
        month: "yyyy-mm",
      }[this.type];
    },
    componentAttrs() {
      const attrs = { ...this.$props };
      if (this.datePlaceholder) attrs.placeholder = this.datePlaceholder;
      return attrs;
    },
  },
  methods: {
    processValue() {
      let { value } = this.$el;
      if (this.type === "number" || this.type === "range") {
        if (!isNaN(this.$el.valueAsNumber)) value = this.$el.valueAsNumber;
        const { max } = this.$attrs;
        if (max !== undefined && value > max) {
          value = max;
          this.$el.value = max;
        }
      }
      return value;
    },
    handleInput() {
      this.value = this.processValue();
      this.htmlValid = this.$el.validity.valid;
      this.$emit("input", this.value);
    },
  },
  render(el) {
    return el(this.element, {
      attrs: this.componentAttrs,
      on: {
        input: this.handleInput,
        focus: (e) => this.$emit("focus", e),
        blur: () => (this.wasFocused = true),
        click: (e) => this.$emit("click", e),
      },
      class: this.classes,
    });
  },
};
</script>

<style scoped lang="scss">
.x-base {
  transition: var(--transition-default);
  // -webkit-appearance: none;
  width: 100%;
  font-size: 1rem;
  &::placeholder {
    color: var(--color-muted);
  }
}
.x-base:not([type="checkbox"]) {
  -webkit-appearance: none;
}
.x-base[type="checkbox"] {
  width: initial;
}
[type="checkbox"]:focus {
  box-shadow: 0 0 0 2px black;
}
.x-border {
  padding: 0.5rem;
  box-shadow: 0 1.1px black;
  &:focus {
    box-shadow: 0 2px black;
  }
}
.x-error {
  box-shadow: 0 1px var(--color-error);
  &:focus {
    box-shadow: 0 2px var(--color-error);
  }
}

// date input
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="month"]::-webkit-calendar-picker-indicator {
  background: no-repeat url("~@/assets/icons/FormInputDatePicker.svg");
  outline: none;
  position: relative;
  top: 6px;
  padding: 0;
}
// number input
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

// range input
$track-color: #000 !default;
// $thumb-color: $color-light !default;
$thumb-color: url("~@/assets/icons/FormInputThumbSlider.svg");

$thumb-radius: 22px !default;
$thumb-height: 43px !default;
$thumb-width: 43px !default;
$thumb-border-width: 0px !default;
$thumb-border-color: #000 !default;

$track-width: 100% !default;
$track-height: 2px !default;
$track-border-width: 0px !default;
$track-border-color: #000 !default;

$track-radius: 5px !default;
$contrast: 5% !default;

$ie-bottom-track-color: darken($track-color, $contrast) !default;

@mixin track {
  cursor: default;
  height: $track-height;
  transition: all 0.2s ease;
  width: $track-width;
}

@mixin thumb {
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  box-sizing: border-box;
  cursor: pointer;
  height: $thumb-height;
  width: $thumb-width;
}

input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
  margin: calc(#{$thumb-height} / 2) 0;
  width: $track-width;

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: 0;

    &::-webkit-slider-runnable-track {
      background: lighten($track-color, $contrast);
    }

    &::-ms-fill-lower {
      background: $track-color;
    }

    &::-ms-fill-upper {
      background: lighten($track-color, $contrast);
    }
  }

  &::-webkit-slider-runnable-track {
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    margin-top: calc(
      (-1 * #{$track-border-width} * 2 + #{$track-height}) / 2 - #{$thumb-height} /
        2
    );
  }

  &::-moz-range-track {
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
    height: calc(#{$track-height} / 2);
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: calc(#{$thumb-height} / 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: $ie-bottom-track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: calc(#{$track-radius} * 2);
  }

  &::-ms-fill-upper {
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: calc(#{$track-radius} * 2);
  }

  &::-ms-thumb {
    @include thumb;
    margin-top: calc(#{$track-height} / 4);
  }

  &:disabled {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb,
    &::-ms-thumb,
    &::-webkit-slider-runnable-track,
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      cursor: default;
    }
  }
}
</style>
