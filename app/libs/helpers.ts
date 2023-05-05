export const multipleEventListener = (
	type: string,
	events: string[],
	el: any,
	handler: () => void
) => {
	events.forEach((event: string) => {
		if (type === "add") {
			el.addEventListener(event, handler);
		} else {
			el.removeEventListener(event, handler);
		}
	});
};
