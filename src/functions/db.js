import * as elastic from '@/functions/database.elastic.js';
import * as mock from '@/functions/database.mock.js';

export default process?.env?.NODE_ENV === "test" ? mock : elastic ;