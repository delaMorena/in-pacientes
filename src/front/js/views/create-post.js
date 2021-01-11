// CREAR UN NUEVO POST
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CreatePost = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Escribe tu post</h1>
		</div>
	);
};
