import { unstable_noStore as noStore } from "next/cache";
import Elastic from "@/functions/database.elastic.js";
import Mock from "@/functions/database.mock.js";

noStore(); // Opt-into dynamic rendering
export const db = process?.env?.NODE_ENV === "test" ? new Mock() : new Elastic();
