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

		history.push("/inicio");
	};

	return (
		<div className="fluid-container mx-3">
			<div className="row mt-5 align-items-center" id="login-style">
				<div className="col-6">
					<div className="row justify-content-center">
						<img src="https://picsum.photos/800/400" alt="imagen-login" />
					</div>
				</div>
				<div className="col-6 align-items-center">
					<div className="row justify-content-center">
						<h1>Iniciar sesion</h1>
					</div>
					<div className="row justify-content-center">
						<form id="form-width">
							<div className="form-group">
								<label className="style-label" htmlFor={email}>
									Correo electrónico
								</label>
								<input
									placeholder="nombre@ejemplo.es"
									type="email"
									className="form-control"
									aria-describedby="emailHelp"
									value={email}
									onChange={event => setEmail(event.target.value)}
								/>
							</div>
							<div className="form-group">
								<label className="style-label" htmlFor="exampleInputPassword1">
									Contraseña
								</label>
								<input
									type="password"
									placeholder="********"
									className="form-control"
									value={password}
									onChange={event => setPassword(event.target.value)}
								/>
							</div>
							<button type="button" className="btn btn-info btn-lg" onClick={HandleClick}>
								Iniciar Sesión
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
