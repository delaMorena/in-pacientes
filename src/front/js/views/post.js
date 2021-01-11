// MUESTRA INFORMACION SOBRE UN POST, ARRASTRANDO SUS COMENTARIOS Y DANDO LA FUNCIONALIDAD DE CREAR NUEVOS COMENTARIOS.
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Post = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Esto es un post</h1>
		</div>
	);
};
