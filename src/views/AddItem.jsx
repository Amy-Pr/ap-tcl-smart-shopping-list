import { useState } from 'react';
import { addItem } from '../api/firebase.js';

export function AddItem() {
	const [itemName, setItemName] = useState('');
	const [daysUntilNextPurchase, setDaysUntilNextPurchase] = useState(7);
	const [itemAdded, setItemAdded] = useState(false);
	const [error, setError] = useState(false);

	// TODO: dynamically pass in the list token so item is added to correct list
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addItem('my test list', {
				itemName,
				daysUntilNextPurchase,
			});
			setItemAdded(true);
			setError(false);
		} catch (e) {
			setError(true);
			setItemAdded(false);
		}
	};
	// TODO: implement clear input after user adds item to list
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor="item-name-input">Item name:</label>
				<input
					type="text"
					id="item-name-input"
					onChange={(e) => setItemName(e.target.value)}
				/>
				<fieldset>
					<legend>How soon will you buy this again?</legend>
					<input
						type="radio"
						id="soon"
						onChange={() => setDaysUntilNextPurchase(7)}
						checked={daysUntilNextPurchase === 7}
					/>
					<label htmlFor="soon">Soon</label> <br />
					<input
						type="radio"
						id="kind-of-soon"
						onChange={() => setDaysUntilNextPurchase(14)}
						checked={daysUntilNextPurchase === 14}
					/>
					<label htmlFor="kind-of-soon">Kind of soon</label> <br />
					<input
						type="radio"
						id="not-soon"
						onChange={() => setDaysUntilNextPurchase(30)}
						checked={daysUntilNextPurchase === 30}
					/>
					<label htmlFor="not-soon">Not soon</label>
				</fieldset>

				<input type="submit" value="Add Item" />
			</form>
			{/* TODO: we could change item added message to a toast message, alert, timeout or use third-party library for this message. */}
			{itemAdded && <p>Your item has been added.</p>}
			{error && <p>Oh no, something went wrong.</p>}
		</>
	);
}
