import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  user: "postgres",
  password: "3y0VfN3067l74M4",
  hostname: "wandering-bush-7518-database.internal",
  database: "wandering_bush_7518",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };