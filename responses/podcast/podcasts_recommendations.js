const GenericResponse = require('../generic_response');

/**
 * @typedef {object} PodcastsRecommendations
 * @property {Array.<PodcastALaUne>} items.required - Podcasts recommended
 * @property {Meta} meta.required - Response metadata
 */
class PodcastsRecommendations extends GenericResponse {
	constructor(podcasts, params, regionsManager) {
		params.type = 'podcasts recommendations';
		super(params);
		this.items = [];
		if (podcasts) {
			this.items = [
				...new Set(podcasts.filter((podcast) => podcast.groupeId != 2).map((podcast) => podcast.groupeId)),
			];
			this.items = this.items.map((groupeId) =>
				podcasts.sort(() => Math.random() - 0.5).find((podcast) => podcast.groupeId == groupeId),
			);
			let indesRadiosPodcast = podcasts.find((podcast) => podcast.groupeId == 2 && !podcast.region);
			if (params.latitude && params.longitude) {
				const indexRegion = regionsManager.getRegionIndexByGeo(params.latitude, params.longitude);
				if (indexRegion != -1) {
					const indesRadiosRegionalPodcast = podcasts.find(
						(podcast) => podcast.groupeId == 2 && podcast.region == indexRegion,
					);
					if (indesRadiosRegionalPodcast) indesRadiosPodcast = indesRadiosRegionalPodcast;
				}
			}
			if (indesRadiosPodcast) this.items.push(indesRadiosPodcast);
			this.items = this.items.sort(() => Math.random() - 0.5);
		}
		this.meta.setCount(this.items.length);
	}
}

module.exports = PodcastsRecommendations;
