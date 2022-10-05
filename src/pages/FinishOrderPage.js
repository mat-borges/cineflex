import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { movies, seats, times } from '../mock.js';

export default function FinishOrder() {
	return (
		<FinishOrderBox>
			<h1>Pedido feito com sucesso!</h1>
			<TicketsSummary>
				<h2>Filmes e sessões</h2>
				<p>{movies[0].title}</p>
				<p>
					{times.days[0].date} {times.days[0].showtimes[0].name}
				</p>
				<h2>Ingressos</h2>
				<p>Assento {seats.seats[0].name}</p>
				<h2>Comprador</h2>
				<p>Mateus</p>
				<p>000.000.000-0</p>
			</TicketsSummary>

			<Link to="/">
				<button>Voltar para home</button>
			</Link>
		</FinishOrderBox>
	);
}

const FinishOrderBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		margin: 40px 20px 20px; /* top (left/right) bottom*/
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 24px;
		font-weight: 700;
		letter-spacing: 2px;
		line-height: 28px;
		color: #247a6b;
	}
	button {
		width: 225px;
		height: 42px;
		background-color: #e8833a;
		border-radius: 5px;
		border: none;
		margin-top: 30px;
		font-size: 18px;
		color: #ffffff;
		text-align: center;
		cursor: pointer;
	}
`;

const TicketsSummary = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-left: 30px;
	h2 {
		font-size: 24px;
		font-weight: 700;
		margin: 30px 0 12px 0;
	}
	p {
		font-size: 22px;
		line-height: 30px;
	}
`;
