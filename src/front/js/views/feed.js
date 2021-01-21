// PAGINA DONDE INSERTAR TODOS LOS POST DE LAS ENFERMEDADES SEGUIDAS POR EL USUARIO (RESUMEN DE LOS POST)
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardFeed } from "../component/card-feed.js";

export const Feed = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getFeed();
	}, []);

	const cardItemsFeed = store.feed.map((post, index) => {
		return (
			<Link key={index} to={`/post/${post.id}`}>
				<CardFeed post={post} />
			</Link>
		);
	});

	if (store.token == null) {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<h1>Es necesario iniciar sesion para acceder a esta pagina</h1>
				</div>
				<div className="row justify-content-center">
					<Link to="/login">
						<button type="button" className="btn btn-primary">
							Iniciar Sesión
						</button>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="text-center mt-5">
				<h1>Feed de inicio</h1>
				<div role="tabpanel" aria-labelledby="pills-grid">
					<div className="container my-3">
						<div className="row no-gutters">{cardItemsFeed}</div>
					</div>
				</div>
			</div>
		);
	}
};
