const express = require('express');

//const fetch = require('node-fetch');

const app = express();

const port = process.env.PORT || 4999;


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

/*
app.get('/', (req, res) =>
{
    res.send('Hello World ! test')
})

app.get("/api", async (req, res) => {
    //const aq_url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    //const aq_response = await node-fetch(aq_url);
    //const aq_data = await aq_response.json();
    //res.json(aq_data);
    console.log("test");
    //console.log(aq_data);
});
*/
