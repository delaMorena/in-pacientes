// MUESTRA TODOS LOS POST DE UNA ENFERMEDAD. AÑADIR BOTON DE SEGUIR ENFERMEDAD.
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeed } from "../component/card-feed.js";

export const OneDisease = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.getPostsDisease(params.id);
	}, []);

	const cardItemsFeedDisease = store.diseasePost.map((postDisease, index) => {
		console.log("postDisease: ", postDisease);

		return (
			<Link key={index} to={`/post/${postDisease.id}`}>
				<CardFeed post={postDisease} />
			</Link>
		);
	});

	return (
		<div className="text-center mt-5">
			<h1>Perfil de enfermedad</h1>
			<Header />
			<div role="tabpanel" aria-labelledby="pills-grid">
				<div className="container my-3">
					<div className="row no-gutters">{cardItemsFeedDisease}</div>
				</div>
			</div>
		</div>
	);
};
