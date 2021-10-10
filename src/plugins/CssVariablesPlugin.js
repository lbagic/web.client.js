const camelToKebab = (s) =>
  s
    .split("")
    .reduce((a, c) => {
      const isUpper = c === c.toUpperCase();
      if (isUpper) a.push("-");
      a.push(isUpper ? c.toLowerCase() : c);
      return a;
    }, [])
    .join("");

export default {
  install(app) {
    app.mixin({
      mounted: function () {
        if (typeof this.cssVariables !== "object") return;
        if (!(this.$el instanceof Element))
          throw `Can not use 'data.cssVariables' without root element in component: ${this.$options.__file}`;

        this.$watch(
          "cssVariables",
          function (n) {
            Object.entries(n).forEach(([k, v]) =>
              this.$el.style.setProperty(`--${camelToKebab(k)}`, v)
            );
          },
          {
            deep: true,
            immediate: true,
          }
        );
      },
    });
  },
};
