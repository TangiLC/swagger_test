const GenericResponse = require('../generic_response');

/*
 *	Cette classe représente la forme de la réponse utilisée
 * 	pour l'endpoint /podcasts/onboarding
 *  Elle se cumule à Serie dont elle est composée.
 */
class PodcastsOnboarding extends GenericResponse {
	constructor(data) {
		super({ type: 'podcast onboarding' });
		this.item = [];
		if (data) this.item = data.map((feed) => feed.toSerie()).sort(() => Math.random() - 0.5);
	}
}

module.exports = PodcastsOnboarding;
