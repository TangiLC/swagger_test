const FeedOnDemand = require('../responses/podcast/sub/feed_ondemand');

/*
 *	Cette classe représente la forme de la table podcasts sur la BDD distante
 */
class Podcast {
	constructor(data) {
		this.id = data.id;
		this.service = data.service;
		this.rpID = data.rpID;
		this.feedID = data.feedID;
		this.crid = data.crid;
		this.shortid = data.shortid;
		this.guid = data.guid;
		this.mediumName = data.mediumName;
		this.longName = data.longName;
		this.shortDescription = data.shortDescription;
		this.longDescription = data.longDescription;
		this.image = data.image ? data.image : 'https://www.radioplayer.fr/static/logos/podcast_defaut.png';
		this.jour = data.jour;
		this.start_time = data.start_time;
		this.dead_time = data.dead_time;
		this.genre_1_href = data.genre_1_href;
		this.genre_1_name = data.genre_1_name;
		this.genre_2_href = data.genre_2_href;
		this.genre_2_name = data.genre_2_name;
		this.player = data.player;
		this.audio_url = data.audio_url;
		this.duration_secondes = data.duration_secondes;
		this.duration_pt = data.duration_pt;
		this.prioritaire = data.prioritaire;
		this.ordre = data.ordre;
	}

	convertToFeed(feed_name) {
		return new FeedOnDemand(this, feed_name);
	}
}

module.exports = Podcast;
