import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname === "/" && request.method === "GET") {
    return await listController.viewHome();
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return listController.addList(request);
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return listController.viewList(request);
  } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return listController.deactivate(request);
  } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemController.markCollected(request);
  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.addItem(request);
  } else {
    return new Response("Page not found", {status: 404});
  }
};

serve(handleRequest, { port: 7777 });
