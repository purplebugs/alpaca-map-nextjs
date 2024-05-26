import Elastic from "./database.elastic.js";
import Mock from "./database.mock.js";

export const db = process.env.NODE_ENV === "test" ? new Mock() : new Elastic();
