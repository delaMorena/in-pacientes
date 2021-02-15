// MUESTRA TODOS LOS POST DE UNA ENFERMEDAD. AÑADIR BOTON DE SEGUIR ENFERMEDAD.
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeedCenter } from "../component/card-feed-center.js";
import { NoToken } from "../component/no-token";

export const OldOneDisease = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.getPostsDisease(params.id);
		actions.getOneDisease(params.id);
	}, []);

	let cardItemsFeedDisease = "";
	if (store.diseasePost.length == 0) {
		cardItemsFeedDisease = (
			<div className="card p-3 text-center">
				<p>Aún no hay ninguna publicacion sobre esta enfermedad</p>
				<div className="row my-3 justify-content-center">
					<Link to="/inicio">
						<button type="button" className="btn btn-info">
							Crea una publicacion
						</button>
					</Link>
				</div>
			</div>
		);
	} else {
		cardItemsFeedDisease = store.diseasePost.map((post, index) => {
			return (
				<div className="row justify-content-center my-2" key={index}>
					<CardFeedCenter post={post} />
				</div>
			);
		});
	}

	// const cardItemsFeedDisease = store.diseasePost.map((postDisease, index) => {
	// 	return (
	// 		<Link key={index} to={`/post/${postDisease.id}`}>
	// 			<CardFeed post={postDisease} />
	// 		</Link>
	// 	);
	// });

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="fluid-container mx-3 mt-3">
				<div className="row mb-2 justify-content-center">
					<Link to="/inicio">
						<button type="button" className="btn btn-info">
							Volver a Inicio
						</button>
					</Link>
				</div>
				<div className="row justify-content-center">
					<div className="col-6">
						<div className="row mb-2 justify-content-center">
							<h2>Información de la enfermedad</h2>
						</div>
						<div className="row mb-2 justify-content-center">
							<Header itemName={store.oneDisease.title} qtyPost={store.diseasePost.length} />
						</div>
						<div className="row justify-content-center mx-4">
							<div className="row px-3">
								<h3>Descripción</h3>
							</div>
							<div className="row text-justify card">
								<div className="card-body">
									<p className="card-text">{store.oneDisease.description}</p>
								</div>
							</div>
						</div>
						<div className="row my-4 justify-content-center">
							<Link to="/follow">
								<button type="button" className="btn orange-button">
									Comienza a seguir esta enfermedad
								</button>
							</Link>
						</div>
					</div>
					<div className="col-6 px-5">
						<div className="row mb-2 justify-content-center">
							<h2>Publicaciones sobre la enfermedad</h2>
						</div>
						<div className="card-deck d-flex align-content-around flex-wrap mt-3">
							{cardItemsFeedDisease}
						</div>
					</div>
				</div>
			</div>
		);
	}
};
