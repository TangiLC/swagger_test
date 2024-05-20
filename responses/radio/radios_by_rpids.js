const GenericResponse = require('../generic_response');

/*
 *	Cette classe représente la forme de la réponse utilisée
 *	pour l'endpoint /ids/:idrps
 */
class RadiosByRpIds extends GenericResponse {
	constructor(services, params) {
		params.type = 'radios by rpids';
		super(params);

		let radios = [];
		let ids_list = params.idrps.split(',');
		for (let ids_list_it = 0; ids_list_it < ids_list.length; ids_list_it++) {
			let radio = services.bdd_radios.find((radio) => radio.rpID == ids_list[ids_list_it]);
			if (radio) {
				radios.push(radio.convert());
			}
		}

		this.services = radios;
	}
}

module.exports = RadiosByRpIds;
