// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import Background from "../../img/background-signin.png";
import "../../styles/sign-up.scss";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState("");
	const history = useHistory();

	const HandleClick = event => {
		const payload = {
			email: email,
			password: password,
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			avatar: avatar
		};
		actions.createUser(payload, () => {
			history.push("/inicio");
		});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-7 col-12">
					<img src={Background} alt="Opendoor" className="sign-up-img" />
				</div>

				<div className="col-lg-5 col-12 pl-5">
					{/* <div className="text-center my-5">
						<h1 className="style-h1">Crea una cuenta</h1>
					</div> */}
					<h1 className="style-h1">Crea una cuenta</h1>
					<form className="style-form">
						<div className="form-group">
							<label className="style-label" htmlFor="exampleInputUsername">
								Nombre
							</label>
							<input
								type="text"
								className="form-control input-style"
								placeholder="Nombre"
								value={firstName}
								onChange={event => setFirstName(event.target.value)}
							/>
						</div>
						<div className="form-group">
							<label className="style-label" htmlFor="exampleInputUsername">
								Apellidos
							</label>
							<input
								type="text"
								className="form-control input-style"
								placeholder="Apellido"
								value={lastName}
								onChange={event => setLastName(event.target.value)}
							/>
						</div>
						<div className="form-group">
							<label className="style-label" htmlFor="exampleInputUsername">
								Nombre de usuario
							</label>
							<input
								type="text"
								className="form-control input-style"
								placeholder="NombreUsuario"
								value={userName}
								onChange={event => setUserName(event.target.value)}
							/>
						</div>
						{/* <div className="form-group">
					<label htmlFor="exampleInputUsername">Avatar</label>
					<input
						type="url"
						className="form-control"
						placeholder="input your url"
						value={avatar}
						onChange={event => setAvatar(event.target.value)}
					/>
				</div> */}
						<div className="form-group">
							<label className="style-label" htmlFor={email}>
								Correo electrónico
							</label>
							<input
								type="email"
								placeholder="nombre@ejemplo.es"
								className="form-control input-style"
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
							<label className="style-label" htmlFor="exampleInputPassword1">
								Contraseña
							</label>
							<input
								type="password"
								placeholder="********"
								className="form-control input-style"
								value={password}
								onChange={event => setPassword(event.target.value)}
							/>
						</div>
						<button type="button" className="btn register-button-style" onClick={HandleClick}>
							Registrarse
						</button>
					</form>
				</div>
			</div>
			{/* <a href="https://www.vecteezy.com/free-vector/grunge-background">Grunge Background Vectors by Vecteezy</a> */}
		</div>
	);
};
