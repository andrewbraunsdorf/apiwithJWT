const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to the API'
	});
});

app.post('/api/posts', (req, res) => {
	res.json({
		message: 'Post Created...'
	});
});

app.post('/api/login', (req, res) => {
	// Mock User
	const user = {
		id: 1,
		username: 'brad',
		email: 'brad@gmail.com'
	};
	
	jwt.sign({user}, 'secretkey', (err, token) => {
		res.json({
			token
		});
	});
});

app.listen(8080, () => console.log('Server started on port 8080'));