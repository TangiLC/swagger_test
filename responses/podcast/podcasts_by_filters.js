const levenshtein = require('js-levenshtein');

const GenericResponse = require('../generic_response');

/*
 *	Cette classe représente la forme de la réponse utilisée
 *	pour l'endpoint /podcast
 */
class PodcastsByFilters extends GenericResponse {
	constructor(data, params) {
		super(params);
		this.meta.type = 'podcasts by filters';
		if (!params || !params.nom) return [];
		let splittedList = [];
		for (let i = 0; i < data.length; i++) {
			let distance = 0;
			const podcastNom = data[i].nom
				.trim()
				.toLocaleLowerCase()
				.normalize('NFD')
				.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
			const filter = params.nom
				.trim()
				.toLocaleLowerCase()
				.normalize('NFD')
				.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
			if (!podcastNom.includes(filter)) {
				if (!params.nom.trim().length >= 6) continue;
				distance = levenshtein(podcastNom, filter);
			}
			if (distance < 4) {
				if (!splittedList[distance]) splittedList[distance] = [];
				splittedList[distance].push(data[i]);
			}
		}
		if (splittedList.length == 0) return [];
		return splittedList
			.reduce((a, b) => a.concat(b))
			.slice(0, params.limit ? params.limit : splittedList.length)
			.map((ele) => {
				return { nom: ele.nom, id: ele.id, image: ele.image, description: ele.description };
			});
	}
}

module.exports = PodcastsByFilters;
