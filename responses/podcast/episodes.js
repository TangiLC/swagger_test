const GenericResponse = require('../generic_response');

/**
 * @typedef {object} Episodes
 * @property {Array.<Episode>} episodes.required - Podcast episodes selected
 * @property {Meta} meta.required - Response metadata
 */
class Episodes extends GenericResponse {
	constructor(data, params) {
		params.type = 'podcast episodes by id';
		super(params);
		this.episodes = data;
	}
}

module.exports = Episodes;

/**
 * @typedef {object} Episode
 * @property {number} rpID.required - Internal id - eg: 3
 * @property {string} crid.required - Crid - eg: crid://...
 * @property {number} shortid.required - Short id - eg: 7012775
 * @property {string} guid.required - Guid - eg: c6ccb343-078a-45ff-b3bb-081c71e43e6a
 * @property {string} mediumName.required - Medium name - eg: Boomerang - Emission spéciale
 * @property {string} longName.required - Long name - eg: Boomerang - Emission spéciale
 * @property {string} shortDescription.required - Short description - eg:  Pour cette dernière émission ...
 * @property {string} longDescription.required - Long description - eg:  Pour cette dernière émission ...
 * @property {string} image.required - Image url - eg: https://...
 * @property {string} start_time.required - Start date - eg: 2022-07-01T06:41:50.000Z
 * @property {string} genre_1_name.required - Name genre - eg: Arts
 * @property {string} genre_2_name.required - Name genre - eg: Arts
 * @property {string} audio_url.required - Audio url - eg: https://...
 * @property {string} duration_secondes.required - Duration secondes - eg: 2040
 * @property {string} nom.required - Name - eg: Boomerang
 */
