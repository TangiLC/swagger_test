describe('Radios par filtre', function () {
	it("Le résultat n'est pas null.", () => {});

	it("Le résultat est une instance de 'Radios_By_Filters'.", () => {});

	it("Le résultat comporte des 'meta'.", () => {});

	it("Les 'meta' ont un 'type' dont la valeur est \"radios by filters\".", () => {});

	it("Les 'meta' sont composés des attributs des paramètres de la requêtes.", () => {});

	it("Les 'meta' sont composés de l'attribut itemQty dont la valeur représente le nombre de 'services'.", () => {});

	it("Le résultat comporte une liste d'élément sous l'attribut 'services'.", () => {});

	it("Les 'services' sont des instances de 'ApiRadio'.", () => {});

	it("Les 'ApiRadio' sont composés d'un attribut 'rpID' dont la valeur est un chiffre.", () => {});

	it("Les 'ApiRadio' sont composés d'un attribut 'stream' dont la valeur est une liste d'instance de 'Stream'.", () => {});

	it("Les 'Stream' sont composés des attribut 'quality', 'url', 'mimeValue' et 'bitrate'.", () => {});

	it("Les 'ApiRadio' sont composés d'un attribut 'image' dont la valeur est une instance de 'Logo'.", () => {});

	it("Les 'Logo' sont composés des attribut 'url', 'mimeValue', 'width' et 'height'.", () => {});

	it(
		"Les 'Logo' ont la valeur de leur 'width', 'height' et 'mimeValue' respectivement à " +
			Enum.Multimedia.Width +
			' , ' +
			Enum.Multimedia.Height +
			' et + ' +
			Enum.Multimedia.MimeValue +
			'.',
		() => {},
	);

	it("Les 'ApiRadio' sont composés d'un attribut 'categories' dont la valeur est une liste d'instance de 'Radio_Categorie'.", () => {});

	it("Les 'Radio_Categorie' sont composés des attribut 'id' (un chiffre) puis 'name' et 'href' qui sont  et des chaines de caractère.", () => {});

	it("Les 'Radio_Categorie' sont composés d'un attribut 'rpID' dont la valeur est un chiffre.", () => {});

	describe('sans filtre', function () {
		it("Les 'services' sont composés des services prioritaires, des radios et des services France Bleue non prioritaire.", () => {});

		it("Les 'services' sont rangés par les services prioritaires d'abord puis les autres type.", () => {});

		it("Les 'services' ont leur services prioritaires rangés aléatoirement.", () => {});

		it("Les 'services' ont les autres services, que les services prioritaires, qui la compose rangés alphabétiquement.", () => {});
	});

	describe('avec le filtre page uniquement', function () {
		it("Les 'services' sont au nombre de " + Enum.Qty.RadioPerPage + '.', () => {});

		it("Les 'meta' sont composés de l'attributs 'pagesQty'.", () => {});

		it("Les 'services' sont rangés de la même manière que l'appel 'sans filtre' mais par page.", () => {});

		it("Les 'services' ont les autres services, que les services prioritaires, qui la compose rangés alphabétiquement.", () => {});
	});

	describe('avec le filtre home à 1', function () {
		it("Les 'services' sont composés de tous les services ayant l'attribut onboarding différent de 0.", () => {});

		it("Les 'services' sont rangés par ordre de priorité puis par ordre alphabétique.", () => {});

		describe('avec le filtre page', function () {
			it("Les 'services' sont rangés de la même manière que l'appel ce sans filtre mais par page.", () => {});
		});
	});

	describe('avec le filtre cat', function () {
		it("Les 'services' sont composés des services ayant un rpID différent de 0 et faisant partie de la catégorie passée en paramètre.", () => {});

		it("Les 'services' sont rangés par ordre de priorité puis par ordre alphabétique.", () => {});

		describe('avec le filtre page', function () {
			it("Les 'services' sont rangés de la même manière que l'appel sans ce filtre mais par page.", () => {});
		});

		describe('avec le filtre home à 1', function () {
			it("Les 'services' sont composés des services ayant un rpID différent de 0, faisant partie de la catégorie passée en paramètre et ayant onboarding différent de 0.", () => {});

			describe('avec le filtre page', function () {
				it("Les 'services' sont rangés de la même manière que l'appel sans ce filtre mais par page.", () => {});
			});
		});
	});

	describe('avec le filtre type', function () {
		it("Les 'services' sont composés des services ayant un type passée en paramètre.", () => {});

		it("Les 'services' sont rangés par ordre de priorité puis par ordre alphabétique.", () => {});

		describe('avec le filtre page', function () {
			it("Les 'services' sont rangés de la même manière que l'appel sans ce filtre mais par page.", () => {});
		});

		describe('avec le filtre home à 1', function () {
			it("Les 'services' sont composés des services ayant un rpID différent de 0, faisant partie de la catégorie passée en paramètre et ayant onboarding différent de 0.", () => {});

			describe('avec le filtre page', function () {
				it("Les 'services' sont rangés de la même manière que l'appel sans ce filtre mais par page.", () => {});
			});
		});

		describe('avec le filtre cat', function () {
			it("Les 'services' sont composés des services ayant un type passée en paramètre, ayant un rpID différent de 0 et faisant partie de la catégorie passée en paramètre.", () => {});

			it("Les 'services' sont rangés par ordre de priorité puis par ordre alphabétique.", () => {});

			describe('avec le filtre page', function () {
				it("Les 'services' sont rangés de la même manière que l'appel sans ce filtre mais par page.", () => {});
			});

			describe('avec le filtre home à 1', function () {
				it("Les 'services' sont composés des services ayant un rpID différent de 0, faisant partie de la catégorie passée en paramètre et ayant onboarding différent de 0.", () => {});

				describe('avec le filtre page', function () {
					it("Les 'services' sont rangés de la même manière que l'appel sans ce filtre mais par page.", () => {});
				});
			});
		});
	});
});
