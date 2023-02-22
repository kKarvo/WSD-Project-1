import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
        status: 303,
        headers: {
            "Location": path,
        },
    });
};

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await listService.create(name);
    return redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
        lists : await listService.findAllShoppingLists(),
    };
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const id = urlParts[2];
    const data = {
        list: await listService.findList(id),
        items: await itemService.findItems(id),
        items_collected: await itemService.findCollectedItems(id)
    }
    return new Response(await renderFile("list.eta", data), responseDetails);
}

const viewHome = async () => {
    const data = {
        list_n : await listService.getNumber(),
        item_n : await itemService.getNumber()
    };
    return new Response(await renderFile("home.eta", data), responseDetails);
}

const deactivate = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const id = urlParts[2];
    await listService.deactivate(id);
    return redirectTo("/lists");
}

export { redirectTo, viewLists, addList, viewHome, viewList, deactivate};