import { sql } from "../database/database.js";

const createItem = async (name, id) => {
    console.log(name, id);
    await sql`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES (${name}, ${id})`;
};

const findItems = async (id) => {
    const ret = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} AND NOT collected ORDER BY name`;
    return ret;
}

const findCollectedItems = async (id) => {
    const ret = await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${id} AND collected ORDER BY name`;
    return ret;
}

const updateItem = async (id) => {
    await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${id}`;
}

const getNumber = async () => {
    let ret = await sql`SELECT COUNT (id) FROM shopping_list_items`;
    return ret[0];
}

export {createItem, findItems, findCollectedItems, updateItem, getNumber};