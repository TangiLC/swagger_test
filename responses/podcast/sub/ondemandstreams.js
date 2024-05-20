const AudioStreams = require('./audiostreams');

/**
 * @typedef {object} OnDemandStreams
 * @property {string} player.required - NSP - eg: bff12585-d5e4-4481-be82-aa8bfe45e701
 * @property {Array.<AudioStreams>} audioStreams.required - audiostreams array
 * @property {number} duration.required - stream duration - eg: 1400
 * @property {string} availableStart.required - stream start date - eg: 2023-04-19T20:00:00.000Z
 * @property {string} availableStop.required - stream end date - eg: 2023-04-19T20:00:00.000Z
 */
class OnDemandStreams {
	constructor(data) {
		this.player = data.guid;
		this.audioStreams = [new AudioStreams(data)];
		this.duration = data.duration_secondes * 100;
		this.availableStart = data.start_time;
		this.availableStop = data.dead_time;
	}
}

module.exports = OnDemandStreams;
