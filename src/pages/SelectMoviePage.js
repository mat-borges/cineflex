import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SelectMovie({ moviesList, setMoviesList }) {
	useEffect(() => {
		const request = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');

		request.then((promise) => {
			setMoviesList(promise.data);
		});

		request.catch((erro) => {
			console.log(erro.response.data);
		});
	}, []);

	console.log(moviesList);
	return (
		<SelectMovieBox>
			<h1>Selecione o filme</h1>
			<MoviesList>
				{moviesList.map((e) => (
					<li key={e.id}>
						<Link to="/select_time">
							<img src={e.posterURL} alt={e.title} title={e.title} />
						</Link>
					</li>
				))}
			</MoviesList>
		</SelectMovieBox>
	);
}

const SelectMovieBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 0 25px;
	h1 {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		font-size: 24px;
		letter-spacing: 2px;
	}
`;

const MoviesList = styled.ul`
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	li {
		width: 145px;
		height: 210px;
		padding: 8px;
		border-radius: 4px;
		background: #ffffff;
		box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		img {
			width: 130px;
			height: 195px;
		}
	}
`;
