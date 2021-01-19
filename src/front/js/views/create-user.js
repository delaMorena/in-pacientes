// CREAR PERFIL DE USUARIO CON LOS DATOS DE NOMBRE, APELLIDO, EDAD, ENFERMEDAD, ROL, ETC...
import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateUser = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	// useEffect(() => {
	// 	const init = async () => {
	// 		if (store.token) {
	// 			await actions.test();
	// 		} else {
	// 			history.push("/profile");
	// 		}
	// 	};
	// 	init();
	// }, []);


	// const OnSubmit = event => {
	// 	console.log("Name: ", firstName, "Last name: ", lastName, "User name: ", userName);
	// 	const payload = {
	// 		firstName: firstName,
	// 		lastName: lastName,
	// 		userName: userName,
	// 		avatar: avatar
	// 	};
	// 	actions.editUser(payload);
	// };
	const OnSubmit = event => {};


	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Escoge una enfermedad y tu relación con ella</h1>
			</div>
			<form>
				<div className="row">
					<div className="form-group col-6">
						<label htmlFor="exampleFormControlSelect2">Chose at least one disease to follow</label>
						<div className="input-group ">
							<select multiple className="form-control" aria-label="Example select with button addon">
								<option defaultValue>Choose...</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>
					</div>
					<div className="form-group col-6">
						<label>Select your role</label>
						<div className="input-group ">
							<select className="custom-select" id="inputGroupSelect01">
								<option defaultValue>Choose...</option>
								<option value="1">Pacient</option>
								<option value="2">Researcher</option>
								<option value="3">Doctor</option>
								<option value="4">Relative</option>
								<option value="5">Professional</option>
								<option value="6">Association</option>
							</select>
						</div>
					</div>
				</div>
			</form>
			<button type="submit" className="btn btn-primary" onClick={OnSubmit}>
				Submit
			</button>
		</div>
	);
};
