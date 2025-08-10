export default {

	timestampToStr(value) {
		if (!value) {
			return '';
		}

		const date = new Date(value * 1000);
		const month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1); // getMonth() is zero-based
		const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
		const hh = (date.getHours() < 10 ? '0' : '') + date.getHours();
		const mm = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		const ss = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

		return [date.getFullYear(), month, day].join('-') + ' ' + [hh, mm, ss].join(':');
	},

	dateToStr(date) {
		const mm = date.getMonth() + 1; // getMonth() is zero-based
		const dd = date.getDate();

		return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('-');
	},

	today() {
		const begin = new Date();
		const end = new Date();
		return [this.dateToStr(begin), this.dateToStr(end)];
	},

	yesterday() {
		const begin = new Date();
		const end = new Date();
		begin.setDate(begin.getDate() - 1);
		end.setDate(end.getDate() - 1);
		return [this.dateToStr(begin), this.dateToStr(end)];
	},
	
	day7() {
		const begin = new Date();
		const end = new Date();
		begin.setDate(begin.getDate() - 6);
		return [this.dateToStr(begin), this.dateToStr(end)];
	},
	
	day30() {
		const begin = new Date();
		const end = new Date();
		begin.setDate(begin.getDate() - 29);
		return [this.dateToStr(begin), this.dateToStr(end)];
	},


	month() {
		const date = new Date();

		const begin = new Date(date.getFullYear(), date.getMonth(), 1);
		const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		return [this.dateToStr(begin), this.dateToStr(end)];
	},

	subMonth() {
		const date = new Date();

		const begin = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		const end = new Date(date.getFullYear(), date.getMonth(), 0);

		return [this.dateToStr(begin), this.dateToStr(end)];
	},

	year() {
		const date = new Date();

		const begin = new Date(date.getFullYear(), 0, 1);
		const end = new Date(date.getFullYear(), 12, 0);

		return [this.dateToStr(begin), this.dateToStr(end)];
	},

}