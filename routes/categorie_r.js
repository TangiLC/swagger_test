const express = require('express');
const router = express.Router();

const DataManager = require('../managers/data_m');
const dataManager = new DataManager().getInstance();

// APP : Categories Onboarding
router.get('/', function (req, res) {
	try {
		dataManager.setMonitoring('/categories');
		res.send(dataManager.getCategoriesM().getCategories(req.query, dataManager.getRadiosM()));
	} catch (error) {
		dataManager.log(error, req, res, '/categories');
	}
});

// APP & Site Internet : Categories par variables
router.get('/:uniqid', function (req, res) {
	try {
		dataManager.setMonitoring('/categories/:uniqid');
		res.send(dataManager.getCategoriesM().getCategories(req.query, dataManager.getRadiosM()));
	} catch (error) {
		dataManager.log(error, req, res, '/categories/:uniqid');
	}
});

module.exports = router;
