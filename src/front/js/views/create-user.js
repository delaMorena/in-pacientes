// CREAR PERFIL DE USUARIO CON LOS DATOS DE NOMBRE, APELLIDO, EDAD, ENFERMEDAD, ROL, ETC...
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CreateUser = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Crea tu usuario</h1>
			</div>
			<form>
				<div className="form-group">
					<label htmlFor="exampleInputName">Name</label>
					<input type="text" className="form-control" placeholder="First name" />
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputLastName">Last Name</label>
					<input type="text" className="form-control" placeholder="Last name" />
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputUsername">User name</label>
					<input type="text" className="form-control" placeholder="User name" />
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputUsername">Avatar</label>
					<input type="url" className="form-control" placeholder="input your url" />
				</div>
			</form>

			<div className="input-group">
				<select className="custom-select" id="inputGroupSelect04" aria-label="Example select with button addon">
					<option selected>Choose your disease</option>
					<option value="1">One</option>
					<option value="2">Two</option>
					<option value="3">Three</option>
				</select>
				<div className="input-group-append">
					<button className="btn btn-outline-secondary" type="button">
						Button
					</button>
				</div>
			</div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text" htmlFor="inputGroupSelect01">
						Select your role
					</label>
				</div>
				<select className="custom-select" id="inputGroupSelect01">
					<option selected>Choose...</option>
					<option value="1">Pacient</option>
					<option value="2">Researcher</option>
					<option value="3">Doctor</option>
					<option value="4">Relative</option>
					<option value="5">Professional</option>
					<option value="6">Association</option>
				</select>
			</div>
			<button type="submit" className="btn btn-primary">
				Submit
			</button>
		</div>
	);
};
