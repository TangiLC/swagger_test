const express = require('express');
const router = express.Router();
const ContactC = require('../controllers/contact_c');

router.use(express.json());
/**
 * Function used to send mail to support.
 * @route POST /contact
 * @group contact - Contact operations
 * @param {ContactBody} form.body.required - Contact form body
 * @returns {} 202 - An empty response.
 * @returns {Error} 400 - Bad request. Please check inputs value.
 * @returns {Error} 401 - Unauthorized. Please fill swagger 'Authorize'.
 * @returns {Error} 425 - Too early request. Server loading, wait few seconds.
 * @returns {Error} 500 - Unexpected internal error.
 * @security BasicAuth
 */
router.post('/', ContactC.sendMailToSupport);

module.exports = router;

/**
 * @typedef ContactBody
 * @property {string} email.body.required - sender email - eg: zaefdsq@daz.fr
 * @property {string} name.body.required - sender name - eg: Zimmer Man
 * @property {string} subject.body.required - subject title - eg: Help me !
 * @property {string} message.body.required - subject message - eg: This is an automatic message
 */
