const express = require('express');
const router = express.Router();
const { query, param } = require('express-validator');

const PodcastsC = require('../controllers/podcasts_c');

const tools = require('../tools');

/**
 * This function is used to get podcasts list.
 * Some filters might be used to reduce it.
 * @route GET /podcasts
 * @group podcasts - Podcasts operations
 * @param {string} name.query - Part or full podcast name - eg: after
 * @param {number} cat.query - Podcast associated categorie - eg: 5
 * @returns {PodcastsByFilters} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/',
	[
		query('cat').optional().isInt({ min: 0 }).withMessage('Invalid cat format'),
		query('name').optional().isString({ min: 1 }).withMessage('Invalid name format'),
	],
	tools.requestErrorHandler,
	PodcastsC.getPodcasts,
);

/**
 * This function is used to get a podcast by id.
 * @route GET /podcasts/{id}
 * @group podcasts - Podcasts operations
 * @param {number} id.path - Podcast id - eg: 4454
 * @returns {PodcastById} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check id value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Podcast does'nt exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:id',
	[param('id').isInt({ min: 0 }).withMessage('Invalid id format')],
	tools.requestErrorHandler,
	PodcastsC.getPodcast,
);

/**
 * This function is used to get podcast episodes by podcast id.
 * @route GET /podcasts/{id}/episodes
 * @group podcasts - Podcasts operations
 * @param {number} id.path - podcast id - eg: 4454
 * @returns {Episodes} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check id value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Podcast does'nt exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:id/episodes',
	[param('id').isInt({ min: 0 }).withMessage('Invalid id format')],
	tools.requestErrorHandler,
	PodcastsC.getPodcastEpisodes,
);

module.exports = router;
