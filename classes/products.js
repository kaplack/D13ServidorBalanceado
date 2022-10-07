import fs from "fs";
import options from "../options/db.js";
import knex from "knex";

const knexO = knex(options);

class Products {
  constructor() {}

  async save(objeto) {
    const [id] = await knexO("products").insert(objeto);
    return id;
  }

  getById(Number) {
    return knexO("products").where("id", "=", Number);
  }

  updateById(id, objeto) {
    const { name, price, description, stock, code, thumbnail } = objeto;
    return knexO("products").where("id", "=", id).update({
      name,
      price,
      description,
      stock,
      code,
      thumbnail,
    });
  }

  getAll() {
    return knexO("products");
  }

  deleteById(Number) {
    return knexO("products").where("id", "=", Number).del();
  }

  deleteAll() {
    knexO.from("products").del();
  }
}

export default Products;
