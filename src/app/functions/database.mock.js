import { readFileSync } from "fs";

export const fileReader = (fileIn) => {
  try {
    // TODO do not hardcode path
    const myFile = readFileSync(`./src/app/data/${fileIn}`, "UTF-8");
    return JSON.parse(myFile);
  } catch (error) {
    console.error(error);
    return new Error("🧨 fileReader: Could not read from file");
  }
};

export default class MockDatabase {
  async getAnimal(id) {
    return id == 2773 ? await fileReader("animal_2773.json") : [];
  }

  async getCompany(id) {
    return id === "61" ? await fileReader("company_61.json") : [];
  }

  async getFarms() {
    return await fileReader("farms_mock.json");
  }
}
