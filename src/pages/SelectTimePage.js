import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../components/Loading';
import PageFooter from '../components/PageFooter';

export default function SelectTime({ selectedMovie, setSelectedMovie, setLink }) {
	const { movieID } = useParams();
	const [timesList, setTimesList] = useState([]);
	const [movie, setMovie] = useState({});

	useEffect(() => {
		const request = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`
		);

		request.then((promise) => {
			const newSelectedMovie = { ...selectedMovie };
			newSelectedMovie.movie.title = promise.data.title;
			newSelectedMovie.movie.posterURL = promise.data.posterURL;
			setSelectedMovie(newSelectedMovie);
			setTimesList(promise.data.days);
			setMovie(promise.data);
			setLink(`/`);
		});

		request.catch((erro) => {
			console.log(erro.response.data);
		});
	}, [movieID]);

	if (timesList.length === 0) {
		return <Loading />;
	}

	function chooseTime(day, time) {
		const newSelectedMovie = { ...selectedMovie };
		newSelectedMovie.day.weekday = day.weekday;
		newSelectedMovie.day.date = day.date;
		newSelectedMovie.day.time = time.name;
		setSelectedMovie(newSelectedMovie);
		setLink(`/sessoes/${movieID}`);
	}

	return (
		<SelectTimeBox>
			<h1>Selecione o horário</h1>

			<DatesList>
				{timesList.map((day, i) => (
					<li key={day.id} data-identifier="session-date">
						<h2>
							{day.weekday} - {day.date}
						</h2>
						<TimesList>
							{timesList[i].showtimes.map((time) => (
								<Link to={`/assentos/${movieID}/${time.id}`} key={time.id}>
									<li onClick={() => chooseTime(day, time)} data-identifier="hour-minute-btn">
										{time.name}
									</li>
								</Link>
							))}
						</TimesList>
					</li>
				))}
			</DatesList>

			<PageFooter url={movie.posterURL} title={movie.title} />
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
		:hover,
		:active {
			outline: 2px solid #e8833a;
		}
	}
`;
