const GenericResponse = require('../generic_response');
const OnAir = require('./sub/onair');

/**
 * @typedef {object} RadioMetaData
 * @property {Array.<OnAir>} onair.required - requested radio
 * @property {string} until.required - requested radio
 * @property {Meta} meta.required - Response metadata
 */
class RadioMetaData extends GenericResponse {
	/**
	 * @param {Array.<BddRadio>} radio.required - Array des radios au format BDD
	 */
	constructor(data, rpID) {
		super({ rpID: rpID, type: 'radio metadata' });
		this.onair = data.onair && data.onair.length > 0 ? data.onair.map((el) => new OnAir(el)) : [];
		this.until = data.until;
	}
}

module.exports = RadioMetaData;
