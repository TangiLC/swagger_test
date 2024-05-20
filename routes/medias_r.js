const express = require('express');
const router = express.Router();

const MediasC = require('../controllers/medias_c');

/**
 * This function is used to get radios to discover.
 * @route GET /medias/{media}/discover
 * @group medias - Medias operations
 * @param {enum} media.path - Media than request - eg: appletv
 * @returns {RadiosDiscover} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Media does't exist or there's no discover radios for this media.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:media/discover', MediasC.isValidMedia, MediasC.getDiscoverRadios);

/**
 * This function is used to get radios recommendations for choosen media.
 * Some filters can be set to adapt to user preference like localization and favourites.
 * @route GET /medias/{media}/recommendations
 * @group medias - Medias operations
 * @param {enum} media.path - Media than request - eg: website,mobile,appletv,worldwide
 * @param {number} latitude.query - User latitude - eg: 43.67421
 * @param {number} longitude.query - User longitude - eg: 7.00554
 * @param {string} favourites.query - les favoris de l'utilisateur - eg: 313,3,202
 * @returns {GenericResponse} 200 - A specific response depending of media.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Media does't exist or there's no discover radios for this media.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:media/recommendations', MediasC.isValidMedia, MediasC.getRadiosRecommendations);

/**
 * This function is used to get podcasts recommendations.
 * @route GET /medias/{media}/recommendations/podcasts
 * @group medias - Medias operations
 * @param {enum} media.path - Media than request - eg: website,mobile,appletv,worldwide
 * @param {number} latitude.query - User latitude - eg: 43.67421
 * @param {number} longitude.query - User longitude - eg: 7.00554
 * @returns {PodcastsRecommendations} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check inputs value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Media does't exist or there's no discover radios for this media.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:media/recommendations/podcasts', MediasC.isValidMedia, MediasC.getPodcastsRecommendations);

/**
 * This function is used to get podcasts recommendations by brand.
 * @route GET /medias/{media}/recommendations/podcasts/brand
 * @group medias - Medias operations
 * @param {enum} media.path - Media than request - eg: website,mobile,appletv,worldwide
 * @param {number} latitude.query - User latitude - eg: 43.67421
 * @param {number} longitude.query - User longitude - eg: 7.00554
 * @returns {PodcastsByBrand} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Media does't exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:media/recommendations/podcasts/brand', MediasC.isValidMedia, MediasC.getPodcastsBrandRecommendations);

/**
 * This function is used to get Radio show on favourites selection.
 * @route GET /medias/{media}/favourites
 * @group medias - Medias operations
 * @param {enum} media.path - Media than request - eg: mobile
 * @returns {RadiosFavoritesApp} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Media does't exist or there's no favourites radios selection for this media.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:media/favourites', MediasC.isValidMedia, MediasC.getFavourites);

/**
 * Cette fonction est utilisée pour récupérer la liste des podcasts issue de la
 * propositions de favoris.
 * @route GET /medias/{media}/favourites/podcasts
 * @group medias - Medias operations
 * @param {enum} media.path - Media than request - eg: website,mobile,appletv,worldwide
 * @returns {Feed} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Media does't exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/:media/favourites/podcasts', MediasC.isValidMedia, MediasC.getPodcastsFavourites);

module.exports = router;
