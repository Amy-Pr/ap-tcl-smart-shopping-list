/* eslint-disable jsx-a11y/label-has-associated-control */
import { Navigate } from 'react-router-dom';
import {
	Box,
	Button,
	Grid,
	FormLabel,
	TextField,
	ThemeProvider,
	Typography,
	createTheme,
	Container,
} from '@mui/material';

import './Home.css';
import retro from '../retro.png';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import { useState } from 'react';
import { validateToken } from '../api/firebase';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import Modal from '../views/Modal';

export function Home({ setListToken }) {
	const [userTokenInput, setUserTokenInput] = useState('');
	const [tokenExists, setTokenExists] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	function handleClick() {
		const token = generateToken();
		setListToken(token);
		setTokenExists(true);
	}

	async function handleSumbit(e) {
		e.preventDefault();
		const isValid = await validateToken(userTokenInput);
		if (isValid) {
			setListToken(userTokenInput);
			setTokenExists(true);
		} else {
			Toastify({
				text: 'Sorry, this list does not exist.',
				position: 'center',
				gravity: 'top',
				duration: 3000,
			}).showToast();
		}
	}

	const mainTheme = createTheme({
		typography: {
			fontFamily: 'Times New Roman',
			fontSize: '10px',
		},
		palette: {
			primary: {
				main: '#EAE7D6',
				background: {
					default: '#EAE7D6',
				},
			},
		},
	});

	return (
		<ThemeProvider theme={mainTheme}>
			<img src={retro} className="center" alt="logo"></img>
			<div className="Home">
				<Box sx={{ backgroundColor: 'EAE7D6' }}>
					<Box
						display="flex"
						justifyContent="center"
						alignItems="center"
						minHeight="30vh"
					>
						<Typography variant="h1">
							Welcome to your Smart Shopping List!
						</Typography>
					</Box>

					<Grid
						container
						spacing={30}
						direction="row"
						justifyContent="center"
						alignItems="center"
						alignContent={'center'}
						xs={12}
					>
						<Grid item xs={6} margin={'16px'}>
							<Typography variant="h2">
								You can create a new shopping list, or type in a token to view
								an existing list.
							</Typography>
							<Button
								type="button"
								variant="contained"
								size="large"
								onClick={handleClick}
							>
								<Typography variant="h2"> Create new list</Typography>
							</Button>
							<Typography variant="h2">
								<p> - or - </p>
							</Typography>

							<form onSubmit={handleSumbit}>
								<Typography variant="h2">
									<label htmlFor="tokenInput">Three word token:</label>
								</Typography>

								<div>
									<TextField
										type="text"
										id="tokenInput"
										onChange={(event) => setUserTokenInput(event.target.value)}
										required
									/>

									<Button variant="contained" size="large" type="submit">
										<Typography variant="h2">Submit</Typography>
									</Button>
								</div>
							</form>
						</Grid>
						<Grid item width={50} margin={'16px'}>
							<div id="checklist">
								<input id="01" type="checkbox" name="r" value="1" />
								<label htmlFor="01">Bread</label>
								<input id="02" type="checkbox" name="r" value="2" />
								<label htmlFor="02">Cheese</label>
								<input id="03" type="checkbox" name="r" value="3" />
								<label htmlFor="03">Coffee</label>
							</div>
						</Grid>
					</Grid>

					<Container>
						<div>
							<button onClick={toggleModal}>Learn More</button>
							{isModalOpen && <Modal closeModal={toggleModal} />}
						</div>
					</Container>

					{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
				</Box>
			</div>
		</ThemeProvider>
	);
}
