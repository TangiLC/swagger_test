const GenericResponse = require('../generic_response');
const PodcastsTopCategorie = require('./sub/podcasts_top_categorie');

const Enum = require('../../enum');

/**
 * @typedef {object} PodcastsTopCategories
 * @property {Array.<PodcastsTopCategorie>} categories.required - podcasts categories
 * @property {Meta} meta.required - Response metadata
 */
class PodcastsTopCategories extends GenericResponse {
	constructor(data_feed, homepageCategories, homepageFeeds, params, radiosManager) {
		params.type = 'podcast top categories';
		super(params); 

		const latitude = parseFloat(params.latitude)
		const longitude = parseFloat(params.longitude);
		const userLocalized = params && !isNaN(latitude) && !isNaN(longitude);
		let localizedStationsRpids = [];

		const listenFeeds = new PodcastsTopCategorie('Podcasts les + écoutés', 'genre');

		if (userLocalized) {
			localizedStationsRpids = radiosManager.radios.bdd_radios
				.filter((service) => service.isInGeo(latitude, longitude))
				.map(service => service.rpID);
			// Si l'utilisateur est géolocaliser, lui présenter une série de podcasts par groupe du système
			for(let i = 1; i <= 10; i++){
				const topGroupFeed = homepageFeeds.find(feed => radiosManager.radios.rpidsByGroup[i].includes(feed.rpID) && localizedStationsRpids.includes(feed.rpID));
				if(topGroupFeed) listenFeeds.series.push(topGroupFeed.toSerie());
			}
		}
		// Remplir par des séries localisées sur l'utilisateur ou non localisées
		const notLocalizedStationsRpids = radiosManager.radios.bdd_radios
			.filter((service) => !service.geofootprint)
			.map(service => service.rpID)
		for(let i = 1; listenFeeds.series.length < Enum.Qty.PodcastTop; i++){
			const topGroupFeed = homepageFeeds.find(feed => 
				radiosManager.radios.rpidsByGroup[i%10].includes(feed.rpID) && 
				!listenFeeds.series.map(serie => serie.idseries).includes(feed.id) && 
				(
					notLocalizedStationsRpids.includes(feed.rpID) || 
					localizedStationsRpids.includes(feed.rpID)
				));
			if(topGroupFeed) listenFeeds.series.push(topGroupFeed.toSerie());
		}
		listenFeeds.series = listenFeeds.series.slice(0,10).sort(() => Math.random() - 0.5).concat(listenFeeds.series.slice(10).sort(() => Math.random() - 0.5));
		this.categories = [listenFeeds];

		for(let homeCategory of homepageCategories){
			const catToAdd = new PodcastsTopCategorie(homeCategory.getName(), 'genre');
			const categorizedFeeds = homepageFeeds.filter(feed => feed.cat_1 == homeCategory.id);
			catToAdd.addSeries(categorizedFeeds.sort(() => Math.random() - 0.5));
			if (userLocalized) {
				for(let i = 1; i <= 10; i++){
					const categorizedFeed = categorizedFeeds.find(feed => radiosManager.radios.rpidsByGroup[i].includes(feed.rpID) && localizedStationsRpids.includes(feed.rpID));
					if(categorizedFeed) catToAdd.series.push(categorizedFeed.toSerie());
				}
			}// Remplir par des séries localisées sur l'utilisateur ou non localisées
			const notLocalizedStationsRpids = radiosManager.radios.bdd_radios
				.filter((service) => !service.geofootprint)
				.map(service => service.rpID)
			for(let i = 1; catToAdd.series.length < Enum.Qty.PodcastTop && i < categorizedFeeds.length * 10; i++){
				const categorizedFeed = categorizedFeeds.find(feed => 
					radiosManager.radios.rpidsByGroup[i%10].includes(feed.rpID) && 
					!catToAdd.series.map(serie => serie.idseries).includes(feed.id) && 
					(
						notLocalizedStationsRpids.includes(feed.rpID) || 
						localizedStationsRpids.includes(feed.rpID)
					));
				if(categorizedFeed) catToAdd.series.push(categorizedFeed.toSerie());
			}
			catToAdd.series = catToAdd.series.slice(0,10).sort(() => Math.random() - 0.5).concat(catToAdd.series.slice(10).sort(() => Math.random() - 0.5));
			this.categories.push(catToAdd);
		}

		if (userLocalized) {
			const nearCat = new PodcastsTopCategorie('Podcasts locaux', 'local');
			const localRadios = radiosManager.radios.bdd_radio_noprio_asso
				.concat(radiosManager.radios.bdd_radios_gold)
				.concat(radiosManager.radios.bdd_radios_noprio)
				.filter((service) =>
					service.isInGeo(
						Number(params.latitude.replace(',', '.')),
						Number(params.longitude.replace(',', '.')),
					),
				)
				.sort(() => Math.random() - 0.5);
			nearCat.addSeries(
				data_feed.filter((feed) => localRadios.some((radio) => radio.rpID == feed.rpID)),
				true,
			);
			nearCat.series.sort(() => Math.random() - 0.5);
			this.categories.push(nearCat);
		}
		this.meta.setCount(this.categories.length);
	}
}

module.exports = PodcastsTopCategories;
