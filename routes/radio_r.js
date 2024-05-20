const express = require('express');
const router = express.Router();

const DataManager = require('../managers/data_m');
const dataManager = new DataManager().getInstance();

// ##UPDATED##
// Site internet : Radios
router.get('/', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		dataManager.setMonitoring('/radios');
		res.send(radiosManager.getAPIRadiosByFilters(req.query));
	} catch (error) {
		dataManager.log(error, req, res, '/radios');
	}
});

// ##UPDATED##
// Site Internet : Radioplayer vous recommande
router.get('/onboarding', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		dataManager.setMonitoring('/radios/onboarding');
		res.send(radiosManager.getRecommendationsWeb(req.query));
	} catch (error) {
		dataManager.log(error, req, res, '/radios/onboarding');
	}
});

// ##UPDATED##
// Apple TV : Radios Onboarding
router.get('/onboarding/appletv/:uniqid', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		dataManager.setMonitoring('/radios/onboarding/appletv/:uniqid');
		res.send(radiosManager.getTrendingAppleTV());
	} catch (error) {
		dataManager.log(error, req, res, '/radios/onboarding/appletv/:uniqid');
	}
});

// ##UPDATED##
// Site internet : Radios par rpIDs
router.get('/ids/:idrps', function (req, res) {
	try {
		if (req.params && req.params.idrps) {
			let ids_list = req.params.idrps.split(',');
			if (ids_list.every((id) => !isNaN(Number(id)))) {
				let radiosManager = dataManager.getRadiosM();
				dataManager.setMonitoring('/radios/ids/:idrps');
				res.send(radiosManager.getSpecificsAPIRadios(req.params));
			} else {
				res.status(400).send('Bad inputs.');
			}
		} else {
			res.status(400).send('Bad inputs.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/radios/ids/:idrps');
	}
});

// ##UPDATED##
// Site internet : Radios par rpID mère
router.get('/mere/:mere', function (req, res) {
	try {
		const mereId = Number(req.params.mere);
		if (req.params && !isNaN(mereId)) {
			dataManager.setMonitoring('/radios/mere/:mere');
			res.send(dataManager.getRadiosM().getAPIRadioGrp(mereId));
		} else {
			res.status(425).send('Bad inputs.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/radios/mere/:mere');
	}
});

// ##UPDATED##
router.get('/recommended/appletv/:uniqid', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		dataManager.setMonitoring('/recommended/appletv/:uniqid');
		res.send(radiosManager.getRecommendationsAppleTV(req));
	} catch (error) {
		dataManager.log(error, req, res, '/radios/recommended/appletv/:uniqid');
	}
});

// ##UPDATED##
router.get('/recommended/worldwide', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		dataManager.setMonitoring('/recommended/worldwide');
		res.send(radiosManager.getWWRecommendations(req.query));
	} catch (error) {
		dataManager.log(error, req, res, '/radios/recommended/worldwide');
	}
});

module.exports = router;
