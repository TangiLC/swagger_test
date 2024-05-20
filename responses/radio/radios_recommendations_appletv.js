const GenericResponse = require('../generic_response');
const RadiosRecommendations = require('./sub/radios_recommendations');

/*
 *	Cette classe représente la forme de la réponse utilisée pour
 *  l'endpoint /recommended/appletv/:uniqid
 */
class RadiosRecommendationsAppleTV extends GenericResponse {
	constructor(data, req) {
		const params = { ...req.params, ...req.query };
		super({ type: 'recommendations apple tv', ...params });
		const recommendations = new RadiosRecommendations(data, params);
		this.recommendations = recommendations.toAppleTV(data, req);
		this.meta.setCount(this.recommendations.length);
	}
}

module.exports = RadiosRecommendationsAppleTV;
