const Multimedia = require('../../podcast/sub/multimedia');

/**
 * @typedef {object} OnAir
 * @property {string} id.required - crid
 * @property {string} name.required - name
 * @property {string} description.required - description
 * @property {object} location.required - schedule informations
 * @property {Array.<Multimedia>} multimedia.required - associated onair media
 */
class OnAir {
	/**
	 * @param {object} data.required - donnée de la diffusion
	 */
	constructor(data) {
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.location = data.location;
		this.multimedia = data.multimedia;
	}
}

module.exports = OnAir;
