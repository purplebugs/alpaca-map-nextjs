export default process?.env?.NODE_ENV === "test"
  ? await import("@/functions/database.mock.js")
  : await import("@/functions/database.elastic.js");
