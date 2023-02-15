import { executeQuery } from "../database/database.js";

const createItem = async (name, shopping_list_id) => {
  const query = `INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${ name }, ${ shopping_list_id })`;
  const params = [name, shopping_list_id];
  await executeQuery(query, params);
};

const collectItem = async (id) => {
  const query = `UPDATE shopping_list_items SET collected = true WHERE id = ${ id }`;
  const params = [id];
  await executeQuery(query, params);
};

const viewItems = async (id) => {
  const query = `SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ id }`;
  const params = [id];
  const response = await executeQuery(query, params);
  return response.rows;
};

export { createItem, collectItem, viewItems };
