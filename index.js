#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const credentials = {
	key: fs.readFileSync('./https/privkey.pem'),
	cert: fs.readFileSync('./https/cert.pem'),
};

const express = require('express');
const app = express();
app.use(express.json());

if (process.env.Environment === 'dev') {
	const expressSwagger = require('skarn-swagger')(app);
	const outputFile = 'c:/swag/swagger.json';

	const options = {
		swaggerDefinition: {
			info: {
				description: 'This is swagger Radioplayer API backend used to get services data, and send message.',
				title: 'Swagger Radioplayer API',
				version: '1.0.0',
			},
			servers: [
				{ url: 'https://betaapi.radioplayer.fr/v2', description: 'dev' },
				{ url: 'https://localhost/v2', description: 'localhost' },
				{ url: 'https://api.radioplayer.fr/v2', description: 'prod' },
			],
			components: {
				securitySchemes: {
					BasicAuth: {
						type: 'http',
						scheme: 'basic',
					},
				},
			},
		},
		basedir: __dirname,
		files: ['./models/**/*.js', './responses/**/*.js', './routes/**/*.js'], //Path to the API handle folder
		responseFormats: ['application/json'],

	};
	expressSwagger(options,outputFile);
}

const Enum = require('./enum');

Enum.Authorization = Enum.Authorization.map((x) => 'Basic ' + Buffer.from(x).toString('base64'));

app.use(cors());
app.use((req, res, next) => {
	if (Enum.Authorization.includes(req.headers.authorization)) {
		next();
	} else {
		res.status(401).send();
	}
});

app.get('/', function (req, res) {
	res.end();
});

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);
console.log('Le server REST démarre sur le port 443.');
