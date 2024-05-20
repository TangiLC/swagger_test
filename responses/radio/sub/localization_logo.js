const Logo = require('./logo');

/**
 * @typedef {object} Logo
 * @property {string} url.required - url du logo
 * @property {string} mimeValue.required - MIME du logo
 * @property {number} width.required - nombre de pixel de large du logo
 * @property {number} height.required - nombre de pixel de hauteur du logo
 * @property {number} index.required - NSP
 * @property {string} language.required - NSP
 */
class Localization_Logo extends Logo {
	/**
	 * @param {string} url.required - url du logo
	 */
	constructor(url) {
		super(url);
		this.index = 0;
		this.language = 'en';
	}
}

module.exports = Localization_Logo;
