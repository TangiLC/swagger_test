/**
 * @typedef {object} Podcast
 * @property {number} id.required - Podcast feedid - eg: 4977
 * @property {number} rpID.required - Podcast rpID - eg: 30
 * @property {string} name.required - Podcast name - eg: L'After Foot
 * @property {string} feed.required - Feed url - eg: https://...
 * @property {Array.<number>} cat.required - podcast categories
 * @property {string} image.required - Podcast image url - eg: https://...
 * @property {string} description.required - Podcast description - eg: L'After foot, c'est ...
 */
class Podcast {
	constructor(data) {
		this.id = data.id;
		this.rpID = data.rpID;
		this.name = data.nom;
		this.feed = data.feed;
		this.categories = [];
		if (data.cat_1) this.categories.push(data.cat_1);
		if (data.cat_2) this.categories.push(data.cat_2);
		this.image = data.image;
		this.description = data.description;
	}
}

module.exports = Podcast;
