// PAGINA DE USUARIO CON LOS POST QUE HAS PUBLICADO USANDO LAS VISTAS DE cardFeed.js
import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Perfil de enfermedad</h1>
		</div>
	);
};
