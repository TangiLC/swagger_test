/**
 * @typedef {object} Serie
 * @property {string} seriesId.required - Serie name - eg: 2022al'epreuvedesfaits
 * @property {number} idseries.required - Serie id - eg: 12652
 * @property {string} title.required - Serie title - eg: 2022 à l'épreuve des faits
 * @property {string} description.required - Serie description - eg: Dans ce nouveau rendez-vous...
 * @property {number} rpId.required - Serie internal id - eg: 29
 * @property {string} imageUrl - Serie image url - eg: https://...
 */
class Serie {
	constructor(data) {
		this.seriesId = data.series_id;
		this.idseries = data.id;
		this.title = data.nom;
		this.description = data.description;
		this.rpId = data.rpID;
		this.imageUrl = data.image;
	}
}

module.exports = Serie;
