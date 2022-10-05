import styled from 'styled-components';
import FinishOrderPage from '../pages/FinishOrderPage.js';
import SelectMoviePage from '../pages/SelectMoviePage.js';
import SelectSeatPage from '../pages/SelectSeatPage.js';
import SelectTimePage from '../pages/SelectTimePage.js';
import GlobalStyle from '../style/GlobalStyle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<MainHeader>
				<p>CINEFLIX</p>
			</MainHeader>

			<Routes>
				<Route path="/" element={<SelectMoviePage />} />
				<Route path="/select_time" element={<SelectTimePage />} />
				<Route path="/select_seat" element={<SelectSeatPage />} />
				<Route path="/finish_order" element={<FinishOrderPage />} />
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
	font-weight: 400;
	font-size: 34px;
	text-align: center;
`;
