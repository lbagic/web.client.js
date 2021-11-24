import { nextTick, reactive } from "vue";
import { rawBreakpoints } from "../../styles/core/variables.scss";
import { parseSassJson } from "../../utils/parseSassJson";

export const breakpoint = {
  install(app) {
    const map = parseSassJson(rawBreakpoints);

    // get breakpoint keys
    const keys = Object.keys(map);

    // convert (breakpoint) map values to numbers
    keys.forEach((key) => {
      const value = map[key];
      map[key] = Number(value.replace("px", ""));
    });

    // maps each breakpoint size ~ example { s: [0, 500], m: [500, 800], ..., xl: [1200] }
    const rangeMap = keys.reduce((a, key, index) => {
      const minMaxValues = [map[key]];
      const nextKey = keys[index + 1];
      if (nextKey) minMaxValues.push(map[nextKey]);
      return { ...a, [key]: minMaxValues };
    }, {});

    // calculates initial breakpoint
    let initialBreakpoint = "";
    Object.entries(rangeMap).forEach(([key, [min, max]]) => {
      if (window.innerWidth < min) return;
      if (max !== undefined && window.innerWidth >= max) return;
      initialBreakpoint = key;
    });

    // create initial breakpoints object
    const breakpoints = keys.reduce(
      (a, key) => {
        a[key] = initialBreakpoint === key;
        return a;
      },
      { active: initialBreakpoint }
    );

    // create reactive reference
    const breakpoint = reactive({ ...breakpoints });

    // attaches onchange listeners for each breakpoint
    Object.entries(rangeMap).forEach(([activeKey, [min, max]]) => {
      const query =
        typeof max === "number"
          ? `(min-width: ${min}px) and (max-width: ${max}px)`
          : `(min-width: ${min}px)`;

      window.matchMedia(query).onchange = (event) => {
        if (!event.matches) return;
        nextTick(() => {
          breakpoint.active = activeKey;
          keys.forEach((key) => (breakpoint[key] = activeKey === key));
        });
      };
    });

    app.config.globalProperties.$breakpoint = breakpoint;
  },
};
