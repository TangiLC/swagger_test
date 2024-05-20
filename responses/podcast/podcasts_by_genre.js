const GenericResponse = require('../generic_response');

/*
 *	Cette classe représente la forme de la réponse utilisée
 * 	pour l'endpoint /podcasts/genre
 *  Elle se cumule à Podcast_Feed dont elle est composée.
 */
class PodcastsByGenre extends GenericResponse {
	constructor(data, params) {
		params.type = 'podcast by genre';
		super(params);
		this.feed = [];
		if (data)
			this.feed = data
				.filter(
					(feed) =>
						feed.actif == 'O' &&
						((params.cat_1 && feed.cat_1 == params.cat_1) || (params.cat_2 && feed.cat_2 == params.cat_2)),
				)
				.map((feed) => feed.toGenre());
	}
}

module.exports = PodcastsByGenre;
