import styled from 'styled-components';
import FinishOrder from './FinishOrder';
import SelectMovie from './SelectMovie';
import SelectSeat from './SelectSeat';
import SelectTime from './SelectTime';

export default function App() {
	return (
		<>
			<MainHeader>
				<p>Header</p>
			</MainHeader>

			<SelectMovie />
			<SelectTime />
			<SelectSeat />
			<FinishOrder />
		</>
	);
}

const MainHeader = styled.div`
	color: #ffffff;
	background-color: #000000;
`;
