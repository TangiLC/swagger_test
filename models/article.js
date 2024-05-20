/**
 * @typedef {object} BddArticle
 * @property {number} id.required - Id - eg:
 * @property {string} title.required - Title - eg: Les Français accros...
 * @property {string} date.required - Pubication date - eg: 2022-12-19T10:32:00.000Z
 * @property {string} content.required - Main content - eg: \n<p>Chaque jour, ...
 * @property {string} image.required - Image url - eg: https://...
 * @property {string} link.required - Outside link - eg: https://...
 */
class BddArticle {
	/**
	 * @param {object} data.required - direct DB articles response item
	 */
	constructor(data) {
		this.id = data.id;
		this.title = data.title;
		this.date = data.createdAt;
		this.content = data.content;
		this.image = data.image;
	}
}

module.exports = BddArticle;
