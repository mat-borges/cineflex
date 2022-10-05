import { Link } from 'react-router-dom';

export default function SelectTime() {
	return (
		<div className="select-time">
			<p>Times</p>
			<ul className="dates-list">
				<li className="date">
					<p>Dia da semana</p>
					<ul className="time-list">
						<li>Horario1</li>
					</ul>
				</li>
				<li className="date">
					<p>Dia da semana</p>
					<ul className="time-list">
						<li>Horario1</li>
					</ul>
				</li>
			</ul>
			<div className="time-footer">
				<p>Imagem</p>
				<p>Ttitulo</p>
			</div>
			<Link to="/select_seat">
				<button>Ir para próxima página</button>
			</Link>
		</div>
	);
}
