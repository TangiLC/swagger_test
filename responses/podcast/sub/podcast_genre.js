/*
 *	Cette classe représente la forme de la réponse
 * 	utilisée pour l'endpoint /podcasts/genre
 */
class Podcast_Genre {
	constructor(data) {
		this.feedid = data.id;
		this.rpID = data.rpID;
		this.nom = data.nom;
		this.feed = data.feed;
		this.cat_1 = data.cat_1;
		this.cat_2 = data.cat_2;
		this.image = data.image;
	}
}

module.exports = Podcast_Genre;
