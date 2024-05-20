const express = require('express');
const router = express.Router();
const CarsC = require('../controllers/cars_c');

/**
 * This function is used to get categories list for a specific car.
 * Query parameters help to localized results.
 * @route GET /cars/{car}/categories
 * @group cars - Categories operations
 * @param {string} car.path - Category type - eg: renault
 * @param {number} latitude.query - User latitude - eg: 43.67421
 * @param {number} longitude.query - User longitude - eg: 7.00554
 * @returns {} 200 - A specific response depending of type.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:car/categories', CarsC.categories);

/**
 * This function is used to get category details for a specific car.
 * Query parameters help to localized results.
 * @route GET /cars/{car}/categories/{category}
 * @group cars - Cars operations
 * @param {string} car.path - Category type - eg: renault
 * @param {number} category.path - Category type - eg: 1
 * @param {number} latitude.query - User latitude - eg: 43.67421
 * @param {number} longitude.query - User longitude - eg: 7.00554
 * @returns {} 200 - A specific response depending of type.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:car/categories/:category', CarsC.details);

module.exports = router;