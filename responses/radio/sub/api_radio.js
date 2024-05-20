const Radio = require('../../../models/radio');
const AppleTvRadio = require('./appletv_radio');
const Logo = require('./logo');
const Stream = require('./stream');
const md5 = require('md5');

/**
 * @typedef {object} ApiRadio
 * @property {number} rpID.required - radio id
 * @property {string} nom.required - radio name
 * @property {string} description.required - radio description
 * @property {string} facebook - radio facebook url
 * @property {string} twitter - radio twitter url
 * @property {string} instagram - radio instagram url
 * @property {string} urlSite - radio website url
 * @property {Array.<Stream>} streams.required - radio quality streams
 * @property {Logo} image.required - radio logo
 * @property {Array.<number>} categories.required - radio categories
 */
class ApiRadio {
	/**
	 * @param {Radio} data.required - données BDD de la radio
	 */
	constructor(data) {
		this.rpID = data.rpID;
		this.nom = data.nom;
		this.description = data.description;
		this.facebook = data.facebook;
		this.twitter = data.twitter;
		this.instagram = data.instagram;
		this.urlSite = data.urlSite;
		this.stream = [];
		for (let stream of data.streams) {
			this.stream.push(
				new Stream(stream.type, stream.url, stream.mime, stream.bitrate),
			);
		}
		this.stream = this.stream.sort((a, b) => {if(b.type == 'hls' && a.type != b.type) return 1;else if(a.type == 'hls' && a.type != b.type) return -1; else return  b.bitrate - a.bitrate;});
		if (data.logos && data.logos['256_256']) {
			this.image = new Logo(data.logos['256_256']);
		}
		this.categories = data.categories;
	}

	categorized(cat_id) {
		return this.categories.some((categorie) => categorie == cat_id);
	}

	toAppleTV(factor) {
		return new AppleTvRadio(this.rpID, factor);
	}
}

module.exports = ApiRadio;
