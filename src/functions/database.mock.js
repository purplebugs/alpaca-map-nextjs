import { readFileSync } from "fs";

export const fileReader = (fileIn) => {
  try {
    // TODO do not hardcode path
    const myFile = readFileSync(`./src/data/${fileIn}`, "UTF-8");
    return JSON.parse(myFile);
  } catch (error) {
    console.error(error);
    return new Error("🧨 fileReader: Could not read from file");
  }
};

export const getAnimal = (id) => {
  return id == 2773 ? fileReader("animal_2773.json") : [];
};

export const getAnimals = (query) => {
  let total = 0;
  let items = [];
  let result = { total: total, items: items };

  if (query == "lund") {
    items = fileReader("animals_lund.json");
    total = items.length;

    result = { total: total, items: items };
  }

  if (query == "trygv") {
    items = fileReader("animals_trygv.json");
    total = items.length;

    result = { total: total, items: items };
  }

  return result;
};

export const getCompany = (id) => {
  return id === "61" ? fileReader("company_61.json") : [];
};

export const getCompanies = (query) => {
  return query == "lund" ? fileReader("companies_lund.json") : [];
};

export const getFarms = () => {
  return fileReader("farms_mock.json");
};

export const getGeoDistanceRadius = (lat, lng, radius, publicFarms, privateFarms) => {
  // Response is mock of searching "Kyrksæterøra, Norway" in location search bar (Google autocomplete)
  // then sending this request with found lat,lng:
  // http://localhost:3000/api/companies/63.292781/9.0826007/500000

  return fileReader("api_farms_radius_respose_Kyrksæterøra.json");
};

export const getLocations = (query) => {
  return query == "lund" ? fileReader("locations_lund.json") : [];
};
