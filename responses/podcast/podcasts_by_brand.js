const GenericResponse = require('../generic_response');
const Service_Radio = require('../radio/sub/service_radio');
const Brand = require('./sub/brand');

/*
 *	Cette classe représente la forme de la réponse utilisée
 * 	pour l'endpoint /podcasts/brand
 *  Elle se cumule à Brand dont elle est composée.
 */
class PodcastsByBrand extends GenericResponse {
	constructor(data, params, radiosManager) {
		params.type = 'podcasts by brand';
		super(params);
		this.item = [];
		let radiosManager_result = radiosManager.getRecommendationsApp(params);
		if (radiosManager_result) {
			let radios_alaune = radiosManager_result.items;
			for (let alaune_it = 0; alaune_it < radios_alaune.length; alaune_it++) {
				if (radios_alaune[alaune_it].constructor == Service_Radio) {
					const rpId =
						radiosManager.radios.decrochages.getMereRpId(radios_alaune[alaune_it].services[0]) ||
						radios_alaune[alaune_it].services[0];
					const brand = new Brand(radiosManager.getRadioName(rpId), rpId);
					const series = data
						.filter((feed) => feed.rpID == rpId)
						.sort((a, b) => {
							if (a.nom < b.nom) {
								return -1;
							}
							if (a.nom > b.nom) {
								return 1;
							}
							return 0;
						});
					if (series.length > 0) {
						brand.addSeries(series);
						this.item.push(brand);
					}
				}
			}
		}
		this.meta.setCount(this.item.length);
	}
}

module.exports = PodcastsByBrand;
