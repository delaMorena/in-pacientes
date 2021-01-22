// CREAR UN NUEVO POST
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

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
						rows="5"
					/>
				</div>

				<button type="button" className="btn btn-info btn-lg" onClick={OnSubmit}>
					Enviar
				</button>
			</form>
		</div>
	);
};
