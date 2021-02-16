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
			<nav className="navbar navbar-expand-lg navbar-light">
				<Link className="navbar-brand" to="/">
					<img src={logonavbar} className="d-inline-block align-top style-logo-navbar" alt="logo" />
				</Link>
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
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav style-ul-navbar dropdown-menu-right">
						{/* <li className="nav-item active">
							<Link className="nav-link" to="/inicio">
								Inicio
								<span className="sr-only">(current)</span>
							</Link>
						</li> */}
						<li className="nav-item ">
							<Link className="nav-link" to="/associations">
								Asociaciones
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/diseases">
								Enfermedades
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/login">
								<button type="button" className="btn login-button-style">
									Entrar
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/signup">
								<button type="button" className="btn register-button-style-navbar">
									Registrarme
								</button>
							</Link>
						</li>
						{/* <li className="nav-item">
							<Link className="nav-link" to="/about-us">
								Quienes somos
							</Link>
						</li> */}
					</ul>
				</div>
			</nav>
		);
	} else {
		return (
			<nav className="navbar navbar-expand-lg navbar-light">
				<Link className="navbar-brand" to="/">
					<img src={logonavbar} className="d-inline-block align-top style-logo-navbar" alt="logo" />
				</Link>
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
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
					<ul className="navbar-nav style-ul-navbar">
						<li className="nav-item active">
							<Link className="nav-link" to="/inicio">
								Inicio
								<span className="sr-only">(current)</span>
							</Link>
						</li>
						<li className="nav-item ">
							<Link className="nav-link" to="/associations">
								Asociaciones
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/diseases">
								Enfermedades
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/feed">
								Publicaciones
							</Link>
						</li>
						{/* <li className="nav-item">
							<Link className="nav-link" to="/about-us">
								Quienes somos
							</Link>
						</li> */}
						<li className="nav-item dropdown color-username">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false">
								{store.user.username}
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
								<Link className="dropdown-item" to="/profile">
									<span>Perfil</span>
								</Link>
								<Link
									className="dropdown-item"
									to="/bye"
									type="button"
									onClick={() => actions.logout()}
									style={{ color: "grey" }}>
									Cerrar sesión
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
};
