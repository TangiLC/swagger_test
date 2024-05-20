const GenericResponse = require('../generic_response');

/**
 * @typedef {object} Feed
 * @property {Array.<FeedOnDemand>} ondemand.required - Favourites podcasts selection from radio to select.
 * @property {Array.<number>} services.required - Favourites radio to select.
 * @property {Meta} meta.required - Response metadata
 */
class Feed extends GenericResponse {
	constructor(dataFeedMeA, dataMeA, radiosManager) {
		super({ type: 'podcast favourites' });
		const ondemand = [];
		for (let it = 0; it < dataMeA.length; it++) {
			const podcastFeed = dataFeedMeA.find((feed) => dataMeA[it].feedID == feed.id);
			const podcast = dataMeA[it].convertToFeed(podcastFeed.nom);
			ondemand.push(podcast);
		}
		this.ondemand = ondemand.sort(() => Math.random() - 0.5);
		this.services = radiosManager.getOnboardingApp().services;
		this.meta.setCount(this.ondemand.length);
	}
}

module.exports = Feed;
