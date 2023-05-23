import './ListItem.css';

import {
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Chip,
	IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export function ListItemComponent({
	name,
	itemId,
	urgency,
	isDefaultChecked,
	setIsChecked,
	setCheckedItemId,
	onDeleteClick,
	item,
}) {
	const colorByUrgency = {
		soon: 'orange',
		'kind of soon': 'gold',
		'not soon': 'green',
		inactive: 'black',
		overdue: 'red',
	};

	const urgencyColor = colorByUrgency[urgency];
	const dateLastPurchasedFormatted = item.dateLastPurchased
		? `${item.dateLastPurchased
				.toDate()
				.getMonth()
				.toString()
				.padStart(2, '0')}/${item.dateLastPurchased
				.toDate()
				.getDate()
				.toString()
				.padStart(2, '0')}/${item.dateLastPurchased
				.toDate()
				.getFullYear()
				.toString()
				.substring(2)}`
		: 'N/A';
	const additionalItemInfo = `Last Purchased: ${dateLastPurchasedFormatted} • Total Purchases: ${item.totalPurchases}`;

	function clickHandler(event, itemId) {
		setIsChecked(event.target.checked);
		setCheckedItemId(itemId);
	}

	return (
		<ListItem
			disablePadding
			secondaryAction={
				<IconButton
					edge="end"
					aria-label="delete"
					onClick={() => {
						onDeleteClick(itemId);
					}}
				>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemButton
				role={undefined}
				onClick={(event) => clickHandler(event, itemId)}
				dense
			>
				<ListItemIcon>
					<Checkbox
						id={itemId}
						edge="start"
						defaultChecked={isDefaultChecked}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': `checkbox-liist-label=${name}` }}
					/>
				</ListItemIcon>
				<ListItemText
					id={itemId}
					primary={name}
					secondary={additionalItemInfo}
				/>
				<Chip
					size="small"
					label={urgency}
					sx={{
						'&': {
							backgroundColor: `${urgencyColor}`,
							color: 'white',
						},
					}}
				/>
			</ListItemButton>
		</ListItem>
	);
}
