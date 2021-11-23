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

export const htmlErrors = {
  // customError: false,
  badInput: "Bad input value.",
  patternMismatch: "Value not allowed.",
  rangeOverflow: "Value is larger than allowed.",
  rangeUnderflow: "Value is smaller than allowed.",
  stepMismatch: "Step mismatch.",
  tooLong: "Value is too long",
  tooShort: "Value is too short.",
  typeMismatch: "Value type mismatch.",
  valueMissing: "Value is required.",
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

export const componentMap = {
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
    defaultValue: "",
    targetValueProperty: "value",
  },
  time: {
    component: "input",
    defaultValue: "",
    targetValueProperty: "value",
  },
};

export const componentTypes = Object.keys(componentMap);
