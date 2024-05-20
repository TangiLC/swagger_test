const GenericResponse = require('../generic_response');

/*
 *	Cette classe représente la forme de la réponse utilisée
 * 	pour l'endpoint /podcasts/title/:id
 */
class TitleById extends GenericResponse {
	constructor(data, params) {
		params.type = 'podcast title id';
		super(params);
		let podcast_feed = data.find((feed) => feed.id == Number(params.id));
		if (podcast_feed) {
			this.nom = podcast_feed.nom;
			this.rpID = podcast_feed.rpID;
			this.image = podcast_feed.image;
			this.description = podcast_feed.description;
			this.categories = [];
			if (podcast_feed.cat_1) this.categories.push(podcast_feed.cat_1);
			if (podcast_feed.cat_2) this.categories.push(podcast_feed.cat_2);
		}
	}
}

module.exports = TitleById;
