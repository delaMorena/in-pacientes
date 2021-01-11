// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const LogIn = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const HandleClick = event => {
		console.log("email: ", email);
		console.log("password: ", password);
	};

	return (

		<div className="container">
			<div className="text-center mt-5">
				<h1>Iniciar sesion</h1>
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
				<div className="form-group form-check">
					<input type="checkbox" className="form-check-input" />
					<label className="form-check-label" htmlFor="exampleCheck1">
						Recuerdame
					</label>
				</div>
				<button type="button" className="btn btn-primary" onClick={HandleClick}>
					Submit
				</button>
			</form>

		</div>
	);
};
