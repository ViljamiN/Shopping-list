import * as listService from "../services/listService.js";

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await listService.create(name);
};

const findNameById = async (list_id) => {
  const list = await listService.findById(list_id);
  const name = list[0].name;
  return name;
};

const viewLists = async () => {
  const data = {
    lists: await listService.findLists(),
  };
  return data;
};

const deactivateList = async (request) => {
  const id = request.url.split("/")[4];
  await listService.deactivateList(id);
};

const countAll = async () => {
  return await listService.countAll();
};

export { addList, findNameById, viewLists, deactivateList, countAll };