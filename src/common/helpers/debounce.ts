const debounce = <F extends (...args: any) => any>(fn: F, delay: number) => {
	let timerId: any = null;

	return (...args: any) => {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			fn(args);
			timerId = null;
		}, delay);
	};
};

export default debounce;
