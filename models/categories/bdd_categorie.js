/**
 * @typedef {object} BddCategorie
 * @property {number} id.required - Id - eg : 25
 * @property {string} nom.required - Name - eg : A découvrir ...
 * @property {string} href.required - Urn - eg : urn:...
 * @property {string} synonyme - Synonyme - eg : News, ...
 */
class BddCategorie {
	/**
	 * @param {object} data.required - categories data
	 */
	constructor(data) {
		this.id = data.id;
		this.nom = data.nom;
		this.href = data.href;
		this.synonyme = data.synonyme;
	}

	/**
	 * Conversion de la catégorie BDD au format de réponse
	 */
	convert() {
		return new Categorie(this);
	}
}

module.exports = BddCategorie;
