import Elastic from "@/functions/database.elastic.js";
import Mock from "@/functions/database.mock.js";

// export const db = process.env.NODE_ENV === "test" ? new Mock() : new Elastic();

export const db = new Elastic();
