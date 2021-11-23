!(function () {
  if (
    process.env.NODE_ENV === "staging" ||
    process.env.NODE_ENV === "production"
  ) {
    console.log(
      "%cStop!",
      "color:red; font-size:60px; font-weight: bold; -webkit-text-stroke: 1px black;"
    );
    console.log(
      "%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature, it is a scam which might leave you exposed to account theft.\n\nSee https://en.wikipedia.org/wiki/Self-XSS for more information.",
      "font-size: 18px;"
    );
  }
})();
