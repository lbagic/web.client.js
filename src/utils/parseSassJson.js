export const parseSassJson = (string) => JSON.parse(/{.*}/.exec(string)[0]);
