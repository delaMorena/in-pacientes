// CREAR PERFIL DE USUARIO CON LOS DATOS DE NOMBRE, APELLIDO, EDAD, ENFERMEDAD, ROL, ETC...
import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const CreateUser = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState("");

	useEffect(() => {
		const init = async () => {
			if (store.token) {
				await actions.test();
			} else {
				history.push("/login");
			}
		};

		init();
	}, []);

	const OnSubmit = event => {
		console.log("Name: ", name, "Last name: ", lastName, "User name: ", userName);
	};

	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Crea tu usuario</h1>
			</div>
			<form>
				<div className="form-group">
					<label htmlFor="exampleInputName">Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="First name"
						value={name}
						onChange={event => setName(event.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputLastName">Last Name</label>
					<input
						type="text"
						className="form-control"
						placeholder="Last name"
						value={lastName}
						onChange={event => setLastName(event.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputUsername">User name</label>
					<input
						type="text"
						className="form-control"
						placeholder="User name"
						value={userName}
						onChange={event => setUserName(event.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputUsername">Avatar</label>
					<input
						type="url"
						className="form-control"
						placeholder="input your url"
						value={avatar}
						onChange={event => setAvatar(event.target.value)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="exampleFormControlSelect2">Chose at least one disease to follow</label>
					<div className="input-group">
						<select multiple className="form-control" aria-label="Example select with button addon">
							<option defaultValue>Choose...</option>
							<option value="1">One</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
					</div>
				</div>
				<div className="form-group">
					<label>Select your role</label>
					<div className="input-group">
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
			</form>
			<button type="submit" className="btn btn-primary" onClick={OnSubmit}>
				Submit
			</button>
		</div>
	);
};
