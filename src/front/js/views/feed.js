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
};
