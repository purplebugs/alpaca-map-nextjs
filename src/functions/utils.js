import { readFileSync } from "fs";

export const fileReader = (fileIn, path = "./src/data/") => {
  // TODO do not hardcode path
  try {
    const myFile = readFileSync(`${path}${fileIn}`, "UTF-8");
    return JSON.parse(myFile);
  } catch (error) {
    console.error(error);
    return new Error("🧨 fileReader: Could not read from file");
  }
};

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
