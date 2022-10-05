import { Link } from 'react-router-dom';

export default function FinishOrder() {
	return (
		<div className="finish-order">
			<h1>Concluido com sucesso</h1>
			<h1>Filmes e sessões</h1>
			<p>titulo</p>
			<p>horario</p>
			<h1>Ingressos</h1>
			<p>assento 1</p>
			<h1>Comprador</h1>
			<p>nome</p>
			<p>cpf</p>
			<Link to="/">
				<button>Voltar para home</button>
			</Link>
		</div>
	);
}
