import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageFooter from '../components/PageFooter';
import backIcon from '../assets/arrow-back-outline.png';

export default function SelectTime(props) {
	const [timesList, setTimesList] = useState([]);
	const { selectedMovie, setSelectedMovie } = props;
	const { movieID } = useParams();

	useEffect(() => {
		const request = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`
		);

		request.then((promise) => {
			setTimesList(promise.data.days);
		});

		request.catch((erro) => {
			console.log(erro.response.data);
		});
	}, [movieID]);

	function chooseTime(day, time) {
		let newSelectedMovie = { ...selectedMovie };
		newSelectedMovie.day.weekday = day.weekday;
		newSelectedMovie.day.date = day.date;
		newSelectedMovie.day.time = time.name;
		setSelectedMovie(newSelectedMovie);
	}

	return (
		<SelectTimeBox>
			<h1>
				<Icon src={backIcon} alt="backIcon" />
				Selecione o horário
			</h1>

			<DatesList>
				{timesList.map((day, i) => (
					<li key={day.id}>
						<h2>
							{day.weekday} - {day.date}
						</h2>
						<TimesList>
							{timesList[i].showtimes.map((time) => (
								<Link to={`/${time.id}/select_seat`} key={time.id}>
									<li onClick={() => chooseTime(day, time)}>{time.name}</li>
								</Link>
							))}
						</TimesList>
					</li>
				))}
			</DatesList>

			<PageFooter src={selectedMovie.movie.posterURL} alt={selectedMovie.movie.title}>
				<p>{selectedMovie.movie.title}</p>
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

const Icon = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 20px;
`;
