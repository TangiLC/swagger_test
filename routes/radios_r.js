const express = require('express');
const router = express.Router();
const { query, param } = require('express-validator');

const RadiosC = require('../controllers/radios_c');

const tools = require('../tools');

/**
 * This function is used to get radios.
 * Some filters might be used to reduce it.
 * @route GET /radios
 * @group radios - Radios operations
 * @param {number} cat.query - Categorie filtrer - eg: 5
 * @param {string} tag.query - Tag filtrer - eg: RTL
 * @param {number} page.query - Page query, start at 0 - eg: 6
 * @returns {FiltredRadios} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/',
	[
		query('cat').optional().isInt({ min: 0 }).withMessage('Invalid cat format'),
		query('tag').optional().isString({ min: 1 }).withMessage('Invalid tag format'),
		query('page').optional().isInt({ min: 0 }).withMessage('Invalid page format'),
	],
	tools.requestErrorHandler,
	RadiosC.getServices,
);

/**
 * This function is used to get a radio by it id.
 * @route GET /radios/{rpid}
 * @group radios - Radios operations
 * @param {number} rpid.path - Radio rpID - eg: 33
 * @returns {RadioByRpId} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check id value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Radio does'nt exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:rpid',
	[param('rpid').isInt({ min: 0 }).withMessage('Invalid rpid format')],
	tools.requestErrorHandler,
	RadiosC.getService,
);

/**
 * This function is used to get a children radio by it id.
 * @route GET /radios/{rpid}/children
 * @group radios - Radios operations
 * @param {number} rpid.path - Radio rpID - eg: 33
 * @returns {RadiosByMere} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check id value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Radio does'nt exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:rpid/children',
	[param('rpid').isInt({ min: 0 }).withMessage('Invalid rpid format')],
	tools.requestErrorHandler,
	RadiosC.getChildren,
);

/**
 * This function is used to get a current metadata radio by it id.
 * @route GET /radios/{rpid}/meta
 * @group radios - Radios operations
 * @param {number} rpid.path - Radio rpID - eg: 33
 * @returns {RadioMetaData} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check id value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Radio does'nt exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:rpid/meta',
	[param('rpid').isInt({ min: 0 }).withMessage('Invalid rpid format')],
	tools.requestErrorHandler,
	RadiosC.getMetadata,
);

/**
 * This function is used to get a program radio by it rpid.
 * @route GET /radios/{rpid}/programs
 * @group radios - Radios operations
 * @param {number} rpid.path - Radio rpID - eg: 33
 * @param {string} date.query - Date selector - eg: 2023-05-20
 * @returns {ProgramsRadio} 200 - A specific response.
 * @returns {Error} 204 - RPWW server error. Please retry later...
 * @returns {Error} 400 - Bad request. Please check id value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Radio does'nt exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:rpid/programs',
	[param('rpid').isInt({ min: 0 }).withMessage('Invalid rpid format')],
	tools.requestErrorHandler,
	RadiosC.getPrograms,
);

/**
 * This function is used to get a secured stream radio by it id.
 * @route GET /radios/{rpid}/streams
 * @group radios - Radios operations
 * @param {number} rpid.path - Radio rpID - eg: 33
 * @returns {RadioStreams} 200 - A specific response.
 * @returns {Error} 400 - Bad request. Please check id value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 404 - Radio does'nt exist.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get(
	'/:rpid/streams',
	[param('rpid').isInt({ min: 0 }).withMessage('Invalid radio rpid format')],
	tools.requestErrorHandler,
	RadiosC.getStreams,
);

module.exports = router;
