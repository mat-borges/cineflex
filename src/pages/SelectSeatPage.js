import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/Loading';
import PageFooter from '../components/PageFooter';

export default function SelectSeat({ selectedMovie, setSelectedMovie, setLink }) {
	const { timeID, movieID } = useParams();
	const [seatsList, setSeatsList] = useState([]);
	const [ids, setIds] = useState([]);
	const [seats, setSeats] = useState([]);
	const [buyers, setBuyers] = useState([]);
	const [movie, setMovie] = useState({ movie: {}, day: {}, name: '' });
	const navigate = useNavigate();

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
			setLink(`/sessoes/${movieID}`);
		});

		request.catch((err) => {
			console.log('message:', err.message);
			console.log('name:', err.name);
		});
	}, [timeID, movieID]);

	if (seatsList.length === 0) {
		return <Loading />;
	}

	function chooseSeats(e) {
		let newSelectedMovie = { ...selectedMovie };
		e.preventDefault();

		if (ids.length !== 0) {
			newSelectedMovie.seats.ids = ids;
			newSelectedMovie.seats.compradores = buyers;
			newSelectedMovie.seatsName = seats;
			setSelectedMovie(newSelectedMovie);
			const finish = axios.post(
				'https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many',
				newSelectedMovie.seats
			);
			setLink('/sucesso');
			localStorage.setItem('finished', JSON.stringify(newSelectedMovie));

			finish.then(navigate('/sucesso'));

			finish.catch((err) => console.log(err.response.data));
		} else {
			if (ids.length === 0) {
				alert('Você precisa selecionar pelo menos 1 assento');
			}
			if (buyers.find((e) => e.nome === '') !== undefined) {
				alert('Você precisa inserir um nome válido');
			}
			if (buyers.find((e) => e.cpf === '') !== undefined) {
				alert('Você precisa inserir um CPF válido');
			}
		}
	}

	function changeSeats(seat) {
		let newIds = [...ids];
		let newBuyers = [...buyers];
		let newSeats = [...seats];
		const i = buyers.findIndex((e) => e.idAssento === seat.id);

		if (!seat.isAvailable) {
			return alert('Esse assento não está disponível');
		}

		if (!ids.includes(seat.id)) {
			newIds.push(seat.id);
			newSeats.push(seat.name);
			newBuyers.push({ idAssento: seat.id, nome: '', cpf: '' });
			setIds(newIds);
			setSeats(newSeats);
			setBuyers(newBuyers);
		} else if (newBuyers[i].nome !== '' || newBuyers[i].cpf !== '') {
			if (window.confirm('Você tem certeza que deseja remover esse assento?')) {
				newIds = newIds.filter((e) => e !== seat.id);
				newBuyers = newBuyers.filter((e) => e.idAssento !== seat.id);
				newSeats = newSeats.filter((e) => e !== seat.name);
				setIds(newIds);
				setBuyers(newBuyers);
				setSeats(newSeats);
			}
		} else {
			newIds = newIds.filter((e) => e !== seat.id);
			newBuyers = newBuyers.filter((e) => e.idAssento !== seat.id);
			newSeats = newSeats.filter((e) => e !== seat.name);
			setIds(newIds);
			setBuyers(newBuyers);
			setSeats(newSeats);
		}
	}

	function checkBackColor(seat) {
		let color;
		if (seat.isAvailable) {
			color = '#c3cfd9';
		} else {
			color = '#FBE192';
		}
		if (seat.isAvailable && ids.includes(seat.id)) {
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
		if (seat.isAvailable && ids.includes(seat.id)) {
			color = '#0E7D71';
		}
		return color;
	}

	function addBuyer(value, id) {
		let newBuyers = [...buyers];

		newBuyers.forEach((e) => {
			if (e.idAssento === id) {
				e.nome = value;
			}
		});
		setBuyers(newBuyers);
	}

	function addCPF(value, id) {
		let newBuyers = [...buyers];

		newBuyers.forEach((e) => {
			if (e.idAssento === id) {
				e.cpf = value
					.replace(/\D/g, '')
					.replace(/(\d{3})(\d)/, '$1.$2')
					.replace(/(\d{3})(\d)/, '$1.$2')
					.replace(/(\d{3})(\d{1,2})/, '$1-$2')
					.replace(/(-\d{2})\d+$/, '$1');
			}
		});

		setBuyers(newBuyers);
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

			<Inputs onSubmit={chooseSeats}>
				{ids.map((id, index) => (
					<div key={index}>
						<label htmlFor={`buyer${index}`}>Nome do comprador ({seats[index]})</label>
						<input
							id={`buyer${index}`}
							type="text"
							placeholder="Digite seu nome..."
							value={buyers[index].nome}
							onChange={(e) => addBuyer(e.target.value, id)}
							required
							data-identifier="buyer-name-input"
						/>
						<label htmlFor={`cpf${index}`}>CPF ({seats[index]})</label>
						<input
							id={`cpf${index}`}
							type="text"
							placeholder="Digite seu CPF (apenas números)..."
							pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
							value={buyers[index].cpf}
							onChange={(e) => addCPF(e.target.value, id)}
							required
							data-identifier="buyer-cpf-input"
						/>
					</div>
				))}

				<input type="submit" value="Reservar assento(s)" data-identifier="reservation-btn" />
			</Inputs>

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

const Inputs = styled.form`
	width: 100%;
	padding: 20px 24px 0 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	label {
		font-size: 18px;
		line-height: 21px;
	}
	input[type='text'] {
		width: 100%;
		height: 51px;
		padding-left: 15px;
		margin: 3px 0 7px 0;
		::placeholder {
			font-style: italic;
		}
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
