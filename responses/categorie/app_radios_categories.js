const RadiosCategories = require('./radios_categories');
const Enum = require('../../enum');

class AppRadiosCategories extends RadiosCategories {
	constructor(bddCategories, params, radiosManager) {
		super(bddCategories);
		const favourites = params.favourites ? this.getFavourites(params.favourites, radiosManager) : params.favourites;
		if (favourites) this.sortByFavorites(favourites);
		this.fulfilServices(radiosManager, params);
	}

	getFavourites(favourites, radiosManager) {
		const favouritesList = favourites.split(','); // On découpe la chaine de caractère reçue
		const categories = favouritesList
			// On ne garde que les favoris valides
			.filter((radioId) => !isNaN(Number(radioId)))
			// On charge les données des radios correspondants aux rpIds des favoris
			.map((radioId) => radiosManager.getBDDRadio(radioId))
			.filter((radio) => radio)
			// On extrait les catégories correspondant aux radios en supprimant les vides et non valides
			.map((radio) =>
				radio.categories.filter(
					(categorie) =>
						categorie != Enum.CategorieID.ADecouvrir &&
						categorie != Enum.CategorieID.FranceBleu &&
						categorie != Enum.CategorieID.IndesRadios,
				),
			);
		return categories.length > 0
			? categories
					// On fusionne les catégories de chaque radio en une seule liste
					.reduce((result, nextCats) => result.concat(nextCats))
					// On fusionne les duplications en conservant les occurences
					.reduce((result, cat) => {
						const catIndex = result.findIndex((ele) => ele.catId == cat);
						if (catIndex != -1) result[catIndex].occurence++;
						else result.push({ catId: cat, occurence: 1 });
						return result;
					}, [])
					// On range aléatoirement puis par occurence
					.sort(() => Math.random() - 0.5)
					.sort((a, b) => b.occurence - a.occurence)
					// On ne conserve que les 4 catégories ayant le plus d'occurence
					.slice(0, 4)
					// On renvoi une liste d'id de categorie
					.map((cat) => cat.catId)
			: [];
	}

	sortByFavorites(favourites) {
		for (let i = favourites.length - 1; i >= 0; i--) {
			let cat = this.categories.find((cat) => cat.id == favourites[i]);
			if (cat) {
				this.categories.splice(
					this.categories.findIndex((cat) => cat.id == favourites[i]),
					1,
				);
				this.categories.splice(1, 0, cat);
			}
		}
	}
}

module.exports = AppRadiosCategories;
