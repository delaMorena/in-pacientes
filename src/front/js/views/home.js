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
					Sabemos que padecer una enfermedad rara no es tan raro. También sabemos que puedes sentir una gran
					soledad porque quizá no encuentres a otras personas en tu misma situación en tu entorno más cercano.
					Estamos impacientes porque te unas y entre todas las personas interesadas o que padecejn directa o
					indirectamente una enfermedad rara podamos crear una tribu cada vez mayor.
					<span>Te estamos buscando a tí</span>
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
