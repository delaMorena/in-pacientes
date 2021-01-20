// CREAR USERNAME Y EMAIL
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const SignUp = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("alex@gmail.com");
	const [password, setPassword] = useState("12345");
	const [firstName, setFirstName] = useState("Alex");
	const [lastName, setLastName] = useState("Redondo");
	const [userName, setUserName] = useState("alexredondo");
	const [avatar, setAvatar] = useState("www.as.com");
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
			history.push("/follow");
			//pagina para elegir enfermedades y roles
		});
		// actions.editUser(payload);
		// console.log(payload);
	};

	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Registrar nuevo usuario</h1>
			</div>

			<form>
				<div className="form-group">
					<label htmlFor="exampleInputName">First name</label>
					<input
						type="text"
						className="form-control"
						placeholder="First name"
						value={firstName}
						onChange={event => setFirstName(event.target.value)}
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
