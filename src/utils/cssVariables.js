import rawVariables from "../styles/variables.scss";
import { deepFreeze } from "./deepFreeze";

export const cssVariables = deepFreeze({
  ...JSON.parse(/{.*}/.exec(rawVariables.cssVariables)[0]),
  ...JSON.parse(/{.*}/.exec(rawVariables.elementVariables)[0]),
});
