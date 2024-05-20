const levenshtein = require('js-levenshtein');

const GenericResponse = require('../generic_response');

/**
 * @typedef {object} PodcastsByFilters
 * @property {Array.<Podcast>} podcasts.required - Podcasts
 * @property {Meta} meta.required - Response metadata
 */
class PodcastsByFilters extends GenericResponse {
	constructor(data, params) {
		super(params);
		this.meta.type = 'podcasts by filters';
		this.podcasts = [];
		if (params) {
			this.podcasts = data;
			if (params.name && params.name.length > 0) {
				const name = params.name
					.trim()
					.toLocaleLowerCase()
					.normalize('NFD')
					.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
				this.podcasts = this.podcasts.filter(
					(podcast) =>
						podcast.nom
							.trim()
							.toLocaleLowerCase()
							.normalize('NFD')
							.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
							.includes(name) ||
						levenshtein(
							podcast.nom
								.trim()
								.toLocaleLowerCase()
								.normalize('NFD')
								.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
							name,
						) < 4,
				);
			}
			if (!isNaN(Number(params.cat))) {
				const cat = Number(params.cat);
				this.podcasts = this.podcasts.filter((podcast) => podcast.cat_1 === cat || podcast.cat_2 === cat);
			}
		}
		this.podcasts = this.podcasts.map((podcast) => podcast.toApi());
		this.meta.setCount(this.podcasts.length);
	}
}

module.exports = PodcastsByFilters;
