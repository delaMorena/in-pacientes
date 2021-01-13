// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const HandleClick = event => {
		const payload = {
			email: email,
			password: password
		};
		actions.createUser(payload);
	};

	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Registrar nuevo usuario</h1>
			</div>

			<form>
				<div className="form-group">
					<label htmlFor={email}>Email</label>
					<input
						type="email"
						className="form-control"
						aria-describedby="emailHelp"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<small id="emailHelp" className="form-text text-muted">
						We
						{"'"}
						ll never share your email with anyone else.
					</small>
				</div>
				<div className="form-group">
					<label htmlFor="exampleInputPassword1">Contraseña</label>
					<input
						type="password"
						className="form-control"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<button type="button" className="btn btn-primary" onClick={HandleClick}>
					Submit
				</button>
			</form>
		</div>
	);
};
