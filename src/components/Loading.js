import styled from 'styled-components';
import loadGIF from '../assets/loadGIF.gif';

export default function Loading() {
	return (
		<LoadingBox>
			<img src={loadGIF} alt="loading" />
			<p>Loading...</p>
		</LoadingBox>
	);
}

const LoadingBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	margin-top: 20vh;
`;
