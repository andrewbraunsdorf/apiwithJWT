const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to the API'
	});
});

app.post('/api/posts', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			res.sendStatus(403);
		}
		else {
			res.json({
				message: 'Post Created...',
				authData
			});
		}
	})

});

app.post('/api/login', (req, res) => {
	// Mock User
	const user = {
		id: 1,
		username: 'brad',
		email: 'brad@gmail.com'
	};

	jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
		res.json({
			token
		});
	});
});

// FORMAT of Token
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	// Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		// Split at the ' '
		const bearer = bearerHeader.split(' ');
		//Get token from array
		const bearerToken = bearer[1];
		//Set the token
		req.token = bearerToken;
		// Next Middleware
		next();
	}
	else {
		//forbidden
		res.sendStatus(403);
	}
}

app.listen(8080, () => console.log('Server started on port 8080'));
