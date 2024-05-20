const express = require('express');
const router = express.Router();
const { query, param } = require('express-validator');

const ArticlesC = require('../controllers/articles_c');

const tools = require('../tools');

/**
 * Function used to get articles.
 * Some filters can be set to get quantity and associated page number.
 * @route GET /articles
 * @group articles - Articles operations
 * @param {integer} page.query - Page, default 0 - eg: 2
 * @param {integer} count.query - Items quantity, default 6 - eg: 6
 * @returns {Articles} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check inputs value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/',
	[
		query('page').optional().isInt({ min: 0 }).withMessage('Invalid page format'),
		query('count').optional().isInt({ min: 1 }).withMessage('Invalid count format'),
	],
	tools.requestErrorHandler,
	ArticlesC.getArticles,
);

/**
 * Function used to get a specific article by id.
 * @route GET /articles/{id}
 * @group articles - Articles operations
 * @param {integer} id.path.required - Article id - eg: 2
 * @returns {Article} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check inputs value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Ressource not exist.'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:id',
	[param('id').isInt({ min: 0 }).withMessage('Invalid id format')],
	tools.requestErrorHandler,
	ArticlesC.getArticle,
);

module.exports = router;
