const RadiosCategorie = require('./radios_categorie');
const BddCategorie = require('./bdd_categorie');

/**
 * @typedef {object} BddRadioCategorie
 * @property {integer} id.required - internal categorie id
 * @property {string} nom.required - categorie name
 * @property {string} href.required - NSP
 * @property {string} href_cloud - NSP
 * @property {boolean} homepage_sansperso.required - NSP
 * @property {boolean} onboarding.required - is categorie on boarding
 * @property {string} synonyme - NSP
 * @property {integer} ordre - categorie sort position
 * @property {string} amazon - NSP
 */
class BddRadioCategorie extends BddCategorie {
	/**
	 * @param {object} data.required - data radio categories
	 */
	constructor(data) {
		super(data);
		this.homepageSansperso = data.homepage_sansperso === 'O';
		this.onboarding = data.onboarding === 1;
		this.ordre = data.ordre;
		this.amazon = data.amazon;
	}

	/**
	 * Conversion de la catégorie BDD au format de réponse
	 */
	convert() {
		return new RadiosCategorie(this);
	}
}

module.exports = BddRadioCategorie;
