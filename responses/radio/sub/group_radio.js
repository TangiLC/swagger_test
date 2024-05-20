const Enum = require('../../../enum');
const Localization_Logo = require('./localization_logo');

class Group_Radio {
	constructor(group, services) {
		this.services = services
			.sort((a, b) => {
				const nameA = a.nom.toUpperCase();
				const nameB = b.nom.toUpperCase();
				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
			})
			.map((radio) => radio.rpID);

		this.multimedia =
			group === Enum.CategorieID.IndesRadios
				? new Localization_Logo('https://backend.radioplayer.fr/logos/lesindesradios.png')
				: new Localization_Logo('https://backend.radioplayer.fr/logos/francebleu.png');
		this.name = group === Enum.CategorieID.IndesRadios ? 'LES INDES RADIOS' : 'FRANCE BLEU';
		this.type = 'group';
	}
}

module.exports = Group_Radio;
