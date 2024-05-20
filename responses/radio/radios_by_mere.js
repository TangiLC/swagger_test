const GenericResponse = require('../generic_response');

/**
 * @typedef {object} RadiosByMere
 * @property {Array.<ApiRadio>} services.required - radios fils du rpID
 * @property {Meta} meta.required - Response metadata
 */
class RadiosByMere extends GenericResponse {
	/**
	 * @param {Array.<BddRadio>} allServices.required - Array des radios au format BDD
	 * @param {Radio} rpID.required - RpId de la radio mère
	 */
	constructor(allServices, rpID) {
		super({ rpID: rpID, type: 'radios by rpid mere' });
		this.services = allServices.filter((radio) => radio.rpIdMere == rpID).map((radio) => radio.convert());
	}
}

module.exports = RadiosByMere;
