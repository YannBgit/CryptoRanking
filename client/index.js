const express = require("express");
//const CoinGecko = require('coingecko-api');
const fetch = require('node-fetch');
const { send } = require("express/lib/response");

const PORT = process.env.PORT || 3001;

const app = express();
//const CoinGeckoClient = new CoinGecko();

app.get('/CoinList/:monnaie/', async (req, res) => {
  const monnaie = req.params.monnaie;
  console.log(monnaie);
  const resultat = await 
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${monnaie}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  )
  const json_res = await resultat.json()
  res.json(json_res);
});

app.get("/SingleCoin", async (req, res) => {
  const resultat = await 
  fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
  const json_res = await resultat.json()
  res.json(json_res);
});

app.get("/HistoricalChart", async (req, res) => {
  const resultat = await 
  fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
  const json_res = await resultat.json()
  res.json(json_res);
});

app.get("/TrendingCoins", async (req, res) => {
  const resultat = await 
  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
  )
  const json_res = await resultat.json()
  res.json(json_res);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/search2',async (req, res) => {
  //console.log("le REQ : ",req.body)
const resultat = await 
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
const json_res = await resultat.json()
console.log(json_res);
res.json(json_res);

/*
.then(re => re.json())
.then(re => res.json(re))*/


//res.send("YA SAHBI !!!")
//console.log("HELLO !!! from node");
})


