// CREAR USERNAME Y EMAIL
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Registro de nuevo usuario</h1>
		</div>
	);
};
