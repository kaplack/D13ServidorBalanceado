import options from "./options/db.js";
import knex from "knex";

const knexO = knex(options);

knexO.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("name");
    table.decimal("price");
    table.string("description");
    table.integer("stock");
    table.string("code");
  })

  .then(() => console.log("table created"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knexO.destroy();
  });
