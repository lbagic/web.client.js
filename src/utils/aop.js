const getMethodNames = (object) =>
  Object.getOwnPropertyNames(object).filter(
    (key) => typeof object[key] === "function"
  );

const replaceMethod = (target, aspect, advice) => (methodName) => {
  const method = target[methodName];
  target[methodName] = (...args) => {
    if ("beforeExecuting" === advice)
      return aspect.apply(target, [method, ...args]);
    if (["before", "around"].includes(advice)) aspect.apply(target, args);
    const returnValue = method.apply(target, args);
    if (["after", "around"].includes(advice)) aspect.apply(target, args);
    if ("afterReturning" === advice) return aspect.apply(target, [returnValue]);
    return returnValue;
  };
};

const validateArguments = (target, aspect, method) => {
  if (typeof target !== "object")
    throw new Error("Provided aspect is not a function.");
  if (typeof aspect !== "function")
    throw new Error("Provided target is not an object.");
  if (method && (typeof method !== "string" || !Array.isArray(method)))
    throw new Error(
      "Provided method is not a string or array of method names."
    );
};

const inject =
  (advice) =>
  (target, aspect, methodNames = null) => {
    validateArguments(target, aspect, methodNames);

    const names = !methodNames
      ? getMethodNames(target)
      : Array.isArray(methodNames)
      ? methodNames
      : [methodNames];
    names.forEach(replaceMethod(target, aspect, advice));
  };

export const aop = {
  injectBefore: inject("before"),
  injectAfter: inject("after"),
  injectAround: inject("around"),
  injectAfterReturning: inject("afterReturning"),
  injectBeforeExecuting: inject("beforeExecuting"),
};
