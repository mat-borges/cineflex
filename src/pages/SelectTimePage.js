import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageFooter from '../components/PageFooter';

export default function SelectTime({ moviesList }) {
	const [timesList, setTimesList] = useState([]);

	useEffect(() => {
		const request = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies/1/showtimes');

		request.then((promise) => {
			setTimesList(promise.data.days);
		});

		request.catch((erro) => {
			console.log(erro.response.data);
		});
	}, []);

	console.log(timesList);
	return (
		<SelectTimeBox>
			<h1>Selecione o horário</h1>
			<DatesList>
				{timesList.map((day, i) => (
					<li key={day.id}>
						<h2>
							{day.weekday} - {day.date}
						</h2>
						<TimesList>
							{timesList[i].showtimes.map((time) => (
								<Link to="/select_seat" key={time.id}>
									<li>{time.name}</li>
								</Link>
							))}
						</TimesList>
					</li>
				))}
			</DatesList>

			<PageFooter src={moviesList[0].posterURL} alt={moviesList[0].title}>
				<p>Wakanda Forever</p>
			</PageFooter>
		</SelectTimeBox>
	);
}

const SelectTimeBox = styled.div`
	margin-bottom: 115px;
	h1 {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 24px;
		letter-spacing: 2px;
	}
	h2 {
		font-size: 20px;
		line-height: 24px;
		margin: 0 0 25px 25px;
	}
`;

const DatesList = styled.ul``;

const TimesList = styled.ul`
	margin: 0 0 25px 23px;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	li {
		background-color: #e8833a;
		width: 85px;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		margin: 0 10px 10px 0;
		color: #ffffff;
	}
`;
