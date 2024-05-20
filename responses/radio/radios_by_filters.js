const levenshtein = require('js-levenshtein');

const GenericResponse = require('../generic_response');

const Enum = require('../../enum');

/*
 *	Cette classe représente la forme de la réponse utilisée
 *	pour l'endpoint /radios
 *  Elle se cumule à ApiRadio dont elle est composée.
 */
class RadiosByFilters extends GenericResponse {
	constructor(data, params) {
		super(params);
		this.meta.type = 'radios by filters';

		if (!params || (!params.home && !params.cat && !params.type && !params.tag)) {
			this.services = data.bdd_radios_prio_asso
				.filter((radio) => radio.rpID != 0)
				.sort(() => Math.random() - 0.5)
				.concat(
					data.bdd_radios_filtred.concat(data.bdd_radios_france_bleu).sort((a, b) => {
						var nameA = a.nom.toUpperCase();
						var nameB = b.nom.toUpperCase();
						if (nameA < nameB) {
							return -1;
						}
						if (nameA > nameB) {
							return 1;
						}
						return 0;
					}),
				);
		} else {
			this.services =
				params.home == 1
					? data.bdd_onboarding
							.concat(
								data.bdd_radio_noprio_asso_indes
									.filter((radio) => radio.rpID > 0)
									.sort(() => Math.random() - 0.5)
									.splice(0, 25 - data.bdd_onboarding.length),
							)
							.sort(() => Math.random() - 0.5)
					: data.bdd_radios.filter((radio) => radio.rpID > 0);

			this.services = this.services.filter((radio) => !params.cat || radio.categorized(Number(params.cat)));
			this.services = this.services.filter((radio) => !params.type || params.type == radio.type);
			if (params.tag) {
				const tag = params.tag
					.trim()
					.toLocaleLowerCase()
					.normalize('NFD')
					.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
				this.services = this.services.filter(
					(service) =>
						service.nom
							.trim()
							.toLocaleLowerCase()
							.normalize('NFD')
							.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
							.includes(tag) ||
						levenshtein(
							service.nom
								.trim()
								.toLocaleLowerCase()
								.normalize('NFD')
								.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
							tag,
						) < 4,
				);
			} else {
				this.services = this.services.map((service) => {
					if (service.rpID == 701 || service.rpID == 312) service.priorite = '1';
					return service;
				});
				this.services = this.services.sort((a, b) => {
					if (a.priorite > b.priorite) {
						return 1;
					}
					if (b.priorite > a.priorite) {
						return -1;
					}
					if (a.type > b.type) {
						return 1;
					}
					if (b.type > a.type) {
						return -1;
					}
					let nameA = a.nom.toUpperCase();
					let nameB = b.nom.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				});
			}
		}

		if (params && !isNaN(Number(params.page))) {
			this.meta.setPagesCount(this.services.length, Enum.Qty.RadioPerPage);
			this.services = this.services.slice(
				Number(params.page) * Enum.Qty.RadioPerPage,
				Number(params.page) * Enum.Qty.RadioPerPage + Enum.Qty.RadioPerPage,
			);
		}

		this.meta.setCount(this.services.length);
		this.services = this.services.map((radio) => radio.convert());
	}
}

module.exports = RadiosByFilters;
