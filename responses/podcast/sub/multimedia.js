const Enum = require('../../../enum');
const Logo = require('../../radio/sub/logo');

/**
 * @typedef {object} Multimedia
 * @property {string} url.required - url du logo - eg: https://...
 * @property {string} mimeValue.required - MIME du logo - eg: image/png
 * @property {number} width.required - nombre de pixel de large du logo - eg: 1400
 * @property {number} height.required - nombre de pixel de hauteur du logo - eg: 1400
 * @property {number} index.required - url du logo - eg: 0
 * @property {string} langage.required - MIME du logo - eg: fr
 */
class Multimedia extends Logo {
	constructor(url) {
		super(url);
		this.index = Enum.Multimedia.Index;
		this.langage = Enum.Multimedia.Langage;
	}
}

module.exports = Multimedia;
