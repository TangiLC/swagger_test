const GenericResponse = require('../generic_response');

class PodcastsUne extends GenericResponse {
	constructor(data, params, regionsManager) {
		params.type = 'podcasts a la une';
		super(params);
		this.item = [];
		if (data) {
			this.item = [
				...new Set(data.filter((podcast) => podcast.groupeId != 2).map((podcast) => podcast.groupeId)),
			];
			this.item = this.item.map((groupeId) =>
				data.sort(() => Math.random() - 0.5).find((podcast) => podcast.groupeId == groupeId),
			);
			let indesRadiosPodcast = data.find((podcast) => podcast.groupeId == 2 && !podcast.region);
			if (params.latitude && params.longitude) {
				const indexRegion = regionsManager.getRegionIndexByGeo(params.latitude, params.longitude);
				if (indexRegion != -1) {
					const indesRadiosRegionalPodcast = data.find(
						(podcast) => podcast.groupeId == 2 && podcast.region == indexRegion,
					);
					if (indesRadiosRegionalPodcast) indesRadiosPodcast = indesRadiosRegionalPodcast;
				}
			}
			if (indesRadiosPodcast) this.item.push(indesRadiosPodcast);
			this.item = this.item.sort(() => Math.random() - 0.5);
		}
	}
}

module.exports = PodcastsUne;
