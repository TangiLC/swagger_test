const GenericResponse = require('../generic_response');
const RadiosRecommendations = require('./sub/radios_recommendations');

/*
 *	Cette classe représente la forme de la réponse utilisée
 *  pour l'endpoint /onboarding
 *  Elle se cumule à Radios_Onboarding dont elle est composée.
 */
class RadiosRecommendationsWeb extends GenericResponse {
	constructor(data, params) {
		super({ type: 'recommendations web', ...params });
		let recommendations = new RadiosRecommendations(data, params);
		this.services = recommendations.toWeb();
		this.meta.setCount(this.services.length);
	}
}

module.exports = RadiosRecommendationsWeb;
