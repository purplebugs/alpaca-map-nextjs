import { fileReader } from "@/functions/utils.js";

export const getAnimal = (id) => {
  return id == 2773 ? fileReader("animal_2773.json") : [];
};

export const getAnimals = (query) => {
  const result = { total: 0, items: [] };

  if (query == "gård") {
    return fileReader("animals_gård.json");
  }

  if (query == "lund") {
    return fileReader("animals_lund.json");
  }

  if (query == "trygv") {
    return fileReader("animals_trygv.json");
  }

  return result;
};

export const getCompany = (id) => {
  return id === "61" ? fileReader("company_61.json") : [];
};

export const getCompanies = (query) => {
  const result = { total: 0, items: [] };

  if (query == "gård") {
    return fileReader("companies_gård.json");
  }

  if (query == "lund") {
    return fileReader("companies_lund.json");
  }

  return result;
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
  return query == "lund" ? fileReader("locations_lund.json") : { total: 0, items: [] };
};
