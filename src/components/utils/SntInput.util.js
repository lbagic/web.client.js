import { formatDate, getTwoDigitFormat } from "../../utils/datetime";

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
export const sntInputRefs = {
  focusElement: undefined,
};

let eventListener;
if (!eventListener)
  eventListener = document.addEventListener(
    "focusin",
    (e) => (sntInputRefs.focusElement = e.target)
  );

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
    datetimeFormat: (val, locale) => {
      const { dayShort, day, monthShort, year } = formatDate(val, {
        locale: locale ?? "en",
      });
      return `${dayShort}, ${day} ${monthShort} ${year}`;
    },
    defaultValue: "",
    targetValueProperty: "value",
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
    datetimeFormat: (val) =>
      `${getTwoDigitFormat(val.hours)}:${getTwoDigitFormat(val.minutes)}`,
    defaultValue: "",
    targetValueProperty: "value",
    attrs: {
      timePicker: true,
      maxlength: 0,
    },
  },
  month: {
    type: "text",
    component: "input",
    datetimeFormat: (val) => `${val.year}-${getTwoDigitFormat(val.month)}`,
    defaultValue: "",
    targetValueProperty: "value",
    attrs: {
      autoApply: true,
      monthPicker: true,
      maxlength: 0,
    },
  },
};

export const sntInputTypes = Object.keys(sntInputElements);
