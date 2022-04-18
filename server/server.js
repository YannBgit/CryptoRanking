const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/cryptotracker')

app.get("/test", (req, res) => {
	res.json({"users": ["userOne","userTwo","userTree"]})
})

app.post("/api/connexion", async (req, res) => {
	const record = req.body
	console.log("connexion")
	res.redirect("/")
} ) 

app.post("/api/inscription", async (req, res) => {
	const record = req.body
	console.log("inscription")
	res.redirect("/")
} ) 

app.listen(5000, () => {console.log("Server running port 5000")})
