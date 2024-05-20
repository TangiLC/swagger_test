class RadiosCategorie {
	/**
	 * @param {object} data.required - élément de la BDD 'categories'
	 */
	constructor(bbdCategorie) {
		this.href = bbdCategorie.href; // inutile pour le siteweb
		this.id = bbdCategorie.id;
		this.name = bbdCategorie.nom;
		this.services = []; // inutile pour le siteweb
	}

	/**
	 * Ajout d'un service à la catégorie
	 * @param {integer} service.required - rpID du service à ajouter
	 */
	addService(service) {
		this.services.push(service);
	}

	/**
	 * Réinitialisation des services de la catégorie
	 * @param {integer} service.required - rpID du service à ajouter
	 */
	resetServices() {
		this.services = [];
	}
}

module.exports = RadiosCategorie;
