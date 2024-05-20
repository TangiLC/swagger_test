const Enum = require('../../../enum');

const Group_Radio = require('./group_radio');
const Service_Radio = require('./service_radio');
const ApiRadio = require('./api_radio');

/* 24 places disponibles
 *   23 places pour les niveaux 1 et 2
 *   1 place pour le niveau 3
 * A placer :
 *   Jusqu'à 6 duplications si des favoris sont envoyés dans la requête
 *   Toutes les radios de niveau 1
 *   Toutes les radios de niveau 2 dans les 24 positions (dont 4 Les Indés Radios, géolocalisées si dans la requête)
 *   1 radio de niveau 3 entre les positions 9 et 20
 */
class Radios_Recommendations {
	constructor(data, params) {
		this.isLocalized = params && !isNaN(parseFloat(params.latitude)) && !isNaN(parseFloat(params.longitude));

		const favourites =
			params && params.favourites
				? params.favourites.includes(',')
					? params.favourites.split(',').filter((id) => id && !isNaN(parseFloat(id)))
					: !isNaN(parseFloat(params.favourites))
					? [params.favourites]
					: []
				: [];
		// Récupérer jusqu'à 6 duplications des favoris de l'utilisateur
		const rpIDsDuplications = new Set(
			favourites
				.map(
					(id) =>
						data.bdd_radios.find((radio) => radio.rpID == id) ||
						data.bdd_radios.find((radio) => radio.rpID == data.decrochages.getMereRpId(id)),
				)
				.filter((radio) => radio)
				.map((radio) => radio.duplications)
				.reduce((result, nextDuplications) => result.concat(nextDuplications), '')
				.split(','),
		);
		const duplications = [...rpIDsDuplications]
			.map(
				(id) =>
					data.bdd_radios.find((radio) => radio.rpID == id) ||
					data.bdd_radios.find((radio) => radio.rpID == data.decrochages.getMereRpId(id)),
			)
			.filter((radio) => radio)
			.filter((indesRadio) => indesRadio.priorite != Enum.Priority.WebradiosNoPrio)
			.sort(() => Math.random() - 0.5)
			.slice(0, Enum.Recommendations.RadiosDuplicationToAdd);

		// Ajouter 4 services des Indés Radios (géolocalisées en priorité puis non géolocalisées)
		const localizedIndesRadio = this.isLocalized
			? data.bdd_services_indes_localized
					.filter(
						(indesRadio) =>
							indesRadio.isInGeo(parseFloat(params.latitude), parseFloat(params.longitude)) &&
							indesRadio.priorite < Enum.Priority.WebradiosNoPrio,
					)
					.sort(() => Math.random() - 0.5)
					.slice(0, Enum.Recommendations.RadiosIndesToAdd)
			: [];
		const indeRadiosToAdd =
			localizedIndesRadio.length < 4
				? localizedIndesRadio.concat(
						data.bdd_radios_indes_no_localized
							.filter((indesRadio) => indesRadio.priorite < Enum.Priority.WebradiosNoPrio)
							.sort(() => Math.random() - 0.5)
							.slice(0, Enum.Recommendations.RadiosIndesToAdd - localizedIndesRadio.length),
				  )
				: localizedIndesRadio;

		let franceBleuToAdd = data.bdd_radios_france_bleu.find((franceBleuRadio) =>
			franceBleuRadio.isInGeo(parseFloat(params.latitude), parseFloat(params.longitude)),
		);
		if (!franceBleuToAdd) franceBleuToAdd = data.bdd_radios_france_bleu[0];

		// Ajouter toutes les radios priorites à 1 + les duplications + 1 indés radio
		this.recommandations = [
			...new Set(
				data.bdd_radios_prio_asso
					.concat(indeRadiosToAdd.slice(indeRadiosToAdd.length - 1, indeRadiosToAdd.length))
					.concat([franceBleuToAdd])
					.concat(duplications),
			),
		];

		// Ajouter des radios non prio associés jusqu'à 23 éléments
		this.recommandations = this.recommandations.concat(
			data.bdd_radio_noprio_asso_not_indes
				.filter((radio) => !this.recommandations.includes(radio))
				.sort(() => Math.random() - 0.5)
				.slice(
					0,
					Enum.Recommendations.RadiosToAdd -
						Enum.Recommendations.RadiosGoldToAdd -
						this.recommandations.length -
						(indeRadiosToAdd.length - 1),
				)
				.concat(indeRadiosToAdd.slice(0, indeRadiosToAdd.length - 1))
				.sort(() => Math.random() - 0.5),
		);

		// Toutes les radios de niveau 1 dans les 12 premières positions
		this.recommandations = this.recommandations
			.slice(0, Enum.Recommendations.RadiosPrioAssoMaxPosition - 1)
			.sort(() => Math.random() - 0.5)
			.concat(this.recommandations[Enum.Recommendations.RadiosPrioAssoMaxPosition - 1])
			.concat(
				this.recommandations
					.slice(Enum.Recommendations.RadiosPrioAssoMaxPosition, this.recommandations.length)
					.sort(() => Math.random() - 0.5),
			);

		// Ajouter une radio gold entre la position 9 et 20
		const goldsRadio = data.bdd_radios_gold
			.sort(() => Math.random() - 0.5)
			.slice(0, Enum.Recommendations.RadiosGoldToAdd);
		this.recommandations.splice(Math.floor(8 + Math.random() * 11), 0, ...goldsRadio);
	}

	toApp(data, params) {
		const franceBleuRadioIndex = this.recommandations.findIndex((radio) =>
			radio.categorized(Enum.CategorieID.FranceBleu),
		);
		this.recommandations[franceBleuRadioIndex] = new Group_Radio(
			Enum.CategorieID.FranceBleu,
			data.bdd_radios_france_bleu,
		);
		const firstIndesRadioIndex = this.recommandations.findIndex(
			(radio) => !(radio instanceof Group_Radio) && radio.groupeId == Enum.GroupeId.IndesRadios,
		);
		this.recommandations[firstIndesRadioIndex] = new Group_Radio(
			Enum.CategorieID.IndesRadios,
			data.bdd_radio_noprio_asso_indes,
		);

		this.recommandations = this.recommandations.map((radio) => {
			if (radio instanceof Group_Radio) return radio;
			if (this.isLocalized) {
				const decrochageRpID = data.decrochages.get(
					radio.rpID,
					Number(params.latitude.replace(',', '.')),
					Number(params.longitude.replace(',', '.')),
				);
				if (decrochageRpID) return new Service_Radio(decrochageRpID);
			}
			return new Service_Radio(radio.rpID);
		});
		return this.recommandations;
	}

	toAppleTV(data, req) {
		const franceBleuIndex = this.recommandations.findIndex((radio) =>
			radio.categorized(Enum.CategorieID.FranceBleu),
		);
		this.recommandations.splice(franceBleuIndex, 1);
		if (this.recommandations.length < 24) {
			const radioToAdd = data.bdd_radio_noprio_asso_not_indes.filter(radio => !this.recommandations.includes(radio));
			this.recommandations = this.recommandations.concat(radioToAdd).slice(0,Enum.Recommendations.RadiosToAdd);
		}
		if('Basic ' + Buffer.from('renault:msB4jQHj5d63').toString('base64') == req.headers.authorization){
			const renaultStation = new ApiRadio({rpID: 2437, streams: []});
			this.recommandations.unshift(renaultStation);
		}
		return this.recommandations.map((radio) => radio.toAppleTV(Enum.AppleTVFactor.Trending));
	}

	toWeb() {
		return this.recommandations.map((radio) => radio.convert());
	}
}

module.exports = Radios_Recommendations;
