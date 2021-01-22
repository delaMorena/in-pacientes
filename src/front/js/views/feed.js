// PAGINA DONDE INSERTAR TODOS LOS POST DE LAS ENFERMEDADES SEGUIDAS POR EL USUARIO (RESUMEN DE LOS POST)
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardFeed } from "../component/card-feed.js";
import { NoToken } from "../component/no-token";

export const Feed = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getFeed();
	}, []);

	// useEffect(
	// 	() => {
	// 		actions.getFeed();
	// 	},
	// 	[store.feed]
	// );

	const cardItemsFeed = store.feed.map((post, index) => {
		return (
			<Link key={index} to={`/post/${post.id}`}>
				<CardFeed post={post} />
			</Link>
		);
	});

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="container">
				<div className="row mb-2 justify-content-center">
					<h1>Feed de inicio</h1>
				</div>
				<div className="row mb-2 justify-content-center">
					<Link to="/createpost">
						<button type="button" className="btn btn-info">
							Crear Post
						</button>
					</Link>
				</div>
				<div className="card-deck d-flex align-content-around flex-wrap">{cardItemsFeed}</div>
			</div>
		);
	}
};
