// MUESTRA TODOS LOS POST DE UNA ENFERMEDAD. AÑADIR BOTON DE SEGUIR ENFERMEDAD.
import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { NoToken } from "../component/no-token";
import { CardPost } from "../component/card-post";
import "../../styles/one-disease.scss";

export const OneDisease = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	useEffect(() => {
		actions.getPostsDisease(params.id);
		actions.getOneDisease(params.id);
		actions.getFollow();
	}, []);

	const IsFollowed = () => {
		const newList = [];
		const showfollow = store.follows.map((follow, index) => {
			newList.push(follow.disease.title);
		});
		return newList.includes(store.oneDisease.title);
	};

	const ShowDiseasePost = () => {
		const showPost = store.diseasePost.map((post, index) => {
			return (
				<Link key={index} to={`/temppost/${post.id}`}>
					<CardPost post={post} />
				</Link>
			);
		});

		if (store.diseasePost.length == 0) {
			return (
				<div className="row">
					<div className="col-12 text-center">
						<h3>Aun no hay publicaciones sobre esta enfermedad</h3>
					</div>
					<div className="col-12 text-center">
						<p>¡sé el primero en crear una publicación!</p>
					</div>
				</div>
			);
		} else {
			return showPost;
		}
	};

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<>
				<div className="fluid-container">
					<div className="row mx-1">
						<div className="col-12">
							<div className="row">
								<p>breadcrumbs</p>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h1>{store.oneDisease.title}</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<p>{store.oneDisease.description}</p>
						</div>
					</div>
					<div className="row justify-content-center">
						<button type="button" className="btn btn-primary">
							{IsFollowed() == true ? "Dejar de seguir" : "Seguir"}
						</button>
					</div>
					<div className="row">
						<div className="col-12">
							<hr className="disease-divisor-line" />
						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-8">{ShowDiseasePost()}</div>
					</div>
				</div>
			</>
		);
	}
};
