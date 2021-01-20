// PAGINA DE USUARIO CON LOS POST QUE HAS PUBLICADO USANDO LAS VISTAS DE cardFeed.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeed } from "../component/card-feed.js";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPostUser();
		actions.getUser();
	}, []);

	const cardItems = store.userPosts.map((post, index) => {
		console.log(post.comments);

		return (
			<Link key={index} to={`/post/${post.id}`}>
				<CardFeed post={post} />
			</Link>
		);
	});

	return (
		<div className="container text-center mt-5">
			<h1>Perfil de usuario</h1>
			<h1>{store.user.username}</h1>
			<Header />
			<div className="text-center" />
			<div role="tabpanel" aria-labelledby="pills-grid">
				<div className="my-3">
					<div className="row no-gutters">{cardItems}</div>
				</div>
			</div>
		</div>
	);
};
