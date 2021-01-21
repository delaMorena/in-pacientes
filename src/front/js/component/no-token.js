import React from "react";
import { Link } from "react-router-dom";

export const NoToken = () => {
	return (
		<div className="container">
			<div className="row justify-content-center">
				<h1>Es necesario iniciar sesion para acceder a esta pagina</h1>
			</div>
			<div className="row justify-content-center">
				<Link to="/login">
					<button type="button" className="btn btn-info btn-lg">
						Iniciar Sesión
					</button>
				</Link>
			</div>
		</div>
	);
};
