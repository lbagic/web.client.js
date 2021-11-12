import rawCssVariables from "../styles/core/generics/variables.scss";
import { deepFreeze } from "./deepFreeze";

export const cssVariables = deepFreeze(
  JSON.parse(/{.*}/.exec(rawCssVariables.cssVariables)[0])
);
