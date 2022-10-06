import styled from 'styled-components';
import FinishOrderPage from '../pages/FinishOrderPage.js';
import SelectMoviePage from '../pages/SelectMoviePage.js';
import SelectSeatPage from '../pages/SelectSeatPage.js';
import SelectTimePage from '../pages/SelectTimePage.js';
import GlobalStyle from '../style/GlobalStyle.js';
import backIcon from '../assets/arrow-back-outline.png';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
	const [selectedMovie, setSelectedMovie] = useState({
		movie: {},
		day: { weekday: '', date: '', time: '' },
		seats: { seats: [], ids: [], name: '', cpf: '' },
	});

	return (
		<BrowserRouter>
			<GlobalStyle />
			<MainHeader>
				<div>
					{selectedMovie.movie.id === undefined ? '' : <Icon src={backIcon} alt="backIcon" />}
					CINEFLIX
				</div>
			</MainHeader>

			<Routes>
				<Route
					path="/"
					element={
						<SelectMoviePage selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
					}
				/>
				<Route
					path="/:movieID/select_time"
					element={
						<SelectTimePage selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
					}
				/>
				<Route
					path="/:timeID/select_seat"
					element={
						<SelectSeatPage selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
					}
				/>
				<Route
					path="/finish_order"
					element={
						<FinishOrderPage selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

const MainHeader = styled.div`
	background-color: #c3cfd9;
	position: fixed;
	top: 0;
	left: 0;
	height: 70px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #e8833a;
	font-weight: 700;
	font-size: 34px;
	text-align: center;
	letter-spacing: 2px;
	div {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const Icon = styled.img`
	position: absolute;
	left: 15px;
	filter: invert(24%) sepia(8%) saturate(0%) hue-rotate(160deg) brightness(95%) contrast(90%);
	/* filter: invert(72%) sepia(31%) saturate(5098%) hue-rotate(336deg) brightness(97%) contrast(88%); /* cor laranja */
	width: 25px;
	height: 25px;
	margin-right: 20px;
	border: 1px solid #000000;
	border-radius: 100%;
`;
