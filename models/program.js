/**
 * @typedef {object} Program
 * @property {string} crid - NSP
 * @property {string} description - description du programme
 * @property {string} heure_debut - date UTC de début du programme
 * @property {string} heure_fin - date UTC de fin du programme
 * @property {string} image_1400 - url de l'image du programme
 * @property {string} nom - nom du programme
 * @property {string} rpID - id de la radio du programme
 */
class Program {
	constructor(data) {
		this.crid = data.crid;
		this.description = data.description;
		this.heure_debut = data.heure_debut;
		this.heure_fin = data.heure_fin;
		this.image_1400 = data.image_1400;
		this.nom = data.nom;
		this.rpID = data.rpID;
	}
}

module.exports = Program;
