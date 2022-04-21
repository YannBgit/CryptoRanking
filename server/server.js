const express = require('express')					// serveur
// gestion des cookies (obsolète)
//const cookieParser = require('cookie-parser')
//const sessions = require('express-session')
const bodyParser = require("body-parser")			// parser pour DOM
const mongoose = require('mongoose')				// base de données nosql
const app = express()				
 
// expresse configuration et prise en charge des caractères spéciaux
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// express session
const oneDay = 1000 * 60 * 60 * 24;

/*
app.use(sessions( {
	secret : "aleatnumber",
	saveUninitialized: true,
	cookie: {maxAge: oneDay},
	resave: false
}));
*/
//app.use(cookieParser);

// connection à la base de données
mongoose.connect('mongodb://localhost/cryptotracker', {
}).then(() => {
	console.log("mongo db connected");
}).catch(err => {
	console.log("failed to connect to the database",err);
});

// Modèle (email + password)
const userSchema = new mongoose.Schema ( {
	email : {type : String, required : true},
	password : {type : String, required : true}
})
const User = mongoose.model('User', userSchema);

/*
// test de connexion
app.get("/test", (req, res) => {
	res.json({"users": ["userOne","userTwo","userTree"]})
})
*/

// quand on se connecte recherche les utilisateurs dans la base de données (obsolète car on veut créer une session)
app.post("/api/connexion", async (req, res) => {
	const data = req.body
	console.log(data.email)
	console.log(data.password)
	User.findOne({$and: [{email : data.email}, {password : data.password}] })
	.then(user => {
		if(user != null) {
			console.log("sucess");
		} else {
			console.log("failed");
		}
	}).catch(err => {
		console.log(err);
	})
	res.redirect("/")
} ) 

// inscription (obsolète)
app.post("/api/inscription", async (req, res) => {
	const data = req.body
	console.log(data.email)
	console.log(data.password[0])
	if(data.password[0] == data.password[1]) {
		const user = new User ( {
			email : data.email,
			password : data.password[0]
		})
		
		user.save().then(user => {
			console.log(user)
		}).catch (err => {
			console.log(err)
		});
	} else {
		console.log("error: password not match");
	}
	res.redirect("/")
} ) 

// expresse port 5000
app.listen(5000, () => {console.log("Server running port 5000")})
