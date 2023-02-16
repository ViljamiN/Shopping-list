import { sql } from "../database/database.js";

const createItem = async (name, shopping_list_id) => {
  await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${ name }, ${ shopping_list_id })`;
};

const collectItem = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
};

const viewItems = async (id) => {
  const response = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ id }`;
  return response.rows;
};

export { createItem, collectItem, viewItems };
