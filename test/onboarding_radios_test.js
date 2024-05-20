/*
const assert = require('assert');

const DataManager = require('../managers/data_m');
const ApiRadio = require('../models/api_radio');
const Stream = require('../models/subs/stream');
const Logo = require('../models/subs/logo');

const Enum = require('../enum');

const dataManager = new DataManager().getInstance();

function execute(){
    describe("Onboarding Radios", function() {

        let radios;
        let bdd_radios;

        describe("pour le site web", function() {
            this.retries(100);
            beforeEach(() => {
                radios = dataManager.getRecommendationsWeb();
                bdd_radios = radios.services.map(radio => dataManager.radios.getBDDRadio(radio.rpID));
            });

            it("Le résultat n'est pas null.", () =>{
                assert.ok(radios);
            });

            it("Le résultat est composé de 25 radios.", () =>{
                assert.ok(radios.services.length == 25);
            });

            it("Les radios envoyés sont des ApiRadio.", () =>{
                assert.ok(radios.services.every(radio => radio instanceof ApiRadio));
            });

            it("Les radios ont leurs propriétés suivantes saisies : rpID, nom, type, description, streams, logo.", () =>{
                assert.ok(radios.services.every(radio => radio.rpID && radio.nom.length > 0 && Number(radio.type) && radio.description.length > 0 && radio.stream.length == 3 && radio.stream.every(stream => stream instanceof Stream) && radio.image instanceof Logo));
            });

            it("Le résultat contient " + Enum.Onboarding.RadioIndesNoLocalized + " radio(s) 'Indés Radios' sans geofootprint.", () =>{
                assert.ok(bdd_radios.filter(radio => radio.groupeId == 2 && (!radio.geofootprint || radio.geofootprint.length == 0)).length == Enum.Onboarding.RadioIndesNoLocalized);
            });

            it("Le résultat contient 1 radio 'Indés Radios' sans geofootprint dans les 6 premières places.", () =>{
                assert.ok(bdd_radios.findIndex(radio => radio.groupeId == 2 && (!radio.geofootprint || radio.geofootprint.length == 0)) < 6);
            });

            it("Le résultat contient " + Enum.Onboarding.RadioIndesLocalizedAppleTV + " radio(s) 'Indés Radios' avec geofootprint.", () =>{
                assert.ok(bdd_radios.filter(radio => radio.groupeId == 2 && radio.geofootprint.length != 0).length == Enum.Onboarding.RadioIndesLocalizedAppleTV);
            });

            it("Le résultat contient " + Enum.Onboarding.RadioFranceBleu + " radio(s) 'France Bleu'.", () =>{
                assert.ok(bdd_radios.filter(radio => radio.cat_5 == Enum.CategorieID.FranceBleu).length == Enum.Onboarding.RadioFranceBleu);
            });

            
        });

        describe("pour l'App mobile", function() {
            this.retries(100);

            beforeEach(() => {
                radios = dataManager.getOnboardingApp();
                bdd_radios = radios.services.map(radio => dataManager.radios.getBDDRadio(radio));
            });

            it("Le résultat n'est pas null.", () =>{
                assert.ok(radios);
            });

            it("Le résultat est composé de 27 radios.", () =>{
                assert.ok(radios.services.length == 27);
            });

            it("Les radios envoyés sont des rpID.", () =>{
                assert.ok(radios.services.every(radio => Number(radio)));
            });

            it("Le résultat contient " + Enum.Onboarding.RadioIndesNoLocalized + 3 + " radio(s) 'Indés Radios' sans geofootprint.", () =>{
                assert.ok(bdd_radios.filter(radio => radio.groupeId == 2 && (!radio.geofootprint || radio.geofootprint.length == 0)).length == Enum.Onboarding.RadioIndesNoLocalized + 3);
            });

            it("Le résultat contient 1 radio 'Indés Radios' sans geofootprint dans les 6 premières places.", () =>{
                assert.ok(bdd_radios.findIndex(radio => radio.groupeId == 2 && (!radio.geofootprint || radio.geofootprint.length == 0)) < 6);
            });

            it("Le résultat contient " + Enum.Onboarding.RadioIndesLocalizedApp + " radio(s) 'Indés Radios' avec geofootprint.", () =>{
                assert.ok(bdd_radios.filter(radio => radio.groupeId == 2 && radio.geofootprint.length > 0).length == Enum.Onboarding.RadioIndesLocalizedApp);
            });

            it("Le résultat contient " + Enum.Onboarding.RadioFranceBleu + " radio(s) 'France Bleu'.", () =>{
                assert.ok(bdd_radios.filter(radio => radio.cat_5 == Enum.CategorieID.FranceBleu).length == Enum.Onboarding.RadioFranceBleu);
            });
        });

    });
}

module.exports = {
    execute
}*/
