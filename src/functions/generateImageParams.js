export const generateImageParams = (color = null) => {
  const path = "/alpaca_images";
  const defaultSource = "default_alpaca.jpeg";
  const defaultWidth = 1024;
  const defaultHeight = 1024;
  const imageProps = { path: path, source: `${path}/${defaultSource}`, width: defaultWidth, height: defaultHeight };

  switch (color) {
    case "COLOR_WHITE":
      imageProps.source = `${path}/white_alpaca.jpeg`;
      break;
    case "COLOR_TRUE_BLACK":
      imageProps.source = `${path}/true_black_alpaca.jpeg`;
      imageProps.width = 812;
      imageProps.height = 812;
      break;
    case "COLOR_MEDIUM_FAWN":
      imageProps.source = `${path}/medium_fawn_alpaca.jpeg`;
      break;
    case "COLOR_MEDIUM_BROWN":
      imageProps.source = `${path}/medium_brown_alpaca.jpeg`;
      break;
    case "COLOR_LIGHT_FAWN":
      imageProps.source = `${path}/light_fawn_alpaca.jpeg`;
      imageProps.width = 1181;
      imageProps.height = 1181;
      break;
    case "COLOR_BEIGE":
      imageProps.source = `${path}/beige_alpaca.jpeg`;
      imageProps.width = 1181;
      imageProps.height = 1181;
      break;
    case "COLOR_DARK_BROWN":
      imageProps.source = `${path}/dark_brown_alpaca.jpeg`;
      break;
    case "COLOR_LIGHT_BROWN":
      imageProps.source = `${path}/light_brown_alpaca.jpeg`;
      imageProps.width = 1181;
      imageProps.height = 1181;
      break;
    case "COLOR_BAY_BLACK":
      imageProps.source = `${path}/bay_black_alpaca.jpeg`;
      break;
    default:
      return imageProps;
  }

  return imageProps;
};
