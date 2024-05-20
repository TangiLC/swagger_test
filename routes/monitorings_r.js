const express = require('express');
const router = express.Router();

const MonitoringC = require('../controllers/monitorings_c');

/**
 * This function is used to get monitoring about endpoints called.
 * @route GET /monitoring
 * @group monitoring - Monitoring operations
 * @returns {} 200 - A specific response.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.get('/', MonitoringC.get);

module.exports = router;
