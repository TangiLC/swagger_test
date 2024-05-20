const tools = require('../tools');

/**
 *	Cette classe représente la forme de la table decrochage sur la BDD distante
 */
class Decrochage {
	constructor(data, logos, streams, tokenStreams, bearers) {
		this.id = data.id;
		this.rpID = data.rpID;
		this.rpIdMere = data.rpID_mere || data.id_mere;
		this.nom = Buffer.from(data.nom).toString();
		this.geofootprint = data.geofootprint;
		this.streams = streams.sort((a, b) => {if(b.type == 'hls' && a.type != b.type) return 1;else if(a.type == 'hls' && a.type != b.type) return -1; else return  b.bitrate - a.bitrate;});
		this.tokenStreams = tokenStreams;
		this.logos = logos.find((logo) => logo.rpID == data.rpID);
		this.bearers = bearers.filter((bearer) => bearer.rpID == data.rpID);
	}

	isInGeo(lat, long) {
		return tools.isIn(this.geofootprint, lat, long);
	}
}

module.exports = Decrochage;
