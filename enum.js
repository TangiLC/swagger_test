const Authorization = [
	'cosmos:u2wHL3h2J',
	'allinmedia:aMh29WqN3',
	'siteweb:6Mh8Pc2nK',
	'nuuk_applewatch:65fHkJSy8',
	'kuun_appletv:fds59ZA4A',
	'bkns_apple:8zfe89Sd4',
	'ukun_freebox:ds9r43xn',
	'conjure:G8FbJt9Dn39x',
	'rp_ww:azda786zcfst',
	'backoffice:5oidfds58rbq',
	'kebula:q89adr2zx',
	'renault:msB4jQHj5d63'
];

const AuthorizationAPI = 'siteweb:nkZ6LRq76';

const IndeRadio = {
	PrioOnboardingQty: 1,
	NoPrioOnboardingQty: 4,
	NoPrioRadiosALaUneQty: 3,
};

const Index = {
	RadiosPrioritaires: 1,
	RadiosNonPrioritaires: 2,
	RadiosNonPrioritairesCatSup: 5,
	WebRadios: 3,
	RadiosInde: 4,
	RadiosFranceBleue: 6,
	WebRadiosCatSup: 7,
};

const Multimedia = {
	Height: 1400,
	Index: 0,
	Langage: 'fr',
	MimeValue: 'image/png',
	Width: 1400,
};

const Onboarding = {
	RadioIndesNoLocalized: 1,
	RadioIndesLocalizedApp: 3,
	RadioIndesLocalizedAppleTV: 4,
	RadioFranceBleu: 1,
};

const Qty = {
	DuplicationALaUne: 6,
	RadiosALaUne: 24,
	RadioBleuOnboarding: 1,
	RadiosPrio: 5,
	RadiosBleuPerCategories: 1,
	RadiosIndePerCategories: 2,
	RadioPerPage: 25,
	ShownServicesCategorie: 10,
	PodcastTop: 50,
	PodcastIndePlusTop: 6,
	PodcastFranceBleuePlusTop: 3,
	PodcastIndeAutresTop: 4,
	PodcastFranceBleueAutresTop: 2,
};

const CategorieID = {
	IndesRadios: 9,
	ADecouvrir: 25,
	FranceBleu: 30,
};

const Timer = {
	BDDRefresh: 3600000, //43200000 en milliseconde
	MetaOnError: 30000,
};

const AppleTVFactor = {
	Affinity: 'AFFINITY',
	Trending: 'TRENDING',
};

const Type = {
	Radio: '1',
	Webradio: '2',
};

const GroupeId = {
	IndesRadios: 2,
};

const Priority = {
	RadiosPrioAssocies: 1, // Radios prioritaires des Associés (1 radio par groupe Associé)
	RadiosNonPrioAssocies: 2, // Radio non-prioritaire des Associés
	RadiosGold: 3, // Radio adhérente gold
	RadiosNoPrio: 4, // Autres radios
	WebradiosNoPrio: 5, // Toutes les webradios (les Associés et les Adhérents)
	RadiosBasic: 6, // Toutes les radios ayant un contrat Basic
};

const AppFavorites = {
	RadiosIndesToAdd: 4,
	RadiosPrioAssoMaxPosition: 12,
};

const Recommendations = {
	RadiosGoldToAdd: 1,
	RadiosIndesToAdd: 5,
	RadiosDuplicationToAdd: 6,
	RadiosPrioAssoMaxPosition: 12,
	RadiosToAdd: 24,
};

module.exports = {
	AppFavorites,
	AppleTVFactor,
	Authorization,
	AuthorizationAPI,
	CategorieID,
	GroupeId,
	IndeRadio,
	Index,
	Multimedia,
	Onboarding,
	Priority,
	Qty,
	Recommendations,
	Timer,
	Type,
};
