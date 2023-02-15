import { executeQuery } from "../database/database.js";

const create = async (name) => {
  const query = `INSERT INTO shopping_lists (name) VALUES (${ name })`;
  const params = [name];
  await executeQuery(query, params);
};

const findLists = async () => {
  const query = `SELECT * FROM shopping_lists WHERE active = true`;
  const params = [];
  const response = await executeQuery(query, params);
  return response.rows;
};

const findById = async (id) => {
  const query = `SELECT * FROM shopping_lists WHERE id = ${ id }`;
  const params = [id];
  const response = await executeQuery(query, params);
  return response.rows[0];
};

const deactivateList = async (id) => {
  const query = `UPDATE shopping_lists SET active = false WHERE id = ${ id }`;
  const params = [id];
  await executeQuery(query, params);
};

const countAll = async () => {
  const query = `SELECT COUNT(*) FROM shopping_lists`;
  const params = [];
  const response = await executeQuery(query, params);
  const query2 = `SELECT COUNT(*) FROM shopping_list_items`;
  const params2 = [];
  const response2 = await executeQuery(query2, params2);
  const data = {
    lists: response.rows[0].count,
    items: response2.rows[0].count
  };
  return data;
};

export { create, findLists, deactivateList, findById, countAll };