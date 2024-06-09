export default process?.env?.DB_TYPE === "mock"
  ? await import("@/functions/database.mock.js")
  : await import("@/functions/database.elastic.js");
