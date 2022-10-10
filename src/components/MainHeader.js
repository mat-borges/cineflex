import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '../assets/arrow-back-outline.png';

export default function MainHeader({ link, setSelectedMovie }) {
	const navigate = useNavigate();

	function showIcon() {
		if (link === '' || link === '/sucesso') {
			return '';
		} else {
			return <Icon src={backIcon} alt="backIcon" onClick={() => navigate(link)} />;
		}
	}

	function resetSelectedMovie() {
		setSelectedMovie({
			movie: { title: '', posterURL: '' },
			day: { weekday: '', date: '', time: '' },
			seats: { ids: [], compradores: [{ idAssento: '', nome: '', cpf: '' }] },
			seatsName: [],
		});
		navigate('/');
	}

	return (
		<MainHeaderBox link={link}>
			{showIcon()}
			<span onClick={link !== '' ? resetSelectedMovie : null}>CINEFLIX</span>
		</MainHeaderBox>
	);
}

const MainHeaderBox = styled.div`
	background-color: #c3cfd9;
	position: fixed;
	top: 0;
	left: 0;
	height: 70px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #e8833a;
	font-weight: 700;
	font-size: 34px;
	text-align: center;
	letter-spacing: 2px;
	span {
		width: fit-content;
		height: fit-content;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: ${({ link }) => (link !== '' ? 'pointer' : 'default')};
	}
`;

const Icon = styled.img`
	position: fixed;
	top: 23px;
	left: 23px;
	filter: invert(24%) sepia(8%) saturate(0%) hue-rotate(160deg) brightness(95%) contrast(90%);
	/* filter: invert(72%) sepia(31%) saturate(5098%) hue-rotate(336deg) brightness(97%) contrast(88%); /* cor laranja */
	width: 25px;
	height: 25px;
	margin-right: 20px;
	border: 1px solid #000000;
	border-radius: 100%;
	cursor: pointer;
	z-index: 3;
`;
