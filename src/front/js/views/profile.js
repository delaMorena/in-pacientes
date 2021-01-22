// PAGINA DE USUARIO CON LOS POST QUE HAS PUBLICADO USANDO LAS VISTAS DE cardFeed.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeed } from "../component/card-feed.js";
import { NoToken } from "../component/no-token";
import "../../styles/profile.scss";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPostUser();
		actions.getUser();
		actions.getFollow();
	}, []);

	const convRol = index => {
		if (index == 1) {
			return "Paciente";
		} else if (index == 2) {
			return "Investigador";
		} else if (index == 3) {
			return "Doctor";
		} else if (index == 4) {
			return "Familiar";
		} else if (index == 5) {
			return "Profesional";
		} else if (index == 6) {
			return "Asociación";
		} else {
			return "No definido";
		}
	};

	const cardItems = store.userPosts.map((post, index) => {
		return (
			<Link key={index} to={`/post/${post.id}`}>
				<CardFeed post={post} />
			</Link>
		);
	});

	const listFollows = store.follows.map((follow, index) => {
		return (
			<li key={index} className="list-group-item">
				{" "}
				<div className="row">
					<div className="col-8 text-center">{follow.disease.title}</div>
					<div className="col-4 text-center">{convRol(follow.role)}</div>
				</div>
			</li>
		);
	});

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="container">
				<div className="row mb-2 justify-content-center">
					<h1>Perfil de usuario</h1>
				</div>
				<div className="row mb-2 justify-content-center">
					<Header itemName={store.user.username} qtyPost={store.userPosts.length} />
				</div>
				<div className="row mb-2 justify-content-center">
					<Link to="/follow">
						<button type="button" className="btn btn-primary">
							Busca la enfermedad que te interese
						</button>
					</Link>
				</div>
				<div className="row  justify-content-center my-3">
					<ul className="list-group" id="list-width">
						<li className="list-group-item">
							<div className="row justify-content-center">
								<div className="col-8 text-center">
									<h5>Enfermedad</h5>
								</div>
								<div className="col-4 text-center">
									<h5>Rol</h5>
								</div>
							</div>
						</li>
						{listFollows}
					</ul>
				</div>
				<div className="card-deck d-flex align-content-around flex-wrap">{cardItems}</div>
			</div>
		);
	}
};
