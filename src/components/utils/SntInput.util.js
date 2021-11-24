// import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";

export const rootAttributeSplitter = (attributeMap = {}) => {
  const _attributeMap = Object.entries(attributeMap);
  return {
    rootAttrs: (vm) =>
      _attributeMap.reduce((a, [prop, mappedProp]) => {
        const value = vm.$attrs[prop];
        if (value) a[mappedProp] = value;
        return a;
      }, {}),
    elementAttrs: (vm) => {
      const attributes = { ...vm.$attrs };
      _attributeMap.forEach(([prop]) => delete attributes[prop]);
      return attributes;
    },
  };
};

let uniqueIdCounter = 0;
export const getUniqueId = (string) => `${string}-${uniqueIdCounter++}`;

const twoDigitFormat = (num) => ("0" + num).slice(-2);

export const htmlErrors = {
  // customError: false,
  badInput: "Bad input value.",
  patternMismatch: "Value is not allowed.",
  rangeOverflow: "Value is larger than allowed.",
  rangeUnderflow: "Value is smaller than allowed.",
  stepMismatch: "Input step mismatch.",
  tooLong: "Value is too long.",
  tooShort: "Value is too short.",
  typeMismatch: "Value is of wrong type.",
  valueMissing: "Value is missing.",
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
    targetValueProperty: "value",
  },
  email: {
    type: "email",
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  password: {
    type: "password",
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  search: {
    type: "search",
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  number: {
    type: "number",
    component: "input",
    defaultValue: undefined,
    targetValueProperty: "valueAsNumber",
  },
  tel: {
    type: "tel",
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  color: {
    type: "color",
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  url: {
    type: "url",
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  checkbox: {
    type: "checkbox",
    component: "input",
    defaultValue: "",
    targetValueProperty: "checked",
  },
  radio: {
    type: "radio",
    component: "input",
    defaultValue: "",
    targetValueProperty: "checked",
  },
  range: {
    type: "range",
    component: "input",
    defaultValue: undefined,
    targetValueProperty: "valueAsNumber",
  },
  file: {
    type: "file",
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  textarea: {
    type: "textarea",
    component: "textarea",
    defaultValue: "",
    targetValueProperty: "value",
  },
  select: {
    type: "select",
    component: "select",
    defaultValue: "",
    targetValueProperty: "value",
  },
  date: {
    type: "text",
    component: "input",
    datetimeParser: (val) => val.toISOString().slice(0, 10),
    defaultValue: "",
    targetValueProperty: "value",
  },
  time: {
    type: "text",
    component: "input",
    datetimeParser: (val) =>
      `${twoDigitFormat(val.hours)}:${twoDigitFormat(val.minutes)}`,
    defaultValue: "",
    targetValueProperty: "value",
    attrs: {
      timePicker: true,
    },
  },
  month: {
    type: "text",
    component: "input",
    datetimeParser: (val) => `${val.year}-${twoDigitFormat(val.month + 1)}`,
    defaultValue: "",
    targetValueProperty: "value",
    attrs: {
      monthPicker: true,
    },
  },
};

export const sntInputTypes = Object.keys(sntInputElements);
