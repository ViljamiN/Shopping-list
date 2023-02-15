import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const handleRequest = async (request) => {
  //first, we check if the request is a POST request
  if (request.method === "POST") {
    //then we check if the request is for the /lists route
    if (request.url.endsWith("/lists")) {
      //if it is, we add a new list
      await listController.addList(request);
      //and redirect to the lists page
      return requestUtils.redirectTo("/lists");
    }
    //check if the request is for the /lists/deactivate route
    else if (request.url.endsWith("/deactivate")) {
      //if it is, we deactivate the list with the given id
      await listController.deactivateList(request)
      //and redirect to the lists page
      return requestUtils.redirectTo("/lists");
    }
    else if (request.url.endsWith("/items")) {
      //if it is, we add a new item to the list with the given id
      await itemController.addItem(request);
      //and redirect to the list page
      return requestUtils.redirectTo(`/lists/${request.url.split("/")[4]}`);
    }
    else if (request.url.endsWith("/collect")) {
      const item_id = request.url.split("/")[6];
      const list_id = request.url.split("/")[4];
      await itemController.collectItem(item_id);
      //and redirect to the list page
      return requestUtils.redirectTo(`/lists/${list_id}`);
    }
    else if (!isNaN(request.url.split("/")[4])) {
      //if it is, we add a new item to the list with the given id
      await itemController.addItem(request);
      //and redirect to the list page
      return requestUtils.redirectTo(`/lists/${request.url.split("/")[4]}`);
    }
    else {
      //if the request is not for any of the routes, we return a 404 error with the name of the route
      return new Response(`Unhandled POST request to: ${request.url}`, { status: 404 });
    }
  }
  //if the request is not a POST request, we check if it is a GET request
  else if (request.method === "GET") {
    //then we check if the request is for the /lists
    if (request.url.endsWith("/lists") || request.url.endsWith("/lists/")) {
      //if it is, we show the lists .eta page
      const data = await listController.viewLists();
      return new Response(await renderFile("index.eta", data), responseDetails);
    }
    //check if request.url.split("/")[4] is a integer
    else if (!isNaN(request.url.split("/")[4])) {
      const list_id = request.url.split("/")[4];
      //we show the list .eta page
      const data = {
        id : list_id,
        name : await listController.findNameById(list_id),
        items : await itemController.viewItems(list_id)
      };
      return new Response(await renderFile("list.eta", data), responseDetails);
    }
    //if the request is not for the /lists route, we check if it is for the / route
    else if (request.url.endsWith("/")) {
      //if it is, we show the main .eta page
      //we pass data to the .eta page: this includes the number of the lists and of the items
      const data = await listController.countAll();
      console.log(data);
      return new Response(await renderFile("main.eta", data), responseDetails);
    }
    else {
      //if the request is not for any of the routes, we return a 404 error with the name of the route
      return new Response(`Unhandled GET request to: ${request.url.split("/")[4]}`, { status: 404 });
    }
  }
  //if the request is not a POST or GET request, we return a 404 error
  return new Response("Undefined request type", { status: 404 });
};

serve(handleRequest, { port: 7777 });