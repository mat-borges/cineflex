import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageFooter from '../components/PageFooter';

export default function SelectSeat({ moviesList }) {
	const [seatsList, setSeatsList] = useState([]);

	useEffect(() => {
		const request = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/showtimes/10/seats');

		request.then((promise) => {
			setSeatsList(promise.data.seats);
		});

		request.catch((erro) => {
			console.log(erro.response.data);
		});
	}, []);
	return (
		<SelectSeatBox>
			<h1>Selecione o(s) assento(s)</h1>
			<SeatList>
				{seatsList.map((seat) => (
					<Seat
						key={seat.id}
						backColor={seat.isAvailable ? '#c3cfd9' : '#FBE192'}
						borderColor={seat.isAvailable ? '#808f9d' : '#F7C52B'}>
						{seat.name}
					</Seat>
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
				<input type="text" placeholder="Digite seu nome..." />
				<h2>CPF</h2>
				<input
					type="text"
					placeholder="Digite seu CPF..."
					pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
				/>
			</Inputs>
			<Link to="/finish_order">
				{/* O axios.post() tem que ser colocado nesse submit*/}
				<input type="submit" value="Reservar assento(s)" />{' '}
			</Link>

			<PageFooter src={moviesList[0].posterURL} alt={moviesList[0].title}>
				<p>Wakanda Forever</p>
				<p>Segunda-Feira - 15:00</p>
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

const Seat = styled.div`
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
