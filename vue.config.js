module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import '@/styles/core/index.prepend.scss';",
      },
    },
  },
};
