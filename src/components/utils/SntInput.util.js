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
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  email: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  password: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  search: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  number: {
    component: "input",
    defaultValue: undefined,
    targetValueProperty: "valueAsNumber",
  },
  tel: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  color: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  url: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  checkbox: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "checked",
  },
  radio: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "checked",
  },
  range: {
    component: "input",
    defaultValue: undefined,
    targetValueProperty: "valueAsNumber",
  },
  file: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
  textarea: {
    component: "textarea",
    defaultValue: "",
    targetValueProperty: "value",
  },
  select: {
    component: "select",
    defaultValue: "",
    targetValueProperty: "value",
  },
  date: {
    component: "input",
    datetimeParser: (val) => val.toISOString().slice(0, 10),
    defaultValue: "",
    targetValueProperty: "value",
  },
  time: {
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
