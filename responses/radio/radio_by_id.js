const GenericResponse = require('../generic_response');
const ApiRadio = require('./sub/api_radio');

/**
 * @typedef {object} RadioByRpId
 * @property {ApiRadio} item.required - requested radio
 * @property {Meta} meta.required - Response metadata
 */
class RadioByRpId extends GenericResponse {
	/**
	 * @param {Array.<BddRadio>} radio.required - Array des radios au format BDD
	 */
	constructor(radio) {
		super({ rpID: radio.rpID, type: 'radio by id' });
		this.service = radio.convert();
	}
}

module.exports = RadioByRpId;
