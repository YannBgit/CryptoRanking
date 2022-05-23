const express = require("express");
// const CoinGecko = require('coingecko-api');
const fetch = require('node-fetch');
const { send } = require("express/lib/response");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// var session = require('express-session');

// proxy 3001
const PORT = process.env.PORT || 3001;

// express et l'encodage pour les carcatères spéciaux
const app = express();
app.use(express.urlencoded({ extended: true })) // encodage 

// use cookies miam
app.use(cookieParser());

// connection à la base de données retourne une erreur 
mongoose.connect('mongodb+srv://awscryptoranking:kRwEQ0RWmp4oNXdf@cluster0.j62oc.mongodb.net/?retryWrites=true&w=majority', {
}).then(() => {
  console.log("mongo db connected");
}).catch(err => {
  console.log("failed to connect to the database", err);
});

// Schéma de la base de données
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
})
const User = mongoose.model('User', userSchema);

// gestion des messages d'erreurs 
var msg_inscription = " "

function set_current_msg(msg) {
  msg_inscription = msg;
}

function get_current_msg() {
  return msg_inscription;
}

// Post pour un utilisateur qui veut se connecter à la base de données
app.post("/api/connexion", async (req, res) => {
  const data = req.body
  console.log(data.email)
  console.log(data.password)

  const req_value = await User.findOne({ $and: [{ email: data.email }, { password: data.password }] });
  if (req_value) 
  {
    console.log("sucess");
    res.cookie(data.email, "");
    return res.redirect("/")
  }
  else 
  {
    console.log("failed");
    return res.redirect("/Connexion")
  }
  return res.redirect("/Connexion");
})

// Post pour l'insciption dans la base de donnée d'un utilisateur
app.post("/api/inscription", async (req, res) => {
  const data = req.body
  console.log(data.email)
  console.log(data.password[0])

  // on regarde si l'email est déjà présente

  // on vérifie la cohérence du mail
  const reg_email = /\S+@\S+\.\S+/g;
  if (reg_email.test(data.email) != true) {
    set_current_msg("une erreur au niveau du mot de passe ou du nom d'utilisateur");
    return res.redirect("/inscription")
  }

  // on vérifie si les deux mots de passe corespondent
  if (data.password[0] == data.password[1]) {

    // on vérifie la longeur
    const reg_lenght = /.{8,12}/g;
    if (reg_lenght.test(data.password[0]) != true) {
      console.log("mot de passe pas assez long")
      set_current_msg("mot de passe doit être entre 8 et 12 caractères")
      return res.redirect("/inscription")
    }

    // on vérifie si il y au moins une majuscule
    const reg_maj = /.*[A-Z]{1,}.*/g
    if (reg_maj.test(data.password[0]) != true) {
      console.log("mot de passe sans majuscule")
      set_current_msg("le mot de passe doit contenir au moins une majuscule")
      return res.redirect("/inscription")
    }

    // on vérifie si il y au moin un caractère spécial
    const reg_spe = /.*[$&+,:;=\\\\?@#|/'<>.^*()%!-'].*/g
    if (reg_spe.test(data.password[0]) != true) {
      console.log("mot de passe n'a pas de caractere spécial")
      set_current_msg("le mot de passe n'a pas de caractère special")
      return res.redirect("/inscription")
    }

    const req_value = await User.findOne({email: data.email});

    if(!req_value) {
      const user = new User({
        email: data.email,
        password: data.password[0]
      })
      user.save().then(user => {
        console.log(user)
      }).catch(err => {
        set_current_msg(err)
        console.log(err)
      });
      return res.redirect("/")
    } 
    else 
    {
      let erreur_password = "utilisateur déjà inscrit"
      console.log(erreur_password);
      set_current_msg(erreur_password)
    }
  } else {
    let erreur_password = "erreur les deux mots de passe ne corespondent pas"
    console.log(erreur_password);
    set_current_msg(erreur_password)
    return res.redirect("/inscription")
  }
  return res.redirect("/inscription")
})

app.get('/api/msg_inscription', async (_, res) => {
  text_message = get_current_msg()
  set_current_msg(" ")
  res.send({
    msg: text_message
  });
});

// récupère la liste selon la monaie entrée
app.get('/CoinList/:monnaie/', async (req, res) => {
  const monnaie = req.params.monnaie;
  console.log("DANS COIN LIST : ")
  console.log(monnaie);
  const resultat = await
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${monnaie}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
  const json_res = await resultat.json()
  res.json(json_res);
});

// récupère la monaie selon son id
app.get("/SingleCoin/:id", async (req, res) => {
  const id = req.params.id;
  console.log("DANS SIGNLE COIN : ")
  console.log(id);
  const resultat = await
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
  const json_res = await resultat.json()
  res.json(json_res);
});

// recupère l'historique de la monaie
app.get("/HistoricalChart/:id/:currency/:days", async (req, res) => {
  const id = req.params.id;
  const currency = req.params.currency;
  const days = req.params.days;
  console.log("DANS HISTORICALCHART : ");
  console.log(id, currency, days);
  const resultat = await
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
  const json_res = await resultat.json()
  res.json(json_res);
});

// recupère le trending coin
app.get("/TrendingCoins/:currency", async (req, res) => {
  const currency = req.params.currency;
  console.log("DANS Trading COINS : ")
  console.log(currency);
  const resultat = await
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    )
  const json_res = await resultat.json()
  res.json(json_res);
});

// écoute sur le port 3001
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// effectue une recherche sur les monnaies
app.get('/search2', async (req, res) => {
  const resultat = await
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  const json_res = await resultat.json()
  console.log(json_res);
  res.json(json_res);
})

const path = require("path");
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

/*
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
*/
