import express from "express";
import session from "express-session";
import multer from "multer";
import Products from "../classes/products.js";
import ContenedorUser from "../classes/ContenedorUser.js";
import path from "path";

import { Router } from "express";

const data = new Products();
const users = new ContenedorUser();
const routerProduct = Router();

//GET
routerProduct.get("/", async (req, res) => {
  let user = req.session.currentUser;
  let usersData = await users.read();
  let currUser = usersData.filter((u) => u.username == user);
  data.getAll().then((items) => {
    res.render("productos", {
      products: items,
      listExists: true,
      user: currUser[0],
    });
  });
});
routerProduct.get("/:id", (req, res) => {
  let itemId = req.params.id;
  data.getById(itemId).then((item) => {
    res.send(item);
  });
});

//POST

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
routerProduct.post("/", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload file");
    error.httpStatusCode = 400;
    return next(400);
  }

  let item = {
    name: req.body.title,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    code: req.body.code,
    thumbnail: file.path,
  };
  data
    .save(item)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((error) => {
      res.status(500).json({ mensaje: "no se guardo la información" });
    });
});

//PUT

routerProduct.put("/:id", upload.none(), (req, res) => {
  let itemId = req.params.id;
  const body = req.body;
  // test = {
  //   ...body,
  //   itemId,
  // };

  data.updateById(itemId, body).then(() => {
    res.send({ itemActualizado: itemId });
  });
});

//DELETE
routerProduct.delete("/:id", (req, res) => {
  let itemId = req.params.id;
  data.deleteById(itemId).then(() => {
    res.send({ itemEliminado: itemId });
  });
});

export default routerProduct;
