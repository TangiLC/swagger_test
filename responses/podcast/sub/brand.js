/**
 * @typedef {object} Brand
 * @property {number} brandName.required - Brand name - eg: BFM Radio
 * @property {number} rpId.required - Brand rpId - eg: 29
 * @property {Array.<Serie>} series.required - Brand series
 */
class Brand {
	constructor(name, rpId) {
		this.brandName = name;
		this.rpId = rpId;
		this.series = [];
	}

	addSeries(data) {
		for (let data_it = 0; data_it < data.length; data_it++) {
			this.series.push(data[data_it].toSerie());
		}
	}
}

module.exports = Brand;
