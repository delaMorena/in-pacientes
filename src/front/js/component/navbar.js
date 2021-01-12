import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="p-2 flex-grow-1 bd-highlight">
				<Link to="/">
					<h3>In-Pacients</h3>
				</Link>
			</div>
			<div className="p-2 bd-highlight prueba">
				<Link to="/createpost">
					<span>Crear Post</span>
				</Link>
			</div>
			<div className="p-2 bd-highlight">
				<Link to="/profile">
					<span>Perfil</span>
				</Link>
			</div>
			<div className="p-2 bd-highlight">Asociaciones</div>
		</nav>
	);
};
