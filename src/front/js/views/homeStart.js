import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
// import "../../styles/home.scss";

export const HomeStart = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="fluid-container">
			<div className="jumbotron text-center">
				<h1 className="display-4">In-Pacientes</h1>
				<p className="lead">Algun slogan</p>
				<hr className="my-4" />
				<p>
					It uses utility classNamees for typography and spacing to space content out within the larger
					container.
				</p>
				<div className="row d-flex justify-content-around">
					<div className="col-4">
						<a className="btn btn-primary btn-lg" href="#" role="button">
							Iniciar Sesión
						</a>
					</div>
					<div className="col-4">
						<a className="btn btn-primary btn-lg" href="#" role="button">
							Registrarse
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
