const GenericResponse = require('../generic_response');
const Enum = require('../../enum');

/**
 * @typedef {object} RadiosFavoritesApp
 * @property {Array.<number>} services.required - Radios to select
 * @property {Meta} meta.required - Response metadata
 */
class RadiosFavoritesApp extends GenericResponse {
	constructor(data, params) {
		super({ type: 'favourites radios selection', ...params });

		const indesRadiosToAdd = data.bdd_radio_noprio_asso_indes
			.sort(() => Math.random() - 0.5)
			.slice(0, Enum.AppFavorites.RadiosIndesToAdd);

		// Toutes les radios de niveaux 1, toutes les radios non indés niveaux 2 et 4 radios indés niveaux 2
		this.services = data.bdd_radios_prio_asso
			.concat(data.bdd_radio_noprio_asso_not_indes.sort(() => Math.random() - 0.5))
			.concat(indesRadiosToAdd);
		this.services =
			// toutes les radios de niveau 1 aléatoirement réparties dans les 12 premières positions
			this.services
				.slice(0, Enum.AppFavorites.RadiosPrioAssoMaxPosition)
				.sort(() => Math.random() - 0.5)
				.concat(
					// toutes les autres radios aléatoirement réparties
					this.services
						.slice(Enum.AppFavorites.RadiosPrioAssoMaxPosition, this.services.length)
						.sort(() => Math.random() - 0.5),
				)
				.map((service) => service.rpID);
		this.meta.setCount(this.services.length);
	}
}

module.exports = RadiosFavoritesApp;
