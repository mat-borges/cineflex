import { Link } from 'react-router-dom';

export default function SelectMovie() {
	return (
		<div className="select-movie">
			<p>Movies</p>
			<ul className="movies-list">
				<li>Filme</li>
			</ul>
			<Link to="/select_time">
				<button>Ir para próxima página</button>
			</Link>
		</div>
	);
}
