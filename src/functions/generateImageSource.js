export const generateImageSource = (color = null) => {
  const path = "/alpaca_images";
  const defaultImageSource = "default_alpaca.jpeg";
  let imageSource = `${path}/${defaultImageSource}`;

  if (color === null) {
    return imageSource;
  }

  let source = null;
  switch (color) {
    // TODO continue with all colours
    case "COLOR_WHITE":
      source = "white_alpaca.jpeg";
      break;
    case "COLOR_TRUE_BLACK":
      source = "true_black_alpaca.jpeg";
      break;
    case "COLOR_MEDIUM_FAWN":
      source = "medium_fawn_alpaca.jpeg";
      break;
    case "COLOR_MEDIUM_BROWN":
      source = "medium_brown_alpaca.jpeg";
      break;
    case "COLOR_LIGHT_FAWN":
      source = "light_fawn_alpaca.jpeg";
      break;
    case "COLOR_BEIGE":
      source = "beige_alpaca.jpeg";
      break;
    case "COLOR_DARK_BROWN":
      source = "dark_brown_alpaca.jpeg";
      break;
    case "COLOR_LIGHT_BROWN":
      source = "light_brown_alpaca.jpeg";
      break;
    case "COLOR_BAY_BLACK":
      source = "bay_black_alpaca.jpeg";
      break;
    default:
      source = defaultImageSource;
  }

  return `${path}/${source}`;
};
