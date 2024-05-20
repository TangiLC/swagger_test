const express = require('express');
const router = express.Router();

const DataManager = require('../managers/data_m');
const dataManager = new DataManager().getInstance();

// ##UPDATED##
// -> podcast_feed
// MACOS : Podcast by filters
router.get('/', function (req, res) {
	try {
		let feed = dataManager.getPodcastsM().getPodcasts(req.query);
		if (feed) {
			dataManager.setMonitoring('/podcasts');
			res.send(feed);
		} else {
			res.status(425).send('Server loading or bad inputs. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/');
	}
});

// ##UPDATED##
// -> podcast_miseenavant
// MACOS : Podcast A la Une
router.get('/alaune', function (req, res) {
	try {
		let feed = dataManager.getPodcastsM().getALaUne(req.query, dataManager.getRegionsM());
		if (feed) {
			res.send(feed);
		} else {
			res.status(425).send('Server loading or bad inputs. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcast/alaune');
	}
});

// ##UPDATED##
// -> podcast_feed
// MACOS : Podcast by brand
router.get('/brand', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		let podcasts_m = dataManager.getPodcastsM();
		if (radiosManager && podcasts_m && podcasts_m.loaded) {
			dataManager.setMonitoring('/podcasts/brand');
			res.send(podcasts_m.getPodcastsByBrand(req.query, radiosManager));
		} else {
			res.status(425).send('Server loading. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/brand');
	}
});

// ##UPDATED##
// -> categories_podcasts
router.get('/categorie', function (req, res) {
	try {
		let podcasts_m = dataManager.getPodcastsM();
		if (podcasts_m && podcasts_m.loaded) {
			dataManager.setMonitoring('/podcasts/categorie');
			res.send(podcasts_m.getPodcastCategories());
		} else {
			res.status(425).send('Server loading. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcast/categorie');
	}
});

// ##UPDATED##
// -> podcasts
router.get('/episode', async function (req, res) {
	try {
		if (req.query && req.query.feedId && !isNaN(Number(req.query.feedId))) {
			dataManager.setMonitoring('/podcasts/episode');
			res.send(await dataManager.getPodcastsM().getEpisodes(Number(req.query.feedId), req.query));
		} else {
			res.status(400).send('Bad inputs.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/episode');
	}
});

// ##UPDATED##
// -> podcast_feed
// MACOS : Podcast feed
router.get('/feed', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		let podcasts_m = dataManager.getPodcastsM();
		if (radiosManager && podcasts_m.loaded) {
			let feed = podcasts_m.getFeed(radiosManager);
			if (feed) {
				dataManager.setMonitoring('/podcasts/feed');
				res.send(feed);
			} else {
				res.status(425).send('Service temporary unavailable. Please retry later.');
			}
		} else {
			res.status(425).send('Server loading. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/feed');
	}
});

// ##UPDATED##
// -> podcast_feed
router.get('/genre', function (req, res) {
	try {
		let podcasts_m = dataManager.getPodcastsM();
		if (podcasts_m && podcasts_m.loaded) {
			if (req.query.cat_1 || req.query.cat_2) {
				dataManager.setMonitoring('/podcasts/genre');
				res.send(podcasts_m.getByGenre(req.query));
			} else {
				res.status(400).send('Bad inputs.');
			}
		} else {
			res.status(425).send('Server loading. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/genre');
	}
});

// ##UPDATED##
/*
 *	Envoi des informations d'un podcast par son feedID
 */
// -> podcast_feed
router.get('/title/:id', function (req, res) {
	try {
		if (!isNaN(req.params.id)) {
			let podcasts_m = dataManager.getPodcastsM();
			if (podcasts_m && podcasts_m.loaded) {
				dataManager.setMonitoring('/podcasts/title/:id');
				res.send(podcasts_m.getTitle(req.params));
			} else {
				res.status(425).send('Server loading. Please retry later.');
			}
		} else {
			res.status(400).send('Bad inputs.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/title/:id');
	}
});

// ##UPDATED##
// App : Podcast onboarding
// -> podcast_feed
router.get('/onboarding', function (req, res) {
	try {
		let onboarding = dataManager.getPodcastsM().getOnboarding();
		if (onboarding) {
			dataManager.setMonitoring('/podcasts/onboarding');
			res.send(onboarding);
		} else {
			res.status(425).send('Server loading or bad inputs. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/onboarding');
	}
});

// MACOS : Podcast by top (top audience/genre/near_me)
// -> podcast_feed + categories_podcasts
router.get('/top', function (req, res) {
	try {
		let radiosManager = dataManager.getRadiosM();
		let podcasts_m = dataManager.getPodcastsM();
		if (radiosManager && podcasts_m && podcasts_m.loaded) {
			dataManager.setMonitoring('/podcasts/top');
			let top_podcast = podcasts_m.getTopPodcast(req.query, radiosManager);
			res.send(top_podcast);
		} else {
			res.status(425).send('Server loading. Please retry later.');
		}
	} catch (error) {
		dataManager.log(error, req, res, '/podcasts/top');
	}
});

module.exports = router;
