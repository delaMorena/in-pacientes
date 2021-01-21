import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="fluid-container">
			<div className="jumbotron text-center bg-white">
				<h1 className="display-4">In-Pacientes</h1>
				<p className="lead">LOOKING FOR YOU</p>

				<p>
					We want to be your tribe. We are looking for you. Join us in this journey that will improve your
					life. FOR SURE
				</p>
				<div className="row d-flex justify-content-around">
					<div className="col-4">
						<Link to="/login">
							<button type="button" className="btn btn-info btn-lg">
								Iniciar Sesión
							</button>
						</Link>
					</div>
					<div className="col-4">
						<Link to="/signup">
							<button type="button" className="btn btn-info btn-lg">
								Registrarme
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
