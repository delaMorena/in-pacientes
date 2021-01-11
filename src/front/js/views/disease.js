// MUESTRA TODOS LOS POST DE UNA ENFERMEDAD. AÑADIR BOTON DE SEGUIR ENFERMEDAD.
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Disease = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Perfil de usuario</h1>
		</div>
	);
};
