// PAGINA DE USUARIO CON LOS POST QUE HAS PUBLICADO USANDO LAS VISTAS DE cardFeed.js
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Header } from "../component/header.js";
import { CardFeed } from "../component/card-feed.js";

export const Profile = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPostUser();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Perfil de usuario</h1>
			<h1>{store.user.email}</h1>
			<Header />
			<div className="text-center">
				{store.userPosts.map((value, index) => {
					return (
						<p key={index}>
							{value.text}
							{/* <button onClick={(event) => deleteTask(item.id)} type="button" className="close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
						</p>
					);
				})}
			</div>
			<div role="tabpanel" aria-labelledby="pills-grid">
				<div className="container my-3">
					<div className="row no-gutters">
						<CardFeed />
						<CardFeed />
						<CardFeed />
						<CardFeed />
						<CardFeed />
						<CardFeed />
					</div>
				</div>
			</div>
		</div>
	);
};
