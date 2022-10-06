import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageFooter from '../components/PageFooter';

export default function SelectSeat(props) {
	const { selectedMovie, setSelectedMovie } = props;
	const { timeID } = useParams();
	const [seatsList, setSeatsList] = useState([]);
	const [buyer, setBuyer] = useState('');
	const [cpf, setCPF] = useState('');

	useEffect(() => {
		const request = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${timeID}/seats`
		);

		request.then((promise) => {
			setSeatsList(promise.data.seats);
		});

		request.catch((erro) => {
			console.log(erro.response.data);
		});
	}, [timeID]);

	function chooseSeats() {
		let newSelectedMovie = { ...selectedMovie };

		if (newSelectedMovie.seats.ids.length !== 0 && buyer !== '' && cpf !== '') {
			newSelectedMovie.seats.name = buyer;
			newSelectedMovie.seats.cpf = cpf;
			setSelectedMovie(newSelectedMovie);
		} else {
			if (newSelectedMovie.seats.ids.length === 0) {
				alert('Você precisa selecionar pelo menos 1 assento');
			}
			if (buyer === '') {
				alert('Você precisa inserir um nome válido');
			}
			if (cpf === '') {
				alert('Você precisa inserir um CPF válido');
			}
		}
	}

	function changeSeats(number, id) {
		let newSelectedMovie = { ...selectedMovie };

		if (!newSelectedMovie.seats.seats.includes(number)) {
			newSelectedMovie.seats.seats.push(number);
			newSelectedMovie.seats.ids.push(id);
			setSelectedMovie(newSelectedMovie);
		} else {
			newSelectedMovie.seats.ids = newSelectedMovie.seats.ids.filter((e) => e !== id);
			newSelectedMovie.seats.seats = newSelectedMovie.seats.seats.filter((e) => e !== number);
			setSelectedMovie(newSelectedMovie);
		}
	}

	function checkBackColor(seat) {
		let color;
		if (seat.isAvailable) {
			color = '#c3cfd9';
		} else {
			color = '#FBE192';
		}
		if (seat.isAvailable && selectedMovie.seats.seats.includes(seat.name)) {
			color = '#1AAE9E';
		}
		return color;
	}

	function checkBorderColor(seat) {
		let color;
		if (seat.isAvailable) {
			color = '#808f9d';
		} else {
			color = '#F7C52B';
		}
		if (seat.isAvailable && selectedMovie.seats.seats.includes(seat.name)) {
			color = '#0E7D71';
		}
		return color;
	}

	return (
		<SelectSeatBox>
			<h1>Selecione o(s) assento(s)</h1>

			<SeatList>
				{seatsList.map((seat) => (
					<Seat
						type="button"
						value={seat.name}
						key={seat.id}
						backColor={checkBackColor(seat)}
						borderColor={checkBorderColor(seat)}
						onClick={() => changeSeats(seat.name, seat.id)}
					/>
				))}
			</SeatList>

			<StatusLabels>
				<span>
					<SeatStatus backColor={'#1AAE9E'} borderColor={'#0E7D71'}></SeatStatus>
					<p>Selecionado</p>
				</span>
				<span>
					<SeatStatus backColor={'#c3cfd9'} borderColor={'#808f9d'}></SeatStatus>
					<p>Disponível</p>
				</span>
				<span>
					<SeatStatus backColor={'#FBE192'} borderColor={'#F7C52B'}></SeatStatus>
					<p>Indisponível</p>
				</span>
			</StatusLabels>

			<Inputs>
				<h2>Nome do comprador</h2>
				<input
					type="text"
					placeholder="Digite seu nome..."
					onChange={(e) => setBuyer(e.target.value)}
				/>
				<h2>CPF</h2>
				<input
					type="text"
					placeholder="Digite seu CPF..."
					pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
					onChange={(e) => setCPF(e.target.value)}
				/>
			</Inputs>

			<Link to="/finish_order">
				<input type="submit" value="Reservar assento(s)" onClick={() => chooseSeats()} />
			</Link>

			<PageFooter src={selectedMovie.movie.posterURL} alt={selectedMovie.movie.title}>
				<p>{selectedMovie.movie.title}</p>
				<p>{selectedMovie.day.date}</p>
				<p>
					{selectedMovie.day.weekday} - {selectedMovie.day.time}
				</p>
			</PageFooter>
		</SelectSeatBox>
	);
}

const SelectSeatBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 115px;
	h1 {
		margin: 40px 0 25px 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 24px;
		font-weight: 400;
		letter-spacing: 2px;
	}
	input[type='submit'] {
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

const SeatList = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	max-width: 365px;
	margin: 0 5px;
`;

const Seat = styled.input`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) => props.backColor};
	border: 1px solid ${(props) => props.borderColor};
	border-radius: 15px;
	width: 26px;
	height: 26px;
	margin: 0 4px 18px 4px;
	font-size: 11px;
	font-weight: 400;
	text-align: center;
	cursor: pointer;
	&:hover,
	:active {
		filter: brightness(1.1);
	}
	@media (min-width: 700px) {
		width: 30px;
		height: 30px;
		font-size: 18px;
	}
`;

const StatusLabels = styled.div`
	display: flex;
	justify-content: center;
	span {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		line-height: 15px;
		padding: 0 20px 0 20px;
	}
`;

const SeatStatus = styled(Seat)`
	margin: 0 0 5px 0;
	cursor: inherit;
	&:hover,
	:active {
		filter: brightness(1);
	}
`;

const Inputs = styled.div`
	width: 100%;
	margin-top: 20px;
	h2 {
		margin-left: 24px;
		font-size: 18px;
		line-height: 21px;
	}
	input[type='text'] {
		width: 90%;
		height: 51px;
		padding-left: 15px;
		margin: 3px auto 7px 24px;
		::placeholder {
			font-style: italic;
		}
	}
`;
