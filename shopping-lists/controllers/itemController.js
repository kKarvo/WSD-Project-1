import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as listController from "./listController.js";

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

const addItem = async (request) => {
    const formData = await request.formData();
    const value = formData.get("name");
    const url = new URL(request.url);
    const urlPart = url.pathname.split("/")[2]
    await itemService.createItem(value, urlPart);
    return redirectTo(`/lists/${urlPart}`);
};

const markCollected = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const list_id = urlParts[2];
    const item_id = urlParts[4];

    await itemService.updateItem(item_id);
    return redirectTo(`/lists/${list_id}`);
};

export {redirectTo, addItem, markCollected};