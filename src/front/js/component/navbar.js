import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.scss";

export const Navbar = () => {
	return (
		<nav className="navbar mb-3">
			<div className="p-2 flex-grow-1 bd-highlight">
				<Link to="/">
					<h3>In-Pacients</h3>
				</Link>
			</div>
			<div className="p-2 bd-highlight">
				<Link to="/feed">
					<span>Feed</span>
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
			<div className="p-2 bd-highlight">
				<Link to="/diseases">
					<span>Enfermedades</span>
				</Link>
			</div>
			<div className="p-2 bd-highlight">
				<Link to="/associations">
					<span>Asociaciones</span>
				</Link>
			</div>
		</nav>
	);
};
