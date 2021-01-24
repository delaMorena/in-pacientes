import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.jpg";

import { Link } from "react-router-dom";

export const Bye = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card card-image">
			<div className="jumbotron text-center bg-info">
				<img src={Logo} />
				<div className="card text-center bg-info text-white pt-3 mt-3">
					<p>
						Esperamos que hayas encontrado lo que buscabas. Cualquier sugerencia que quieras hacernos,
						estaremos encantados de escucharla. Ayúdanos a mejorar
						<p>¡ESPERAMOS VERTE DE NUEVO PRONTO!</p>
					</p>
				</div>
				<div className="row d-flex justify-content-around mt-3">
					<div className="col-4">
						<Link to="/login">
							<button type="button" className="btn btn-secondary btn-white btn-lg">
								Iniciar Sesión
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
