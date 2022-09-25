let Calculate = (obj) => {
  let sum = 0;
  let t = obj.length;

  for (let i of obj) {
    sum += parseFloat(i["amount"]);
  }

  let singleExpend = Math.ceil(parseFloat(sum / t));

  let taker = [];
  let giver = [];

  for (let i of obj) {
    if (i["amount"] - singleExpend > 0) {
      let k = { name: i["name"], amount: i["amount"] - singleExpend };
      taker.push(k);
      // console.log("taken",i["name"],i["amount"],k)
    } else {
      let k = { name: i["name"], amount: singleExpend - i["amount"] };
      giver.push(k);
      // console.log("given",i["name"],i["amount"],k)
    }
  }
  // console.log(sum,sum/t,t,giver,taker)
  // console.log(giver, taker);

  let results = [];

  while (taker.length !== 0 && giver.length !== 0) {
    if (giver[0]["amount"] < taker[0]["amount"]) {
      results.push({
        giver: giver[0]["name"],
        amount: giver[0]["amount"],
        taker: taker[0]["name"],
      });

      taker[0]["amount"] = Math.round(taker[0]["amount"] - giver[0]["amount"]);

      giver.shift();
    } else if (giver[0]["amount"] === taker[0]["amount"]) {
      results.push({
        giver: giver[0]["name"],
        amount: giver[0]["amount"],
        taker: taker[0]["name"],
      });

      giver.shift();
      taker.shift();
    } else {
      results.push({
        giver: giver[0]["name"],
        amount: taker[0]["amount"],
        taker: taker[0]["name"],
      });
      giver[0]["amount"] = Math.round(giver[0]["amount"] - taker[0]["amount"]);

      taker.shift();
    }
  }
  // console.log("1111",results)

  return { result: results, avg: singleExpend };

  // module.exports =
};

// export default Calculate;
exports.Calculate = Calculate;
