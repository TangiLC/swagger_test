const GenericResponse = require('../generic_response');
const Enum = require('../../enum');

class RadiosCategories extends GenericResponse {
	constructor(bddCategories) {
		super({ type: 'radios categories' });
		const categories = bddCategories.filter((categorie) => categorie.onboarding);
		const toDiscoverCategorie = bddCategories.find((categorie) => categorie.id == Enum.CategorieID.ADecouvrir);
		const start = toDiscoverCategorie ? [toDiscoverCategorie].concat(categories) : categories;
		const categoriesNeededToBeSorted = start.slice(5, start.length).sort((a, b) => {
			const nom_a = a.nom.toUpperCase();
			const nom_b = b.nom.toUpperCase();
			if (nom_a < nom_b) return -1;
			if (nom_a > nom_b) return 1;
			return 0;
		});

		this.categories = start
			.slice(0, 5)
			.concat(categoriesNeededToBeSorted)
			.map((categorie) => categorie.convert());

		this.meta.setCount(this.categories.length);
	}

	fillServices(services, limit) {
		this.categories.forEach((categorie) => {
			let qty = 0;
			services.forEach((service) => {
				if ((!limit || qty < limit) && service.categorized(categorie.id)) {
					categorie.addService(service.rpID);
					qty++;
				}
			});
		});
	}

	fulfilServices(radiosManager, localization) {
		this.categories.forEach((categorie) => categorie.resetServices());
		const services = radiosManager.getServices(localization);
		this.fillServices(radiosManager.radios.bdd_radios_prio_asso);
		this.fillServices(radiosManager.radios.bdd_radio_noprio_asso);
		this.fillServices(radiosManager.radios.bdd_radios_gold);
		this.fillServices(services.indes, Enum.Qty.RadiosIndePerCategories);
		this.fillServices(services.bleue, Enum.Qty.RadiosBleuPerCategories);
		this.fillServices(services.radios_non_prio);
		this.fillServices(services.radios_non_prio_tout);
		this.fillServices(radiosManager.radios.bdd_services_indes);
		this.sortServices(radiosManager, localization);
		this.fillServices(services.web_radios);
		this.fillServices(radiosManager.radios.bdd_webradios_noprio);
		this.fillServices(radiosManager.radios.bdd_radios_basic);
		this.categories.forEach((categorie) => {
			categorie.services = [...new Set(categorie.services)];
		});
	}

	sortByFavorites(favourites) {
		for (let i = favourites.length - 1; i >= 0; i--) {
			const cat = this.categories.find((cat) => cat.id == favourites[i]);
			if (cat) {
				this.categories.splice(
					this.categories.findIndex((cat) => cat.id == favourites[i]),
					1,
				);
				this.categories.splice(0, 0, cat);
			}
		}
	}

	sortServices(radiosManager, localization) {
		this.categories.forEach((categorie) => {
			if (categorie.services.length > Enum.Qty.ShownServicesCategorie) {
				if (!localization) {
					categorie.services = radiosManager.sortUnlockalizedBoardServices(categorie.services);
				}
				let board_services = categorie.services.splice(0, Enum.Qty.ShownServicesCategorie);
				board_services.sort(() => Math.random() - 0.5);
				board_services = radiosManager.sortServicesByPriority(board_services);
				const other_services = radiosManager.sortServicesByNameAndType(categorie.services);
				categorie.services = board_services.concat(other_services);
			} else {
				categorie.services.sort(() => Math.random() - 0.5);
				categorie.services = radiosManager.sortServicesByPriority(categorie.services);
			}
		});
	}
}

module.exports = RadiosCategories;
