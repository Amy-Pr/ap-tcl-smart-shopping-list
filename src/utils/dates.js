export const ONE_DAY_IN_MILLISECONDS = 86400000;
export const CURRENT_DATE = new Date();

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * Compute days between two JavaScript Date objects.
 * @param {Date} starting date of interval
 * @param {Date} ending date of interval
 */
export function getDaysBetweenDates(startingDate, endingDate) {
	// normalize date by converting to time
	const startingDateInMilliseconds = startingDate.getTime();
	const endingDateInMilliseconds = endingDate.getTime();

	// calculate the number of days that elapsed between both times
	const daysElapsed = Math.floor(
		(endingDateInMilliseconds - startingDateInMilliseconds) /
			ONE_DAY_IN_MILLISECONDS,
	);

	return daysElapsed;
}

export function comparePurchaseUrgency(filteredList) {
	const activeItems = [];
	const inactiveItems = [];
	const today = new Date();

	for (let i = 0; i < filteredList.length; i++) {
		const item = filteredList[i];
		const dateLastPurchased = item.dateLastPurchased
			? item.dateLastPurchased.toDate()
			: today;
		const daysSinceLastPurchased = getDaysBetweenDates(
			dateLastPurchased,
			today,
		); //returns whole number
		const dateNextPurchased = item.dateNextPurchased.toDate();
		const daysUntilNextPurchase = getDaysBetweenDates(today, dateNextPurchased);
		console.log('daysSinceLastPurchased', daysSinceLastPurchased);
		console.log('dateNextPurchased', dateNextPurchased);

		if (
			daysSinceLastPurchased >= 60 &&
			today.getTime() > dateNextPurchased.getTime()
		) {
			item.urgency = 'inactive';
			inactiveItems.push(item);
		} else {
			if (
				daysSinceLastPurchased < 60 &&
				today.getTime() > dateNextPurchased.getTime()
			) {
				item.urgency = 'overdue';
				console.log('in overdue');
			}

			if (
				daysUntilNextPurchase < 7 &&
				today.getTime() < dateNextPurchased.getTime()
			) {
				item.urgency = 'soon';
				console.log('in soon');
			}

			if (daysUntilNextPurchase >= 7 && daysUntilNextPurchase <= 30) {
				item.urgency = 'kind of soon';
				console.log('in soonish');
			}

			if (daysUntilNextPurchase > 30) {
				item.urgency = 'not soon';
				console.log('in not soon');
			}

			activeItems.push(item);
		}
	}
	activeItems.sort((itemA, itemB) => {
		const dateNextPurchasedA = itemA.dateNextPurchased.toDate();
		const dateNextPurchasedB = itemB.dateNextPurchased.toDate();
		const itemANumOfDays = getDaysBetweenDates(today, dateNextPurchasedA);
		const itemBNumOfDays = getDaysBetweenDates(today, dateNextPurchasedB);
		if (itemANumOfDays < itemBNumOfDays) {
			return -1;
		}
		if (itemANumOfDays > itemBNumOfDays) {
			return 1;
		}
		return 0;
	});
	inactiveItems.sort((itemA, itemB) => {
		const dateNextPurchasedA = itemA.dateNextPurchased.toDate();
		const dateNextPurchasedB = itemB.dateNextPurchased.toDate();
		const itemANumOfDays = getDaysBetweenDates(today, dateNextPurchasedA);
		const itemBNumOfDays = getDaysBetweenDates(today, dateNextPurchasedB);
		if (itemANumOfDays < itemBNumOfDays) {
			return -1;
		}
		if (itemANumOfDays > itemBNumOfDays) {
			return 1;
		}
		return 0;
	});
	console.log('active: ', activeItems);
	console.log('inactive: ', inactiveItems);
	return [...activeItems, ...inactiveItems];
}

/* PSEUDOCODE FOR ISSUE #12:
 * 1. Write comparePurchaseUrgency function which sorts items by urgency status.
 *     - Take in list of filtered items as an argument and return a sorted list based on purchase urgency.
 *     - Purchase urgency will be assigned using getDaysBetween.
 *
 *	export function comparePurchaseUrgency(filteredList) {
 *		const active = []
 *		const inactive =[]
 *		today = new Date()
 *
 * 		filter items into active and inactive arrays in list:
 *	 		a. active:
 *	 			if (days since purchased < 60 AND today > dateNextPurchased)
 *					- assign urgency property "overdue"
 *				if (dateNextPurchased < 7 days)
 * 					- assign urgency property "soon"
 * 				if (dateNextPurchased between 7-30 days)
 * 					- assign urgency property "kind of soon"
 * 				if (dateNextPurchased > 30 days)
 *  				- assign urgency property "not soon"
 *				push to active
 * 			b. inactive:
 * 				if (days since purchased > 60 AND today > dateNextPurchased)
 * 					- assign urgency property "inactive"
 *				push to inactive
 *
 *		sort active items:
 *		(TODO: extrapolate comparator function out)
 *			active.sort((a, b) => {
 *				const numOfDaysForAItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				const numOfDaysForBItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				if (numOfDaysForAItem < numOfDaysForBItem){
 *					return -1}
 *				if (numOfDaysForAItem > numOfDaysForBItem){
 *					return 1}
 *				return 0
 *			})
 *		sort inactive items:
 *			inactive.sort((a, b) => {
 *				const numOfDaysForAItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				const numOfDaysForBItem = getDaysBetweenDates(today, nextPurchaseDate)
 *				if (numOfDaysForAItem < numOfDaysForBItem){
 *					return -1}
 *				if (numOfDaysForAItem > numOfDaysForBItem){
 *					return 1}
 *				return 0
 *			})
 * 		const sortedList = concatenate active and inactive arrays
 * 		return sortedList
 * 		}
 */
