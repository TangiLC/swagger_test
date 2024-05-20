const Multimedia = require('./multimedia');
const OnDemandStreams = require('./ondemandstreams');

const tools = require('../../../tools');

/**
 * @typedef {object} FeedOnDemand
 * @property {number} rpId.required - radio rpid - eg: 30
 * @property {Array.<Multimedia>} multimedia.required - images array.
 * @property {Array.<OnDemandStreams>} onDemandStreams.required - streams array.
 * @property {object} series.required - object with text id in it. - eg: {"id": "lafterfoot"}
 * @property {string} description.required - serie description. - eg: Une femme prétexte une alerte
 * @property {string} name.required - serie name. - eg: L'After Foot - C'était pas dans l'After ...
 * @property {string} id.required - odp crid id. - eg: odp:/crid://radioplayer.fr/od/04194977
 */
class FeedOnDemand {
	constructor(data, feedName) {
		this.rpId = data.rpID;
		this.multimedia = [new Multimedia(data.image)];
		this.onDemandStreams = [new OnDemandStreams(data)];
		this.series = { id: tools.sansAccent(feedName.replace(' ', '')).toLowerCase() };
		this.description = data.longDescription;
		this.name = data.longName;
		this.id = 'odp:/' + data.crid;
	}
}

module.exports = FeedOnDemand;
