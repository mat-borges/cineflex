import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function FinishOrder({ selectedMovie, setSelectedMovie, setLink }) {
	function resetSelectedMovie() {
		setSelectedMovie({
			movie: { title: '', posterURL: '' },
			day: { weekday: '', date: '', time: '' },
			seats: { ids: [], compradores: [{ idAssento: '', nome: '', cpf: '' }] },
			seatsName: [],
		});
	}

	return (
		<FinishOrderBox>
			<h1>Pedido feito com sucesso!</h1>
			<TicketsSummary>
				<h2>Filmes e sessões</h2>
				<p data-identifier="movie-session-infos-reserve-finished">{selectedMovie.movie.title}</p>
				<p data-identifier="movie-session-infos-reserve-finished">
					{selectedMovie.day.date} {selectedMovie.day.time}
				</p>
				<h2>Ingressos</h2>
				{selectedMovie.seats.compradores.map((e, i) => (
					<div key={e.idAssento}>
						<p key={i} data-identifier="seat-infos-reserve-finished">
							Assento {selectedMovie.seatsName[i]}
						</p>
						<p data-identifier="buyer-infos-reserve-finished">Nome: {e.nome}</p>
						<p data-identifier="buyer-infos-reserve-finished">CPF: {e.cpf}</p>
					</div>
				))}
			</TicketsSummary>

			<Link to="/" onClick={resetSelectedMovie}>
				<button data-identifier="back-to-home-btn">Voltar para home</button>
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
