const GenericResponse = require('../generic_response');

/**
 * @typedef {object} Article
 * @property {BddArticle} item.required - Bdd article
 * @property {Meta} meta.required - Response metadata
 */
class Article extends GenericResponse {
	/**
	 * @param {BddArticle} item.required - An article db format
	 * @param {object} params.required - Query parameters
	 */
	constructor(article, params) {
		super(params);
		this.meta.type = 'article by id';
		this.item = article;
	}
}

module.exports = Article;
