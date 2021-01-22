// CREAR UN NUEVO POST
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

export const SolAssociation = () => {
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
				<h1>Solicita el registro de una asociación</h1>
			</div>
			<form>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Asociación</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						placeholder="Nombre asociación"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Localización</label>
					<input
						type="text"
						className="form-control"
						aria-describedby="emailHelp"
						placeholder="Calle, Ciudad, CP, Provincia..."
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputEmail1">Sitio web</label>
					<input type="text" className="form-control" aria-describedby="emailHelp" placeholder="" />
				</div>
				<div className="form-group">
					<label>Descripción</label>
					<textarea
						placeholder="Enfermedades que apoya, actividades realizadas, etc..."
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
