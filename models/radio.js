const tools = require('../tools');
const ApiRadio = require('../responses/radio/sub/api_radio');
const AppleTvRadio = require('../responses/radio/sub/appletv_radio');
const BddDecrochage = require('./decrochage');

/**
 *	Cette classe représente la forme de la table radios sur la BDD distante
 * 	@typedef {object} BddRadio
 * 	@property {ApiRadio} item.required - requested radio
 * 	@property {Meta} meta.required - request meta data
 */
class BddRadio extends BddDecrochage {
	constructor(data, logos, streams, tokenStreams, bearers) {
		super(
			data,
			logos,
			streams.filter((stream) => stream.rpID == data.rpID),
			tokenStreams.filter((stream) => stream.rpID == data.rpID),
			bearers,
		);
		this.categories = [
			...new Set([data.cat_1, data.cat_2, data.cat_3, data.cat_4, data.cat_5].filter((cat) => cat)),
		];
		this.description = data.description ? Buffer.from(data.description, 'utf8').toString() : data.description;
		this.descriptionCourte = data.description_courte
			? Buffer.from(data.description_courte, 'utf8').toString()
			: data.description_courte;
		this.duplications = [
			...new Set(
				[
					data.duplication_1,
					data.duplication_2,
					data.duplication_3,
					data.duplication_4,
					data.duplication_5,
				].filter((duplication) => duplication),
			),
		];
		this.facebook = data.facebook ? Buffer.from(data.facebook, 'utf8').toString() : data.facebook;
		this.groupServices = data.group_services;
		this.groupeId = data.groupe_id;
		this.instagram = data.instagram ? Buffer.from(data.instagram, 'utf8').toString() : data.instagram;
		this.nomCourt = data.nom_court ? Buffer.from(data.nom_court, 'utf8').toString() : data.nom_court;
		this.nomMoyen = data.nom_moyen ? Buffer.from(data.nom_moyen, 'utf8').toString() : data.nom_moyen;
		this.type = data.type ? Buffer.from(data.type, 'utf8').toString() : data.type;
		this.twitter = data.twitter ? Buffer.from(data.twitter, 'utf8').toString() : data.twitter;
		this.onboarding = data.onboarding;
		this.priorite = data.priorite;
		this.urlSite = data.url_site ? Buffer.from(data.url_site, 'utf8').toString() : data.url_site;
	}

	convert() {
		return new ApiRadio(this);
	}

	categorized(categorie) {
		return this.categories.includes(categorie);
	}

	toAppleTV(factor) {
		return new AppleTvRadio(this.rpID, factor);
	}

	isIn(region) {
		if (!this.geofootprint) return false;
		const radio_polygon = this.geofootprint.split(', ');
		const radio_coo = [];
		for (let radio_polygon_it = 0; radio_polygon_it < radio_polygon.length; radio_polygon_it++) {
			let coordinate = radio_polygon[radio_polygon_it].split(' ');
			radio_coo.push({ lat: Number(coordinate[0]), long: Number(coordinate[1]) });
		}
		const radio_center = radio_coo.reduce((total, num) => {
			return { lat: total.lat - (total.lat - num.lat), long: total.long - (total.long - num.long) };
		});

		return tools.isIn(region.geofootprint, radio_center.lat, radio_center.long);
	}
}

module.exports = BddRadio;
