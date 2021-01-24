// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogIn = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [email, setEmail] = useState("marta@gmail.com");
	const [password, setPassword] = useState("12345");

	const HandleClick = async event => {
		const payload = {
			email: email,
			password: password
		};
		await actions.userLogin(payload); // HASTA QUE NO SE EJECUTA ESTA FUNCION NO PASA A LA SIGUIENTE LINEA DE CODIGO

		history.push("/feed");
	};

	return (
		<div className="fluid-container">
			<div className="row">
				<div className="col-6">
					<img src="https://picsum.photos/200/300" alt="imagen-login" />
				</div>
				<div className="col-6">
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
						<button type="button" className="btn btn-info btn-lg" onClick={HandleClick}>
							Iniciar Sesión
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
