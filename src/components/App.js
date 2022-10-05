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
				<p>Header</p>
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
	position: fixed;
	top: 0;
	color: #ffffff;
	background-color: #000000;
`;
