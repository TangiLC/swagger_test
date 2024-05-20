const levenshtein = require('js-levenshtein');

const GenericResponse = require('../generic_response');

const Enum = require('../../enum');
const Meta = require('../meta');
const ApiRadio = require('./sub/api_radio');

/**
 * @typedef {object} FiltredRadios
 * @property {Array.<ApiRadio>} services.required - radios correspondant aux filtres
 * @property {Meta} meta.required - Response metadata
 */
class RadiosByFilters extends GenericResponse {
	/**
	 * @param {Array.<Array.<Object>>} data.required - Array d'array des différentes catégories de radios
	 * @param {object} params.required - paramètre de la requête entrante
	 */
	constructor(data, params) {
		super(params);
		this.meta.type = 'radios by filters';

		if (!params || (!params.cat && !params.tag)) {
			this.services = data.bdd_radios_prio_asso
				.filter((radio) => radio.rpID != 0)
				.sort(() => Math.random() - 0.5)
				.concat(
					data.bdd_radios_filtred.concat(data.bdd_radios_france_bleu).sort((a, b) => {
						var nameA = a.nom.toUpperCase();
						var nameB = b.nom.toUpperCase();
						if (nameA < nameB) return -1;
						if (nameA > nameB) return 1;
						return 0;
					}),
				);
		} else {
			this.services = data.bdd_radios.filter((radio) => radio.rpID > 0);
			this.services = this.services.filter((radio) => !params.cat || radio.categorized(Number(params.cat)));
			if (params.tag) {
				const tag = params.tag
					.trim()
					.toLocaleLowerCase()
					.normalize('NFD')
					.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
				const splittedTags = params.tag.split(' ').map((el) =>
					el
						.trim()
						.toLocaleLowerCase()
						.normalize('NFD')
						.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
				);
				const test = this.services.filter(
					(service) =>
						service.priorite != 0 &&
						splittedTags.every((splittedTag) =>
							service.nom
								.trim()
								.toLocaleLowerCase()
								.normalize('NFD')
								.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
								.includes(splittedTag),
						),
				);
				this.services = this.services.filter(
					(service) =>
						service.priorite != 0 &&
						(splittedTags.every((splittedTag) =>
							service.nom
								.trim()
								.toLocaleLowerCase()
								.normalize('NFD')
								.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
								.includes(splittedTag),
						) ||
							levenshtein(
								service.nom
									.trim()
									.toLocaleLowerCase()
									.normalize('NFD')
									.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
								tag,
							) < 4),
				);
				this.services.sort((a, b) => {
					const bIncTag = splittedTags.every((splittedTag) =>
						b.nom
							.trim()
							.toLocaleLowerCase()
							.normalize('NFD')
							.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
							.includes(splittedTag),
					);
					const aIncTag = splittedTags.every((splittedTag) =>
						a.nom
							.trim()
							.toLocaleLowerCase()
							.normalize('NFD')
							.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
							.includes(splittedTag),
					);
					if (aIncTag && !bIncTag) {
						return -1;
					}
					if (!aIncTag && bIncTag) {
						return 1;
					}
					if (aIncTag && bIncTag) {
						if (b.priorite < a.priorite) {
							return 1;
						}
						if (b.priorite > a.priorite) {
							return -1;
						}
					}
					const bLeven = levenshtein(
						b.nom
							.trim()
							.toLocaleLowerCase()
							.normalize('NFD')
							.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
						tag,
					);
					const aLeven = levenshtein(
						a.nom
							.trim()
							.toLocaleLowerCase()
							.normalize('NFD')
							.replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
						tag,
					);
					if (bLeven > aLeven) {
						return 1;
					}
					if (bLeven < aLeven) {
						return -1;
					}
					if (b.priorite < a.priorite) {
						return 1;
					}
					if (b.priorite > a.priorite) {
						return -1;
					}
					return 0;
				});
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
