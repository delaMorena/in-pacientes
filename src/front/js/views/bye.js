import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.jpg";

import { Link } from "react-router-dom";

export const Bye = () => {
	const { store, actions } = useContext(Context);

	return (
		// <div className="card card-image">
		// 	<div className="text-center">
		// 		<img src={Logo} />
		// 		<div className="card text-center pt-3 mt-3">
		// 			<p>
		// 				Esperamos que hayas encontrado lo que buscabas. Cualquier sugerencia que quieras hacernos,
		// 				estaremos encantados de escucharla.
		// 				<p>Ayúdanos a mejorar</p>
		// 				<p>¡ESPERAMOS VERTE DE NUEVO PRONTO!</p>
		// 			</p>
		// 		</div>
		// 		<div className="row d-flex justify-content-around mt-3">
		// 			<div className="col-4">
		// 				<Link to="/login">
		// 					<button type="button" className="btn btn-secondary btn-white btn-lg">
		// 						Iniciar Sesión
		// 					</button>
		// 				</Link>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>

		<div className="fluid-container" id="bye-style">
			<div className="row my-5">
				<div className="col-8 col-lg-6 col-sm-8 d-flex justify-content-end pl-3">
					<img src={Logo} />
				</div>
				<div className="col-10 col-lg-6 col-sm-10">
					<div className="text-left">
						<p className="mt-4 px-4">
							Esperamos que hayas encontrado lo que buscabas. Cualquier sugerencia que quieras hacernos,
							estaremos encantados de escucharla.
							<p>Ayúdanos a mejorar</p>
							<p>¡ESPERAMOS VERTE DE NUEVO PRONTO!</p>
						</p>
					</div>
				</div>
			</div>

			{/* <div className="row justify-content-center my-5">
				<div className="text-center">
					<p className="mt-4 px-4">
						Esperamos que hayas encontrado lo que buscabas. Cualquier sugerencia que quieras hacernos,
						estaremos encantados de escucharla.
						<p>Ayúdanos a mejorar</p>
						<p>¡ESPERAMOS VERTE DE NUEVO PRONTO!</p>
					</p>
				</div>
			</div> */}
			<div className="row d-flex justify-content-around my-5">
				<Link to="/login">
					<button type="button" className="btn login-button-style">
						Iniciar Sesión
					</button>
				</Link>
			</div>
		</div>
	);
};
