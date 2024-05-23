import { readFileSync } from "fs";

export const fileReader = (fileIn) => {
  try {
    const myFile = readFileSync(`@/data/${fileIn}`, "UTF-8");
    return JSON.parse(myFile);
  } catch (error) {
    console.error(error);
    return new Error("🧨 fileReader: Could not read from file");
  }
};

export default class MockDatabase {
  async getCompany(id) {
    return id == 61 ? fileReader("company_61.json") : [];
  }
}
