const assert = require('assert');

const DataManager = require('../managers/data_m');

const Enum = require('../enum');

describe('/categorie endpoints', () => {
	let categories;
	let dataManager;

	before(async () => {
		dataManager = new DataManager().getInstance();
		await dataManager.collectData();
	});

	describe("Résultat sans paramètre d'entrés : ", () => {
		before(() => {
			categories = dataManager.getCategoriesM().getCategories(null, dataManager.getRadiosM());
		});

		it("Le résultat n'est pas null.", () => {});

		it("Le résultat est composé d'un tableau d'API_Categorie.", () => {});

		it("Le résultat est composé d'autant de catégorie qu'il y en a en BDD. (moins Indés Radios et France Bleue)", () => {});

		it('Toutes les catégories ont un id valide. (integer)', () => {});

		it('Toutes les catégories ont un name valide. (string - length > 3)', () => {});

		it('Les services de catégorie sont un tableau de rpIDs. (tab integer - length > 0)', () => {});

		it('Tous les services sont correctement catégorisés.', () => {});

		it('Les services sont rangés comme attendu.', () => {
			// Les radios prioritaires sont toujours les premières radios de categorie.services
		});

		it("La première catégorie doit être 'A découvrir' ayant l'id " + Enum.CategorieID.ADecouvrir + ' .', () => {});

		it('A partir de la 6ème catégorie est effectué un rangement alphabétique.', () => {});
	});

	describe("Résultat avec paramètres d'entrés : ", () => {
		// Tous les points précédent sans paramètre

		it('Si le paramètre favourites est mal saisie la réponse envoyée est celle sans prise en compte de favoris.', () => {});

		it('Si le paramètre favourites est saisie la réponse envoyée est la liste des catégories où celle en favoris sont placées à partir de la deuxième position.', () => {});

		/*
        it("Si le paramètre lattitude est mal saisie la réponse envoyée est celle sans prise en compte de la géolocalisation.", () => {
        });
    
        it("Si le paramètre longitude est mal saisie la réponse envoyée est celle sans prise en compte de la géolocalisation.", () => {
        });
    
        it("Si le paramètre latitude et longitude est saisie sans que favourites ne le soit alors la réponse envoyée est celle sans prise en compte de la géolocalisation.", () => {
        });
        */
	});
});
