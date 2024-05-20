/**
 * This class show query and response metadata.
 * @typedef {object} Meta
 * @property {integer} count - Element quantity
 * @property {string} type.required - Response type
 */
class Meta {
	/**
	 * @param {object} params.required - Query parameters
	 */
	constructor(params) {
		const __this = this;
		for (let key in params) {
			__this[key] = params[key];
		}
	}

	setCount(itemsCount) {
		this.count = itemsCount;
	}

	setPagesCount(itemTotal, pageCount) {
		this.pagesCount = Math.ceil(itemTotal / pageCount);
	}
}

module.exports = Meta;
