// PAGINA DE USUARIO CON LOS POST QUE HAS PUBLICADO USANDO LAS VISTAS DE cardFeed.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeed } from "../component/card-feed.js";
import { NoToken } from "../component/no-token";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPostUser();
		actions.getUser();
		// actions.getPostsDisease(1);
	}, []);

	const cardItems = store.userPosts.map((post, index) => {
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
			<>
				<div className="container text-center mt-5">
					<h1>Perfil de usuario</h1>
					<h1>{store.user.username}</h1>
					<Header />
					<Link to="/follow">
						<button type="button" className="btn btn-primary">
							Busca la enfermedad que te interese
						</button>
					</Link>
				</div>

				<div className="row no-gutters">{cardItems}</div>
			</>
		);
	}
};
