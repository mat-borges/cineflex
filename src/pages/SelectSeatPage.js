import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageFooter from '../components/PageFooter';

export default function SelectSeat({ selectedMovie, setSelectedMovie }) {
	const { timeID } = useParams();
	const [seatsList, setSeatsList] = useState([]);
	const [selectedSeats, setSelectedSeats] = useState({ seats: [], ids: [] });
	const [buyers, setBuyers] = useState([]);
	const [cpfs, setCPFs] = useState([]);
	const [movie, setMovie] = useState({ movie: {}, day: {}, name: '' });

	useEffect(() => {
		const request = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${timeID}/seats`
		);

		request.then((promise) => {
			const newSelectedMovie = { ...selectedMovie };
			newSelectedMovie.movie.title = promise.data.movie.title;
			newSelectedMovie.movie.posterURL = promise.data.movie.posterURL;
			newSelectedMovie.day.weekday = promise.data.day.weekday;
			newSelectedMovie.day.date = promise.data.day.date;
			newSelectedMovie.day.time = promise.data.name;
			setSelectedMovie(newSelectedMovie);
			setSeatsList(promise.data.seats);
			setMovie(promise.data);
		});

		request.catch((erro) => {
			console.log(erro.response.data);
		});
	}, [timeID]);

	function chooseSeats() {
		let newSelectedMovie = { ...selectedMovie };
		if (selectedSeats.seats.length !== 0 && buyers.length !== 0 && cpfs.length !== 0) {
			selectedSeats.seats.forEach((e, i) => {
				newSelectedMovie.seats[i] = {
					seat: selectedSeats.seats[i],
					id: selectedSeats.ids[i],
					name: buyers[i],
					cpf: cpfs[i],
				};
			});
			console.log(newSelectedMovie);
			setSelectedMovie(newSelectedMovie);
		} else {
			if (newSelectedMovie.seats.ids.length === 0) {
				alert('Você precisa selecionar pelo menos 1 assento');
			}
			if (buyers === '') {
				alert('Você precisa inserir um nome válido');
			}
			if (cpfs === '') {
				alert('Você precisa inserir um CPF válido');
			}
		}
	}

	function changeSeats(seat) {
		const newSelectedSeats = { ...selectedSeats };

		if (!seat.isAvailable) {
			alert('Esse assento não está disponível');
		}
		if (!selectedSeats.seats.includes(seat.name)) {
			newSelectedSeats.seats.push(seat.name);
			newSelectedSeats.ids.push(seat.id);
			setSelectedSeats(newSelectedSeats);
			// } else if (buyers.length !== 0 && cpfs.length !== 0) {
			// 	if (window.confirm('Você tem certeza que deseja remover esse assento?')) {
			// 		newSelectedSeats.ids = newSelectedSeats.ids.filter((e) => e !== seat.id);
			// 		newSelectedSeats.seats = newSelectedSeats.seats.filter((e) => e !== seat.name);
			// 		setSelectedSeats(newSelectedSeats);
			// 	}
		} else {
			newSelectedSeats.ids = newSelectedSeats.ids.filter((e) => e !== seat.id);
			newSelectedSeats.seats = newSelectedSeats.seats.filter((e) => e !== seat.name);
			setSelectedSeats(newSelectedSeats);
		}
	}

	function checkBackColor(seat) {
		let color;
		if (seat.isAvailable) {
			color = '#c3cfd9';
		} else {
			color = '#FBE192';
		}
		if (seat.isAvailable && selectedSeats.seats.includes(seat.name)) {
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
		if (seat.isAvailable && selectedSeats.seats.includes(seat.name)) {
			color = '#0E7D71';
		}
		return color;
	}

	function addBuyer(name, index) {
		const newBuyers = [...buyers];
		newBuyers[index] = name;
		setBuyers(newBuyers);
	}

	function addCPF(name, index) {
		const newCPFs = [...cpfs];
		newCPFs[index] = name;
		setCPFs(newCPFs);
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
						onClick={() => changeSeats(seat)}
						data-identifier="seat"
					/>
				))}
			</SeatList>

			<StatusLabels>
				<span data-identifier="seat-selected-subtitle">
					<SeatStatus backColor={'#1AAE9E'} borderColor={'#0E7D71'}></SeatStatus>
					<p>Selecionado</p>
				</span>
				<span data-identifier="seat-available-subtitle">
					<SeatStatus backColor={'#c3cfd9'} borderColor={'#808f9d'}></SeatStatus>
					<p>Disponível</p>
				</span>
				<span data-identifier="seat-unavailable-subtitle">
					<SeatStatus backColor={'#FBE192'} borderColor={'#F7C52B'}></SeatStatus>
					<p>Indisponível</p>
				</span>
			</StatusLabels>

			<Inputs>
				{selectedSeats.seats.map((seat, index) => (
					<div key={index}>
						<h2>Nome do comprador ({seat})</h2>
						<input
							type="text"
							placeholder="Digite seu nome..."
							onChange={(e) => addBuyer(e.target.value, index)}
							data-identifier="buyer-name-input"
						/>
						<h2>CPF ({seat})</h2>
						<input
							type="text"
							placeholder="Digite seu CPF..."
							pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
							onChange={(e) => addCPF(e.target.value, index)}
							data-identifier="buyer-cpf-input"
						/>
					</div>
				))}
			</Inputs>

			<Link to="/finish_order">
				<input
					type="submit"
					value="Reservar assento(s)"
					onClick={() => chooseSeats()}
					data-identifier="reservation-btn"
				/>
			</Link>

			<PageFooter url={movie.movie.posterURL} title={movie.movie.title}>
				<p>{movie.day.date}</p>
				<p>
					{movie.day.weekday} - {movie.name}
				</p>
			</PageFooter>
		</SelectSeatBox>
	);
}

const SelectSeatBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 125px;
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
