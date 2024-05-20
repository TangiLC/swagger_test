/**
 * @typedef {object} PodcastsTopCategorie
 * @property {string} name.required - Categorie name
 * @property {string} type.required - Categorie type
 * @property {string} description - Categorie description
 * @property {Array.<Serie>} series.required - Categorie series
 */
class PodcastsTopCategorie {
	constructor(name, type) {
		this.name = name;
		this.type = type;
		this.description = '';
		this.series = [];
	}

	addSeries(data, local) {
		// Ne ranger par ordre que si les radios ne sont pas local
		if (!local)
			data.sort(() => Math.random() - 0.5).sort((a, b) => {
				return a.ordre < b.ordre ? -1 : a.ordre > b.ordre ? 1 : 0;
			});
		for (let data_it = 0; data_it < data.length && data_it < 50; data_it++) {
			this.series.push(data[data_it].toSerie());
		}
	}

	addSpecialSeries(data, limit) {
		for (let data_it = 0; data_it < data.length && data_it < limit; data_it++) {
			this.series.splice(Math.floor(Math.random() * (this.series.length - 1)), 0, data[data_it].toSerie());
		}
	}
}

module.exports = PodcastsTopCategorie;
