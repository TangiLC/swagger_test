const GenericResponse = require('../generic_response');
const RadiosByFilters = require('./radios_by_filters');

const Enum = require('../../enum');

/*
 *	Cette classe représente la forme de la réponse utilisée pour
 *  l'endpoint /onboarding/appletv/:uniqid
 *  Elle se cumule à Radios_By_Filters dont elle est composée.
 */
class RadiosTrendingAppleTV extends GenericResponse {
	constructor(data) {
		super({ type: 'trending applet tv' });
		let onboarding = new RadiosByFilters(data, { cat: Enum.CategorieID.ADecouvrir });
		this.recommendations = onboarding.services
			.map((radio) => radio.toAppleTV(Enum.AppleTVFactor.Affinity))
			.sort(() => Math.random() - 0.5);
	}
}

module.exports = RadiosTrendingAppleTV;
