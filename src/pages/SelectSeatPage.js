import { Link } from 'react-router-dom';

export default function SelectSeat() {
	return (
		<div className="select-seat">
			<p>Seats</p>
			<ul className="seats-list">
				<li>seat</li>
				<li>seat</li>
				<li>seat</li>
			</ul>
			<ul className="seats-status">
				<li>selecionado</li>
				<li>disponível</li>
				<li>indisponível</li>
			</ul>
			<p>Comprador</p>
			<input type="text" placeholder="Comprador" />
			<p>CPF</p>
			<input type="number" placeholder="CPF" />
			<button>Reservar assento(s)</button>
			<div className="footer">
				<p>Imagem</p>
				<div className="texto">
					<p>Ttitulo</p>
					<p>Horario</p>
				</div>
			</div>
			<Link to="/finish_order">
				<button>Ir para próxima página</button>
			</Link>
		</div>
	);
}
