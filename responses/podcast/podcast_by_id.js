const GenericResponse = require('../generic_response');

/**
 * @typedef {object} PodcastById
 * @property {Podcast} podcast.required - Podcast selected
 * @property {Meta} meta.required - Response metadata
 */
class PodcastById extends GenericResponse {
	constructor(podcast, params) {
		params.type = 'podcast by id';
		super(params);
		this.podcast = podcast.toApi();
		this.meta.setCount(1);
	}
}

module.exports = PodcastById;
