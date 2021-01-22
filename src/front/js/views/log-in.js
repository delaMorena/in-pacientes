// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogIn = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const HandleClick = async event => {
		const payload = {
			email: email,
			password: password
		};
		await actions.userLogin(payload); // HASTA QUE NO SE EJECUTA ESTA FUNCION NO PASA A LA SIGUIENTE LINEA DE CODIGO

		history.push("/profile");
	};

	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Iniciar sesion</h1>
			</div>

			<form>
				<div className="form-group">
					<input
						placeholder="Email"
						type="email"
						className="form-control"
						aria-describedby="emailHelp"
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					{/* <small id="emailHelp" className="form-text text-muted">
						We
						{"'"}
						ll never share your email with anyone else.
					</small> */}
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Contraseña"
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
				<button type="button" className="btn btn-info btn-lg" onClick={HandleClick}>
					Iniciar Sesión
				</button>
			</form>
		</div>
	);
};
