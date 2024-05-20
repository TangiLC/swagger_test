const GenericResponse = require('../generic_response');

/**
 * @typedef {object} Articles
 * @property {Array.<BddArticle>} items.required - Articles selected
 * @property {Meta} meta.required - Response metadata
 */
class Articles extends GenericResponse {
	/**
	 * @param {Array.<BddArticle>} articles.required - Articles array DB format
	 * @param {object} params.required - Query parameters
	 */
	constructor(articles, params) {
		super(params);
		this.meta.type = 'articles';
		this.meta.setCount(articles.length);
		this.items = articles;
	}
}

module.exports = Articles;
