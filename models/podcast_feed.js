const PodcastGenre = require('../responses/podcast/sub/podcast_genre');
const Serie = require('../responses/podcast/sub/serie');
const Podcast = require('../responses/podcast/sub/podcast');

class PodcastFeed {
	constructor(data) {
		this.id = data.id;
		this.rpID = data.rpID;
		this.nom = data.nom;
		this.feed = data.feed;
		this.cat_1 = data.cat_1;
		this.cat_2 = data.cat_2;
		this.heure_debut = data.heure_debut;
		this.duree_theorique = data.duree_theorique;
		this.regroup_series = data.regroup_series;
		this.natif = data.natif;
		this.programme = data.programme;
		this.actif = data.actif;
		this.miseenavant = data.miseenavant;
		this.onboarding = data.onboarding;
		this.series_id = data.series_id;
		this.image = data.image ? data.image : 'https://www.radioplayer.fr/static/logos/podcast_defaut.png';
		this.description = data.description;
		this.ordre = data.ordre;
	}

	toApi() {
		return new Podcast(this);
	}

	toGenre() {
		return new PodcastGenre(this);
	}

	toSerie() {
		return new Serie(this);
	}
}

module.exports = PodcastFeed;
