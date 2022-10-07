import express from "express";
import session from "express-session";
import multer from "multer";
import ContenedorUser from "../classes/ContenedorUser.js";
import bcryptjs from "bcryptjs";

import { Router } from "express";

const users = new ContenedorUser();

const routerLogin = Router();

routerLogin.get("/", async (req, res) => {
  let user = req.session.currentUser;
  let usersData = await users.read();
  let currUser = usersData.filter((u) => u.username == user);
  res.render("login", {
    user: currUser[0],
  });
});

const upload = multer();
routerLogin.post("/", upload.none(), async (req, res, next) => {
  const usersData = await users.read();
  let user = {
    user: req.body.user,
    password: String(req.body.password),
  };
  console.log(user);
  const userExist = usersData.some((u) => {
    return u.username == user.user;
  });

  if (userExist) {
    let currUser = usersData.filter((u) => u.username == user.user);
    console.log(currUser);
    let compare = bcryptjs.compareSync(user.password, currUser[0].password);
    if (compare) {
      req.session.currentUser = user.user;
      res.redirect("/");
    } else {
      res.send("la clave no es correcta");
    }
  } else {
    res.send("Usuario no Existe");
  }
});

export default routerLogin;
