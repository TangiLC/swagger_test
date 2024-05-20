const GenericResponse = require('../generic_response');
const Service_Radio = require('../radio/sub/service_radio');
const Brand = require('./sub/brand');

/**
 * @typedef {object} PodcastsByBrand
 * @property {Array.<Brand>} items.required - Podcasts recommended
 * @property {Meta} meta.required - Response metadata
 */
class PodcastsByBrand extends GenericResponse {
	constructor(data, params, radiosManager) {
		params.type = 'podcasts by brand';
		super(params);
		this.items = [];
		const recommendationsApp = radiosManager.getRecommendationsApp(params);
		if (recommendationsApp) {
			const recommendations = recommendationsApp.items;
			for (let alaune_it = 0; alaune_it < recommendations.length; alaune_it++) {
				if (recommendations[alaune_it].constructor == Service_Radio) {
					const rpId =
						radiosManager.radios.decrochages.getMereRpId(recommendations[alaune_it].services[0]) ||
						recommendations[alaune_it].services[0];
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
						this.items.push(brand);
					}
				}
			}
		}
		this.meta.setCount(this.items.length);
	}
}

module.exports = PodcastsByBrand;
