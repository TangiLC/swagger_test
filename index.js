#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');

const credentials = {
	key: fs.readFileSync('./https/privkey.pem'),
	cert: fs.readFileSync('./https/cert.pem'),
};

const express = require('express');
const app = express();
app.use(express.json());

if (process.env.Environment === 'dev') {
	const expressSwagger = require('talec-swagger')(app);
	const outputFile = 'c:/swag/swagger.json';

	const options = {
		swaggerDefinition: {
			info: {
				description: 'This is swagger Radioplayer API backend used to get services data, and send message.',
				title: 'Swagger Radioplayer API',
				version: '1.0.2',
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
		files: [ './routes/**/*.js'], //Path to the API handle folder
		responseFormats: ['application/json'],
		route: {
			url: '/api-docs',
			docs: '/api-docs.json',
		},
	};
	const swaggerDocument = expressSwagger(options, outputFile);

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get('/', function (req, res) {
	res.end();
});

const httpServer = app.listen(80, () => {
	console.log('Le serveur REST démarre sur le port 80.');
});
