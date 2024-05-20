/**
 * @typedef {object} Stream
 * @property {string} quality.required - quality stream name - eg: icecast, hls
 * @property {string} url.required - stream url - eg: https://...
 * @property {string} mimeValue.required - stream MIME - eg: audio/mpeg
 * @property {number} bitrate.required - stream biterate - eg: 128000
 */
class Stream {
	/**
	 * @param {string} quality.required - nom de la qualité de stream
	 * @param {string} url.required - url du stream
	 * @param {string} mimeValue.required - MIME du stream
	 * @param {number} bitrate.required - biterate du stream
	 */
	constructor(quality, url, mimeValue, bitrate) {
		this.quality = quality;
		this.url = url;
		this.mimeValue = mimeValue;
		this.bitrate = bitrate;
	}
}

module.exports = Stream;
