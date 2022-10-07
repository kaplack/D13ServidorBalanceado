import { Router } from "express";
import { fork } from "child_process";
const forked = fork("random.js");

const routerRandom = Router();

routerRandom.get("/", (req, res) => {
  const cantidad = req.query.cant || 100000000;
  forked.send({ cantidad: cantidad });
  //console.log(req.query.cant);
  forked.on("message", (msg) => {
    //console.log(msg);
    res.send(msg);
  });
});

export default routerRandom;
