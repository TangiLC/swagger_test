const { validationResult } = require('express-validator');

function requestErrorHandler(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	} else next();
}

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}

function isIn(geo, lat, long) {
	if (!geo || !lat || !long) return false;

	const polygon = geo.split(', ');
	const coordinates = [];
	for (let polygon_it = 0; polygon_it < polygon.length; polygon_it++) {
		let coordinate = polygon[polygon_it].split(' ');
		coordinates.push({ lat: Number(coordinate[0]), long: Number(coordinate[1]) });
	}

	let odd = false;
	for (let i = 0, j = coordinates.length - 1; i < coordinates.length; i++) {
		if (
			coordinates[i].long > long !== coordinates[j].long > long &&
			lat <
				((coordinates[j].lat - coordinates[i].lat) * (long - coordinates[i].long)) /
					(coordinates[j].long - coordinates[i].long) +
					coordinates[i].lat
		) {
			odd = !odd;
		}
		j = i;
	}
	return odd;
}

function log(error, req) {
	console.log('Une requête ' + req.originalUrl + ' a générée une erreur.');
	console.log(error);
	console.log('req.headers :');
	console.log(req.headers);
	console.log('req.query :');
	console.log(req.query);
}

module.exports = {
	formatDate: function (date) {
		return (
			[date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
			' ' +
			[padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':')
		);
	},
	isIn,
	log,
	requestErrorHandler,
	sansAccent: function (str) {
		var accent = [
			/[\300-\306]/g,
			/[\340-\346]/g, // A, a
			/[\310-\313]/g,
			/[\350-\353]/g, // E, e
			/[\314-\317]/g,
			/[\354-\357]/g, // I, i
			/[\322-\330]/g,
			/[\362-\370]/g, // O, o
			/[\331-\334]/g,
			/[\371-\374]/g, // U, u
			/[\321]/g,
			/[\361]/g, // N, n
			/[\307]/g,
			/[\347]/g, // C, c
		];
		var noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

		for (var i = 0; i < accent.length; i++) {
			str = str.replace(accent[i], noaccent[i]);
		}
		str = str.replace(
			/(-| |#|"|@|:|\.|,|;|'|%|!|²|=|÷|\+|\?|\/|\[|\]|\{|\}|\*|\^|\$|\\|`|"|'|¨|€|£|¤|µ|§|~|ƒ|„|©|°)/g,
			'',
		);

		return str;
	},
};
