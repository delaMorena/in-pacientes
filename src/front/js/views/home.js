import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.jpg";

import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="fluid-container">
			<div className="jumbotron text-center bg-white mt-5">
				<img src={Logo} />
				<p>
					We want to be your tribe. We are looking for you. Join us in this journey that will improve your
					life. FOR SURE
				</p>
				<div className="row d-flex justify-content-around mt-5">
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
