/**
 * @typedef {object} PodcastALaUne
 * @property {string} seriesId.required - Podcast series id - eg: lesvoixducrime
 * @property {number} idseries.required - Podcast id series - eg: 4315
 * @property {number} rpId.required - Podcast rp id - eg: 21
 * @property {string} imageSquare.required - Podcast square image url - eg: https://...
 * @property {string} imageUrl.required - Podcast image url - eg: https://...
 * @property {string} title.required - Podcast title - eg: Les voix du crime
 * @property {string} description.required - Podcast description - eg: Retrouvez tous les épisodes sur l'application RTL
 * @property {number} groupeId.required - Podcast groupeId - eg: 3
 * @property {string} region - Podcast region - eg: 3
 */
class PodcastALaUne {
	constructor(data, image, groupeId, region) {
		if (data) {
			this.seriesId = data.series_id;
			this.idseries = data.id;
			this.rpId = data.rpID;
			this.imageSquare = data.image;
			this.imageUrl = image;
			this.title = data.nom;
			this.description = data.description;
			this.groupeId = groupeId;
			this.region = region;
		}
	}
}

module.exports = PodcastALaUne;
