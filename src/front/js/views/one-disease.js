// MUESTRA TODOS LOS POST DE UNA ENFERMEDAD. AÑADIR BOTON DE SEGUIR ENFERMEDAD.
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeed } from "../component/card-feed.js";
import { NoToken } from "../component/no-token";

export const OneDisease = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.getPostsDisease(params.id);
		actions.getOneDisease(params.id);
	}, []);

	const cardItemsFeedDisease = store.diseasePost.map((postDisease, index) => {
		return (
			<Link key={index} to={`/post/${postDisease.id}`}>
				<CardFeed post={postDisease} />
			</Link>
		);
	});

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			// <div className="text-center mt-5">
			// 	<h1>Perfil de enfermedad</h1>
			// 	<h1>{store.oneDisease.title}</h1>
			// 	<Header />
			// 	<div role="tabpanel" aria-labelledby="pills-grid">
			// 		<div className="container my-3">
			// 			<div className="row no-gutters">{cardItemsFeedDisease}</div>
			// 		</div>
			// 	</div>
			// </div>
			<div className="container">
				<div className="row mb-2 justify-content-center">
					<h1>Perfil de enfermedad</h1>
				</div>
				<div className="row mb-2 justify-content-center">
					<Header itemName={store.oneDisease.title} qtyPost={store.diseasePost.length} />
				</div>
				<div className="row mb-2 justify-content-center">
					<Link to="/follow">
						<button type="button" className="btn btn-primary">
							Añade esta enfermedad a tu lista de seguimiento
						</button>
					</Link>
				</div>
				<div className="card-deck d-flex align-content-around flex-wrap">{cardItemsFeedDisease}</div>
			</div>
		);
	}
};
