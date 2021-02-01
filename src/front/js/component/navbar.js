import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// import Logo from "../../img/logo.jpg";
// import Smlogo from "../../img/smlogo.jpg";
import logonavbar from "../../img/logonavbar.jpg";
import "../../styles/navbar.scss";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	useEffect(
		() => {
			actions.getUser();
		},
		[store.token]
	);

	if (store.token == null) {
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" href="#">
					<Link to="/">
						<img src={logonavbar} className="d-inline-block align-top style-logo-navbar" alt="logo" />
					</Link>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link className="nav-link" to="/inicio">
								Inicio
								<span className="sr-only">(current)</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/associations">
								Asociaciones
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/diseases">
								Enfermedades
							</Link>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								Perfil
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
								<a className="dropdown-item" href="#">
									Action
								</a>
								<a className="dropdown-item" href="#">
									Another action
								</a>
								<a className="dropdown-item" href="#">
									Something else here
								</a>
							</div>
						</li>
					</ul>
				</div>
			</nav>

			// <nav className="navbar bg-light">
			// 	<div className="p-2 flex-grow-1 bd-highlight">
			// 		<Link to="/">
			// 			<img id="smlogo" src={logonavbar} />
			// 		</Link>
			// 	</div>
			// 	<div className="p-2 bd-highlight">
			// 		<Link to="/diseases">
			// 			<span>Enfermedades</span>
			// 		</Link>
			// 	</div>
			// 	<div className="p-2 bd-highlight">
			// 		<Link to="/associations">
			// 			<span>Asociaciones</span>
			// 		</Link>
			// 	</div>
			// 	<div className="p-2 bd-highlight">
			// 		<Link to="/about-us">
			// 			<span>About Us</span>
			// 		</Link>
			// 	</div>
			// </nav>
		);
	} else {
		return (
			<nav className="navbar bg-light">
				<div className="p-2 flex-grow-1 bd-highlight">
					<Link to="/">
						<img id="smlogo" src={logonavbar} />
					</Link>
				</div>

				<div className="p-2 bd-highlight">
					<Link to="/inicio">
						<span>Inicio</span>
					</Link>
				</div>
				{/* <div className="p-2 bd-highlight">
					<Link to="/feed">
						<span>Publicaciones</span>
					</Link>
				</div> */}
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
				<div className="p-2 bd-highlight">
					<Link to="/about-us">
						<span>About Us</span>
					</Link>
				</div>
				<div className="">
					<Link to="/profile" className="p-2 bd-highlight color-username">
						<span>{store.user.username}</span>
					</Link>
				</div>
				<div className="p-2 bd-highlight">
					<Link to="/bye" type="button" onClick={() => actions.logout()} style={{ color: "grey" }}>
						Cerrar sesión
					</Link>
				</div>
			</nav>
		);
	}
};
