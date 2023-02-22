import { sql } from "../database/database.js";

const create = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllShoppingLists = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = TRUE`;
};

const findList = async (id) => {
    const ret = await sql`SELECT * FROM shopping_lists WHERE active = TRUE AND id = ${id}`;
    return ret[0];
};

const deactivate = async (id) => {
    await sql`UPDATE shopping_lists SET active = FALSE WHERE active = TRUE AND id = ${id}`;
};

const getNumber = async () => {
    let ret = await sql`SELECT COUNT (id) FROM shopping_lists`;
    return ret[0];  
};

export { create, findAllShoppingLists, findList, deactivate, getNumber };