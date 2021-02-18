// CREAR UN NUEVO POST
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import "../../styles/solicitudes.scss";

export const SolDisease = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		// console.log("store.diseases: ", store.diseases, store.user);
		actions.getFollow();
	}, []);

	const OnSubmit = event => {
		alert("Solicitud creada correctamente");
		history.push("/feed");
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-10">
					<div className="text-center mt-5">
						<h1>Solicita la creación de una enfermedad rara</h1>
					</div>
					<form>
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Enfermedad</label>
							<input
								type="text"
								className="form-control"
								aria-describedby="emailHelp"
								placeholder="Nombre enfermedad"
							/>
						</div>
						<div className="form-group">
							<label>Descripción</label>
							<textarea
								placeholder="Sintomas, dolencias, tratamiento, etc..."
								className="form-control"
								rows="4"
							/>
						</div>
					</form>
				</div>
			</div>
			<div className="row justify-content-center mt-3">
				<button type="button" className="btn solicitud-button-enviar" onClick={OnSubmit}>
					Enviar
				</button>
			</div>
		</div>
	);
};
