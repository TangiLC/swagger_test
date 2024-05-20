const GenericResponse = require('../generic_response');
const Enum = require('../../enum');

/**
 * @typedef {object} RadiosDiscover
 * @property {Array.<ApiRadio>} services.required - Radios to discover
 * @property {Meta} meta.required - Response metadata
 */
class RadiosDiscover extends GenericResponse {
	constructor(data, params) {
		super(params);
		this.meta.type = 'radios to discover';
		this.services = data.bdd_radios.filter(
			(radio) => radio.rpID > 0 && radio.categorized(Number(Enum.CategorieID.ADecouvrir)),
		);
		this.meta.setCount(this.services.length);
		this.services = this.services.map((radio) => radio.convert());
	}
}

module.exports = RadiosDiscover;
