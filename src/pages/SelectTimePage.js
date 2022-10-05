import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { times } from '../mock';

export default function SelectTime() {
	const days = times.days;
	return (
		<SelectTimeBox>
			<h1>Selecione o horário</h1>
			<DatesList>
				{days.map((e) => (
					<li key={e.id}>
						<h2>
							{e.weekday} - {e.date}
						</h2>
						<TimesList>
							{e.showtimes.map((e) => (
								<Link to="/select_seat" key={e.id}>
									<li>{e.name}</li>
								</Link>
							))}
						</TimesList>
					</li>
				))}
			</DatesList>

			<PageFooter>
				<img
					src="https://mundoconectado.com.br/uploads/2022/10/03/28762/fejztbixoamd00qjfif.jpg"
					alt="movie"
				/>
				<div>
					<p>Wakanda Forever</p>
				</div>
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
	}
`;

const PageFooter = styled.div`
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	background-color: #dfe6ed;
	height: 115px;
	width: 100%;
	border: 1px solid #9eadba;
	img {
		background-color: #ffffff;
		padding: 8px;
		height: 90px;
		margin: 0 10px;
	}
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		p {
			font-size: 26px;
			line-height: 30px;
			font-weight: 400;
			word-break: break-all;
			hyphens: auto;
		}
	}
`;
