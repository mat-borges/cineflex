import styled from 'styled-components';

export default function PageFooter({ url, title, children }) {
	return (
		<PageFooterBox>
			<img src={url} alt={title} data-identifier="movie-img-preview" />
			<div data-identifier="movie-and-session-infos-preview">
				<p>{title}</p>
				{children}
			</div>
		</PageFooterBox>
	);
}

const PageFooterBox = styled.div`
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
		border-radius: 5px;
	}
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		p {
			font-size: 18px;
			line-height: 30px;
			font-weight: 400;
			word-break: break-all;
			hyphens: auto;
		}
	}
`;
