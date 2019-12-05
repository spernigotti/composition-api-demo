/**
 * Produces a random number between the inclusive lower and upper bounds
 * @param {number} lower
 * @param {number} upper
 */
const random = (lower, upper) =>
	Math.floor(Math.random() * (upper - lower + 1)) + lower;

const delay = ms =>
	new Promise(resolve => {
		setTimeout(resolve, ms);
	});

export { random, delay };
