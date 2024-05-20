const Enum = require('../../enum');
const GenericResponse = require('../generic_response');

class Radios_Recommendations_WW extends GenericResponse {
	constructor(data, params) {
		super({ type: 'recommendations wweb', ...params });
		this.items = [
			...data.bdd_radios_prio_asso.filter((radio) => !radio.groupServices).sort(() => Math.random() - 0.5),
			...this.getNoPriorityRadio(data, params),
			...data.bdd_webradios_noprio_indes.sort(() => Math.random() - 0.5),
		];

		// Adding between 11th and 24th one of : TSF Jazz(701), Radio Classique(312), Radio Nova(313)
		const GoldRadiosLowerPosition = 11;
		const new_spe = [701, 312, 313];
		const selectedSpe = new_spe.sort(() => Math.random() - 0.5)[0];
		const radioSpe = data.bdd_radios.find((radio) => radio.rpID == selectedSpe);
		this.items.splice(Math.floor(GoldRadiosLowerPosition + Math.random() * (Enum.Qty.RadiosALaUne - GoldRadiosLowerPosition)), 0, radioSpe);
		this.items = this.items.splice(0, Enum.Qty.RadiosALaUne).map((radio) => radio.rpID);
		this.meta.setCount(this.items.length);
	}

	getNoPriorityRadio(data, params) {
		let grp_1;
		let grp_2;
		if (
			params &&
			params.latitude &&
			!isNaN(parseFloat(params.latitude)) &&
			params.latitude &&
			!isNaN(parseFloat(params.longitude))
		) {
			const latitude = parseFloat(params.latitude);
			const longitude = parseFloat(params.longitude);
			grp_1 = data.bdd_radio_noprio_asso_not_indes.filter(
				(radio) => !radio.geofootprint || radio.isInGeo(latitude, longitude),
			);
			grp_2 = data.bdd_radio_noprio_asso_indes.filter(radio => radio.isInGeo(latitude, longitude));
			if (grp_2.length < Enum.IndeRadio.NoPrioRadiosALaUneQty) {
				grp_2 = grp_2.concat(
					data.bdd_radio_noprio_asso_indes
						.filter((radio) => !radio.groupServices && !grp_2.includes(radio))
						.sort(() => Math.random() - 0.5)
						.slice(0, Enum.IndeRadio.NoPrioRadiosALaUneQty - grp_2.length),
				);
			} else {
				if (grp_2.length > Enum.IndeRadio.NoPrioRadiosALaUneQty) {
					grp_2 = grp_2.slice(0, Enum.IndeRadio.NoPrioRadiosALaUneQty);
				}
			}
		} else {
			grp_1 = data.bdd_radio_noprio_asso_not_indes.filter((radio) => !radio.geofootprint);
			grp_2 = data.bdd_radio_noprio_asso_indes
				.filter((radio) => !radio.groupServices)
				.sort(() => Math.random() - 0.5)
				.slice(0, Enum.IndeRadio.NoPrioRadiosALaUneQty);
		}
		let res = grp_1.concat(grp_2).sort(() => Math.random() - 0.5);
		return res;
	}
}

module.exports = Radios_Recommendations_WW;
