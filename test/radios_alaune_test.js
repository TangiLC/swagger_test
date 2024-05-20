describe('Radios à la une', function () {
	it("Le résultat n'est pas null.", () => {});

	it("Le résultat est une instance de 'MobileRecommendations'.", () => {});

	it("Le résultat comporte des 'meta'.", () => {});

	it("Les 'meta' ont un 'type' dont la valeur est \"radios a la une\".", () => {});

	it("Les 'meta' sont composés des attributs des paramètres de la requêtes.", () => {});

	it("Le résultat comporte une liste d'élément sous l'attribut 'items'.", () => {});

	it("Les 'items' sont une composition d'instance de 'Service_Radio' et de 'Group_Radio'.", () => {});

	it("Les 'Service_Radio' sont composés d'un attribut 'type' dont la valeur est \"service\".", () => {});

	it("Les 'Service_Radio' sont composés d'un attribut 'services' dont la valeur est une liste d'exactement 1 'rpID'.", () => {});

	it("Les 'Group_Radio' sont composés d'un attribut 'type' dont la valeur est \"group\".", () => {});

	it("Les 'Group_Radio' sont composés d'un attribut 'services' dont la valeur est une liste d'un, ou plus, 'rpID'.", () => {});

	it("Les 'Group_Radio' sont composés d'un attribut 'name' dont la valeur n'est pas vide.", () => {});

	it('Les \'name\' de \'Group_Radio\' ne peuvent être que "FRANCE BLEU" ou "LES INDES RADIOS"', () => {});

	it("Les 'Group_Radio' sont composés d'un attribut 'multimedia' dont la valeur est une instance de 'Localization_Logo'.", () => {});

	it("Le 'multimedia' des 'Group_Radio' sont composés d'attribut 'width' et 'height' dont la valeur est 1400.", () => {});

	it("Le 'multimedia' des 'Group_Radio' possède un attribut 'mimeValue' de valeur \"image/png\".", () => {});

	describe('sans géoloc', function () {
		it('Les items sont au nombre de ' + Enum.Qty.RadiosALaUne + '.', () => {});

		it(
			"Les 'items' démarrent par les duplications des favoris passé en paramètre d'appel, jusqu'à un nombre de " +
				Enum.Qty.DuplicationALaUne +
				'.',
			() => {},
		);

		it("Les 'items' n'étant pas des 'Group_Radio' sont rangés dans l'ordre suivant : duplications / radios prioritaires / radios non-prioritaires / webradios prioritaires.", () => {});

		it("Les 'items' contiennent au moins l'une des radios suivantes à partir de l'indice 11 : TSF Jazz(701), Radio Classique(312), Radio Nova(313).", () => {});

		it(
			'Les radios non prioritaires sont composées de ' +
				Enum.IndeRadio.NoPrioRadiosALaUneQty +
				"radios 'Indés Radios'.",
			() => {},
		);
	});

	describe('avec géoloc', function () {
		it('Les items sont au nombre de ' + Enum.Qty.RadiosALaUne + '.', () => {});

		it(
			"Les 'items' démarrent par les duplications des favoris passé en paramètre d'appel, jusqu'à un nombre de " +
				Enum.Qty.DuplicationALaUne +
				'.',
			() => {},
		);

		it("Les 'items' n'étant pas des 'Group_Radio' sont rangés dans l'ordre suivant : duplications / radios prioritaires / radios non-prioritaires / webradios prioritaires.", () => {});

		it("Les 'items' contiennent au moins l'une des radios suivantes à partir de l'indice 11 : TSF Jazz(701), Radio Classique(312), Radio Nova(313).", () => {});

		it(
			'Les radios non prioritaires sont composées de ' +
				Enum.IndeRadio.NoPrioRadiosALaUneQty +
				"radios 'Indés Radios'.",
			() => {},
		);

		it(
			'En cas de géolocalisation, les radios non prioritaires sont composées de ' +
				Enum.IndeRadio.NoPrioRadiosALaUneQty +
				"radios 'Indés Radios' dont le maximum sont géolocalisés.",
			() => {},
		);
	});
});
