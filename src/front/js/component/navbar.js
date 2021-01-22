import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import Logo from "../../img/logo.jpg";
// import Smlogo from "../../img/smlogo.jpg";
import logonavbar from "../../img/logonavbar.jpg";
import "../../styles/navbar.scss";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	if (store.token == null) {
		return (
			<nav className="navbar mb-3 mx-2 bg-light">
				<div className="p-2 flex-grow-1 bd-highlight">
					<Link to="/">
						<img id="smlogo" src={logonavbar} />
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
	} else {
		return (
			<nav className="navbar mb-3 bg-light">
				<div className="p-2 flex-grow-1 bd-highlight">
					<Link to="/">
						<img id="smlogo" src={logonavbar} />
					</Link>
				</div>
				<div className="p-2 bd-highlight">
					<Link to="/feed">
						<span>Feed</span>
					</Link>
				</div>
				{/* <div className="p-2 bd-highlight">
					<Link to="/createpost">
						<span>Crear Post</span>
					</Link>
				</div> */}
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
	}
};
