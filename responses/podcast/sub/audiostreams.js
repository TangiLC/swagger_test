const StreamSource = require('./streamsource');

/**
 * @typedef {object} AudioStreams
 * @property {StreamSource} streamSource.required - stream source type
 * @property {object} bitRate.required - stream bitRate - eg: {"target": 128000}
 */
class AudioStreams {
	constructor(data) {
		this.streamSource = new StreamSource(data);
		this.bitRate = {
			target: data.bitrate ? data.bitrate : 128000,
		};
	}
}

module.exports = AudioStreams;
