export const replaceHighlight = (source, highlight) => {
  for (const property in highlight) {
    const properties = property.split(".");

    let previous = source;
    properties.forEach((key) => {
      if (typeof previous[key] === "string") {
        previous[key] = highlight[property];
      } else {
        previous = previous[key];
      }
    });
  }

  return source;
};
