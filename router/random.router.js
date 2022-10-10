import { Router } from "express";
import { fork } from "child_process";

const routerRandom = Router();

routerRandom.get("/", (req, res) => {
  const cantidad = req.query.cant || 100000000;
  const forked = fork("random.js");
  forked.send({ cantidad: cantidad });
  //console.log(req.query.cant);
  forked.on("message", (msg) => {
    res.json({ process: process.pid, msg });
  });
});

export default routerRandom;
