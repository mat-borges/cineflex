import FinishOrderPage from '../pages/FinishOrderPage.js';
import SelectMoviePage from '../pages/SelectMoviePage.js';
import SelectSeatPage from '../pages/SelectSeatPage.js';
import SelectTimePage from '../pages/SelectTimePage.js';
import GlobalStyle from '../style/GlobalStyle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import MainHeader from './MainHeader.js';

export default function App() {
	const [selectedMovie, setSelectedMovie] = useState({
		movie: { title: '', posterURL: '' },
		day: { weekday: '', date: '', time: '' },
		seats: { ids: [], compradores: [{ idAssento: '', nome: '', cpf: '' }] },
		seatsName: [],
	});
	const [link, setLink] = useState('');

	return (
		<BrowserRouter>
			<GlobalStyle />
			<MainHeader link={link} setSelectedMovie={setSelectedMovie} />

			<Routes>
				<Route
					path="/"
					element={
						<SelectMoviePage
							selectedMovie={selectedMovie}
							setSelectedMovie={setSelectedMovie}
							setLink={setLink}
						/>
					}
				/>
				<Route
					path="/sessoes/:movieID"
					element={
						<SelectTimePage
							selectedMovie={selectedMovie}
							setSelectedMovie={setSelectedMovie}
							setLink={setLink}
						/>
					}
				/>
				<Route
					path="/assentos/:movieID/:timeID"
					element={
						<SelectSeatPage
							selectedMovie={selectedMovie}
							setSelectedMovie={setSelectedMovie}
							setLink={setLink}
						/>
					}
				/>
				<Route path="/sucesso" element={<FinishOrderPage setSelectedMovie={setSelectedMovie} />} />
			</Routes>
		</BrowserRouter>
	);
}
