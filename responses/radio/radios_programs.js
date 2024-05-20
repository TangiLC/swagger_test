const GenericResponse = require('../generic_response');

/**
 * @typedef {object} ProgramsRadio
 * @property {Array.<Program>} programs.required - requested programs radio
 * @property {Meta} meta.required - Response metadata
 */
class ProgramsRadio extends GenericResponse {
	/**
	 * @param {number} rpid.required - rpid de la radio concernée
	 * @param {object} params.required - paramètre d'appel de la requête
	 */
	constructor(rpid, params, programs) {
		super({ rpID: rpid, type: 'programs radio by id', ...params });
		this.programs = programs;
	}
}

module.exports = ProgramsRadio;
