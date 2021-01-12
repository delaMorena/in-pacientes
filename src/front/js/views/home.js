import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
// import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="fluid-container">
			<div className="jumbotron text-center">
				<h1 className="display-4">In-Pacientes</h1>
				<p className="lead">Algun slogan</p>

				<p>
					It uses utility classNamees for typography and spacing to space content out within the larger
					container.
				</p>
				<div className="row d-flex justify-content-around">
					<div className="col-4">
						<Link to="/login">
							<button className="btn btn-primary btn-lg">Iniciar Sesión</button>
						</Link>
					</div>
					<div className="col-4">
						<Link to="/signup">
							<button className="btn btn-primary btn-lg">Registrarme</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
