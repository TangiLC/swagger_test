const Meta = require('./meta');

/**
 * @typedef {object} GenericResponse
 * @property {Meta} meta.required - Response metadata
 */
class GenericResponse {
	constructor(params) {
		this.meta = new Meta(params);
	}
}

module.exports = GenericResponse;
