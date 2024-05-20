const Enum = require('../../../enum');

/**
 * @typedef {object} Logo
 * @property {string} url.required - url du logo - eg: https://...
 * @property {string} mimeValue.required - MIME du logo - eg: image/png
 * @property {number} width.required - nombre de pixel de large du logo - eg: 1400
 * @property {number} height.required - nombre de pixel de hauteur du logo - eg: 1400
 */
class Logo {
	/**
	 * @param {string} url.required - url du logo
	 */
	constructor(url) {
		this.url = url;
		let splited_url = url.split('.');
		this.mimeValue = 'image/' + splited_url[splited_url.length - 1];
		this.width = Enum.Multimedia.Width;
		this.height = Enum.Multimedia.Height;
	}
}

module.exports = Logo;
