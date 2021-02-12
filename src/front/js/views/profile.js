// PAGINA DE USUARIO CON LOS POST QUE HAS PUBLICADO USANDO LAS VISTAS DE cardFeed.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeed } from "../component/card-feed.js";
import { NoToken } from "../component/no-token";
import "../../styles/profile.scss";
import { CardFeedCenter } from "../component/card-feed-center";

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

	let cardItems = "";
	if (store.userPosts.length == 0) {
		cardItems = (
			<div className="card pt-3 mt-3 text-center">
				<p>Aún no has publicado nada, ¡crea tu primera publicación!</p>
				<div className="row my-3 justify-content-center">
					<Link to="/inicio">
						<button type="button" className="btn btn-info">
							Crea una publicación
						</button>
					</Link>
				</div>
			</div>
		);
	} else {
		cardItems = store.userPosts.map((post, index) => {
			return (
				// <div key={index}>
				// 	<Link to={`/post/${post.id}`}>
				// 		<CardFeed post={post} />
				// 	</Link>
				// 	<CardFeedCenter post={index} />
				// </div>
				<div className="row justify-content-center my-3" key={index}>
					{/* <Link to={`/post/${post.id}`}>
						<CardFeed post={post} />
					</Link> */}
					<CardFeedCenter post={post} />
				</div>
			);
		});
	}
	// const cardItems = store.userPosts.map((post, index) => {
	// 	return (
	// 		<Link key={index} to={`/post/${post.id}`}>
	// 			<CardFeed post={post} />
	// 		</Link>
	// 	);
	// });

	const listFollows = store.follows.map((follow, index) => {
		return (
			<li key={index} className="list-group-item bg-light">
				{" "}
				<div className="row">
					<div className="col-8 d-flex align-items-center justify-content-center">
						<Link to={`/onedisease/${follow.disease.id}`}>
							<button type="button" className="btn btn-outline-info">
								{follow.disease.title}
							</button>
						</Link>
					</div>
					<div className="col-4 d-flex align-items-center justify-content-center">
						<h5>{convRol(follow.role)}</h5>
					</div>
				</div>
			</li>
		);
	});

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
							<h2>Datos del usuario</h2>
						</div>
						<div className="row mb-2 justify-content-center">
							<Header
								itemName={store.user.username}
								qtyPost={store.userPosts.length}
								profilePicture={store.user.avatar}
							/>
						</div>
						<div className="row justify-content-center px-3">
							<h3>Enfermedades seguidas</h3>
						</div>
						<div className="row  justify-content-center my-3">
							<ul className="list-group" id="list-width">
								<li className="list-group-item">
									<div className="row justify-content-center">
										<div className="col-8 text-center">
											<h4>Enfermedad</h4>
										</div>
										<div className="col-4 text-center">
											<h4>Rol</h4>
										</div>
									</div>
								</li>
								{listFollows}
							</ul>
						</div>
						<div className="row mt-2 justify-content-center">
							<Link to="/follow">
								<button type="button" className="btn orange-button">
									Seguir a mas enfermedades
								</button>
							</Link>
						</div>
					</div>
					<div className="col-6 px-5">
						<div className="row mb-2 justify-content-center">
							<h2>Mis publicaciones</h2>
						</div>
						<div className="card-deck d-flex align-content-around flex-wrap">{cardItems}</div>
					</div>
				</div>
			</div>
		);
	}
};
