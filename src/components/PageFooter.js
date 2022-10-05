import styled from 'styled-components';

export default function PageFooter({ src, alt, children }) {
	console.log(children);
	return (
		<PageFooterBox>
			<img src={src} alt={alt} />
			<div>{children}</div>
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
