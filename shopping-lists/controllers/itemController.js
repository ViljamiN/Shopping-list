import * as itemService from "../services/itemService.js";

const addItem = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const shopping_list_id = request.url.split("/")[4];
  console.log(shopping_list_id);
  await itemService.createItem(name, shopping_list_id);
};

const collectItem = async (id) => {
  //second to last part of the url is the id of the item
  await itemService.collectItem(id);
};

const viewItems = async (id) => {
  return await itemService.viewItems(id);
};


export { addItem, collectItem, viewItems };
