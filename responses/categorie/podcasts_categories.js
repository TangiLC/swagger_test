const GenericResponse = require('../generic_response');

class PodcastsCategories extends GenericResponse {
	constructor(data) {
		super({ type: 'podcasts categories' });
		this.categories = data;
		this.meta.setCount(this.categories.length);
	}
}

module.exports = PodcastsCategories;
