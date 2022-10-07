process.on("message", (msg) => {
  const childObj = msg;
  //console.log("child", childObj, childObj.cantidad);
  let obj = {};
  for (let i = 0; i <= childObj.cantidad - 1; i++) {
    let ranNumber = Math.round(Math.random() * 1000);
    //num[i] = ranNumber;
    if (ranNumber in obj) obj[ranNumber]++;
    else obj[ranNumber] = 1;
  }
  //console.log(obj);
  process.send(obj);
});
