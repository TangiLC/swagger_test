/*
 *	Cette classe représente la forme de la table regions sur la BDD distante
 */
class Region {
	constructor(data) {
		this.id = data.id;
		this.nom = data.nom;
		this.geofootprint = data.geofootprint;
	}
}

module.exports = Region;
