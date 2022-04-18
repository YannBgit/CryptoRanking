const express = require('express')
const app = express()

app.get("/test", (req, res) => {
	res.json({"users": ["userOne","userTwo","userTree"]})
})

app.listen(5000, () => {console.log("Server running port 5000")})
