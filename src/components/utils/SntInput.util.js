import { formatDate, getTwoDigitFormat } from "../../utils/datetime";

export const htmlErrors = {
  // customError: false,
  badInput: "Bad input value.",
  patternMismatch: "Value is not allowed.",
  rangeOverflow: "Value is larger than allowed.",
  rangeUnderflow: "Value is smaller than allowed.",
  stepMismatch: "Input step mismatch.",
  tooLong: "Value is too long.",
  tooShort: "Value is too short.",
  typeMismatch: "Please provide a valid value.",
  valueMissing: "This field is required.",
};
export const htmlErrorKeys = Object.keys(htmlErrors);

export const normalizedOptions = (vm) =>
  !vm.options
    ? []
    : Array.isArray(vm.options)
    ? vm.options
    : typeof vm.options === "object"
    ? Object.entries(vm.options).reduce((a, [value, label]) => {
        a.push({ label, value });
        return a;
      }, [])
    : [];

export const sntInputElements = {
  text: {
    type: "text",
    component: "input",
    defaultValue: "",
  },
  email: {
    type: "email",
    component: "input",
    defaultValue: "",
  },
  password: {
    type: "password",
    component: "input",
    defaultValue: "",
  },
  search: {
    type: "search",
    component: "input",
    defaultValue: "",
  },
  number: {
    type: "number",
    component: "input",
    defaultValue: undefined,
  },
  tel: {
    type: "tel",
    component: "input",
    defaultValue: "",
  },
  color: {
    type: "color",
    component: "input",
    defaultValue: "",
  },
  url: {
    type: "url",
    component: "input",
    defaultValue: "",
  },
  checkbox: {
    type: "checkbox",
    component: "input",
    defaultValue: "",
  },
  radio: {
    type: "radio",
    component: "input",
    defaultValue: "",
  },
  range: {
    type: "range",
    component: "input",
    defaultValue: undefined,
  },
  file: {
    type: "file",
    component: "input",
    defaultValue: "",
  },
  textarea: {
    type: "textarea",
    component: "textarea",
    defaultValue: "",
  },
  select: {
    type: "select",
    component: "select",
    defaultValue: "",
  },
  date: {
    type: "text",
    component: "input",
    format: (model, locale) => {
      const isRange = Array.isArray(model);
      const formatter = (input) => {
        const fmt = formatDate(input, locale);
        return `${fmt.dayShort}, ${fmt.day} ${fmt.monthShort} ${fmt.year}`;
      };

      return isRange
        ? [...model].map((el) => formatter(el)).join(" - ")
        : formatter(model);
    },
    defaultValue: "",
    attrs: {
      locale: "en",
      autoApply: true,
      maxlength: 0,
      enableTimePicker: false,
    },
  },
  time: {
    type: "text",
    component: "input",
    format: (model) =>
      `${getTwoDigitFormat(model.hours)}:${getTwoDigitFormat(model.minutes)}`,
    defaultValue: "",
    attrs: {
      timePicker: true,
      maxlength: 0,
    },
  },
  month: {
    type: "text",
    component: "input",
    format: (model) => `${model.year}-${getTwoDigitFormat(model.month + 1)}`,
    defaultValue: "",
    attrs: {
      autoApply: true,
      monthPicker: true,
      maxlength: 0,
    },
  },
};

export const sntInputTypes = Object.keys(sntInputElements);
