export function deepFreeze(object) {
  Object.freeze(object);
  if (object === undefined) {
    return object;
  }

  Object.getOwnPropertyNames(object).forEach(function (prop) {
    if (
      object[prop] !== null &&
      (typeof object[prop] === "object" ||
        typeof object[prop] === "function") &&
      !Object.isFrozen(object[prop])
    ) {
      deepFreeze(object[prop]);
    }
  });

  return object;
}
