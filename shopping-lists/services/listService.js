import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findLists = async () => {
  const response = await sql`SELECT * FROM shopping_lists WHERE active = true`;
  return response;
};

const findById = async (id) => {
  const response = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
  return response;
};

const deactivateList = async (id) => {
  await sql`UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
};

const countAll = async () => {
  const response = await sql`SELECT COUNT(*) FROM shopping_lists`;
  const response2 = await sql`SELECT COUNT(*) FROM shopping_list_items`;
  const data = {
    lists: response[0].count,
    items: response2[0].count
  };
  return data;
};

export { create, findLists, deactivateList, findById, countAll };