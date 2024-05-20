const express = require('express');
const router = express.Router();
const CategoriesC = require('../controllers/categories_c');

/**
 * This function is used to get categories list by media type.
 * Query parameters help to order categories and associated services.
 * @route GET /categories/{type}
 * @group categories - Categories operations
 * @param {enum} type.path - Category type - eg: radios,podcasts
 * @param {number} latitude.query - User latitude - eg: 43.67421
 * @param {number} longitude.query - User longitude - eg: 7.00554
 * @param {string} favourites.query - User favourites radios - eg: 313,3,202
 * @returns {Categories} 200 - A specific response depending of type.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:type', CategoriesC.getCategories);

/**
 * @typedef {object} Categories
 * @property {Array.<BddCategorie>} categories.required - Current bdd article
 * @property {Meta} meta.required - Response metadata
 */

/**
 * This function is used to get top categories by media type.
 * Query parameters order categories services.
 * @route GET /categories/{type}/top
 * @group categories - Categories operations
 * @param {enum} type.path - Category type - eg: podcasts
 * @param {number} latitude.query - User latitude - eg: 43.67421
 * @param {number} longitude.query - User longitude - eg: 7.00554
 * @returns {PodcastsTopCategories} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:type/top', CategoriesC.getTopCategories);

module.exports = router;
