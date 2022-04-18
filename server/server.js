const express = require('express')
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const app = express()
 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// connection à la base de données
mongoose.connect('mongodb://localhost/cryptotracker', {
}).then(() => {
	console.log("mongo db connected");
}).catch(err => {
	console.log("failed to connect to the database",err);
});


const userSchema = new mongoose.Schema ( {
	email : {type : String, required : true},
	password : {type : String, required : true}
})
const User = mongoose.model('User', userSchema);

app.get("/test", (req, res) => {
	res.json({"users": ["userOne","userTwo","userTree"]})
})

app.post("/api/connexion", async (req, res) => {
	const data = req.body
	console.log(data.email)
	console.log(data.password)
	
	res.redirect("/")
} ) 

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

app.listen(5000, () => {console.log("Server running port 5000")})
