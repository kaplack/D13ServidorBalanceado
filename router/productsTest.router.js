import express from "express";
import multer from "multer";
import productsDaoMemoria from "../daos/productsDaoMemoria.js";
import path from "path";

import { Router } from "express";

const data = new productsDaoMemoria();
const routerProductTest = Router();

//GET
routerProductTest.get("/", (req, res) => {
  res.send(data.populate());
});

export default routerProductTest;
