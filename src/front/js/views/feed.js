// PAGINA DONDE INSERTAR TODOS LOS POST DE LAS ENFERMEDADES SEGUIDAS POR EL USUARIO (RESUMEN DE LOS POST)
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Feed = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Feed de inicio</h1>
		</div>
	);
};
