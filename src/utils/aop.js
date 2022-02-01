const getMethodNames = (object) =>
  Object.getOwnPropertyNames(object).filter(
    (key) => typeof object[key] === "function"
  );

const hasProperty = (object, prop) =>
  Object.prototype.hasOwnProperty.call(object, prop);

const hasProperties = (object, methodNames) =>
  methodNames.every((name) => hasProperty(object, name));

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

/**
 * TODO: Description and better type.
 *
 * @param {String} advice Advice where to inject aspect.
 * @return {(target: object, aspect: function, methodNameOrNames?: string|string[]) => undefined}
 */

const inject =
  (advice) =>
  (target, aspect, methodNames = null) => {
    if (Array.isArray(methodNames)) {
      if (!hasProperties(target, methodNames))
        throw new Error("Target does not have provided methods.");
    } else if (typeof methodNames === "string") {
      if (!hasProperty(target, methodNames))
        throw new Error("Target does not have provided method.");
    } else if (!methodNames) {
      if (typeof target !== "object")
        throw new Error("Target is not an object.");
    }
    if (typeof aspect !== "function")
      throw new Error("Provided aspect is not a function.");

    const names = !methodNames
      ? getMethodNames(target)
      : Array.isArray(methodNames)
      ? methodNames
      : [methodNames];

    names.forEach(replaceMethod(target, aspect, advice));
  };

// Concepts from aspect oriented programming
// Enables injecting functions before or after target functions
// Usefull for cross cutting concerns such as logging
export const aop = {
  injectBefore: inject("before"),
  injectAfter: inject("after"),
  injectAround: inject("around"),
  injectAfterReturning: inject("afterReturning"),
  injectBeforeExecuting: inject("beforeExecuting"),
};
