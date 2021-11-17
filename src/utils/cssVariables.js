import { rawCssVariables } from "../styles/core/generics/variables.scss";
import { deepFreeze } from "./deepFreeze";

export const getPropertyValue = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name);

export const cssVariables = deepFreeze(
  JSON.parse(/{.*}/.exec(rawCssVariables)[0])
);
