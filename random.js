process.on("message", (msg) => {
  const childObj = msg;
  //console.log("child", childObj, childObj.cantidad);
  const result = calc(childObj);
  //console.log(obj);
  process.send(result);
  setTimeout(process.exit, 5000);
  //return;
});

const calc = (num) => {
  let obj = {};
  for (let i = 0; i <= num.cantidad - 1; i++) {
    let ranNumber = Math.round(Math.random() * 1000);
    //num[i] = ranNumber;
    if (ranNumber in obj) obj[ranNumber]++;
    else obj[ranNumber] = 1;
  }
  return obj;
};
