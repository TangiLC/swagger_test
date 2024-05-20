const BddCategorie = require('./bdd_categorie');

class BddPodcastsCategorie extends BddCategorie {
	constructor(data) {
		super(data);
		this.homepage = data.homepage;
	}

	getName() {
		return this.nom;
	}

	isHomepage() {
		return this.homepage == 'O';
	}
}

module.exports = BddPodcastsCategorie;
