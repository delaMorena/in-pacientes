// CREAR USERNAME Y EMAIL
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const LogIn = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Inicia sesión</h1>
		</div>
	);
};
