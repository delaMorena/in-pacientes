// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("marta@gmail.com");
	const [password, setPassword] = useState("12345");
	const [firstName, setFirstName] = useState("Marta");
	const [lastName, setLastName] = useState("De la Morena");
	const [userName, setUserName] = useState("Delamorena");
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
			history.push("/welcome");
			//pagina de bienvenida para logearte
		});
	};

	return (
		<div className="container">
			<div className="text-center my-5">
				<h1>Registrar nuevo usuario</h1>
			</div>

			<form>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Nombre"
						value={firstName}
						onChange={event => setFirstName(event.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Apellidos"
						value={lastName}
						onChange={event => setLastName(event.target.value)}
					/>
				</div>
				<div className="form-group">
					{/* <label htmlFor="exampleInputUsername">Username</label> */}
					<input
						type="text"
						className="form-control"
						placeholder="Username"
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
					{/* <label htmlFor={email}>Email</label> */}
					<input
						type="email"
						placeholder="Email"
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
					{/* <label htmlFor="exampleInputPassword1">Contraseña</label> */}
					<input
						type="password"
						placeholder="Contraseña"
						className="form-control"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<button type="button" className="btn btn-info btn-lg" onClick={HandleClick}>
					Registrarse
				</button>
			</form>
		</div>
	);
};
