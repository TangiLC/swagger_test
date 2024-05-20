/**
 * @typedef {object} StreamSource
 * @property {string} url.required - stream source type - eg: 'https://...'
 * @property {string} mimeValue.required - stream bitRate - eg: 'audio/mpeg'
 */
class StreamSource {
	constructor(data) {
		this.url = data.audio_url ? data.audio_url : data.url;
		this.mimeValue = data.mime ? data.mime : 'audio/mpeg';
	}
}

module.exports = StreamSource;
