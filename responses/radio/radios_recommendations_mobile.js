const GenericResponse = require('../generic_response');
const RadiosRecommendations = require('./sub/radios_recommendations');

/*
 *	Cette classe représente la forme de la réponse utilisée
 *  pour l'endpoint /onboarding
 *  Elle se cumule à Radios_Onboarding dont elle est composée.
 */
class MobileRecommendations extends GenericResponse {
	constructor(data, params) {
		super({ type: 'recommendations mobile', ...params });
		let recommendations = new RadiosRecommendations(data, params);
		this.items = recommendations.toApp(data, params);
		this.meta.setCount(this.items.length);
	}
}

module.exports = MobileRecommendations;
