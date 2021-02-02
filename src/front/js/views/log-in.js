// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/log-in.scss";
// import Background from "../../img/login-bg.png";

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

		history.push("/inicio");
	};

	return (
		<div>
			<div className="card style-login-card">
				<h1 className="style-login-h1">Inicia sesión</h1>

				<form className="style-login-form">
					<div className="style-login-form-group">
						<label className="style-login-label" htmlFor={email}>
							Correo electrónico
						</label>
						<input
							placeholder="nombre@ejemplo.es"
							type="email"
							className="form-control style-login-input"
							aria-describedby="emailHelp"
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div className="style-login-form-group">
						<label className="style-login-label " htmlFor="exampleInputPassword1">
							Contraseña
						</label>
						<input
							type="password"
							placeholder="********"
							className="form-control style-login-input"
							value={password}
							onChange={event => setPassword(event.target.value)}
						/>
					</div>
					<button type="button" className="style-login-button" onClick={HandleClick}>
						Iniciar Sesión
					</button>
				</form>
			</div>
		</div>
	);
};
