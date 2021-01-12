// PAGINA DONDE INSERTAR TODOS LOS POST DE LAS ENFERMEDADES SEGUIDAS POR EL USUARIO (RESUMEN DE LOS POST)
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CardFeed } from "../component/card-feed.js";

export const Feed = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Feed de inicio</h1>
			<div role="tabpanel" aria-labelledby="pills-grid">
				<div className="container my-3">
					<div className="row no-gutters">
						<CardFeed />
						<CardFeed />
						<CardFeed />
						<CardFeed />
						<CardFeed />
						<CardFeed />
					</div>
				</div>
			</div>
		</div>
	);
};
