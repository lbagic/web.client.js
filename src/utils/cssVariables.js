import rawCssVariables from "../styles/variables/variables.scss";
import { deepFreeze } from "./deepFreeze";

export const cssVariables = deepFreeze(
  JSON.parse(/{.*}/.exec(rawCssVariables.cssVariables)[0])
);
