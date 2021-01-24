import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardFeedCenter } from "../component/card-feed-center.js";
import { HeaderLeft } from "../component/header-left.js";
import { NoToken } from "../component/no-token";
import "../../styles/test.scss";

export const Test = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getFeed();
		actions.getPostUser();
		actions.getUser();
		actions.getFollow();
	}, []);

	const cardItemsFeed = store.feed.map((post, index) => {
		return (
			// <Link key={index} to={`/post/${post.id}`}>
			// 	<CardFeed post={post} />
			// </Link>
			<div key={index} className="row  justify-content-center my-4">
				<CardFeedCenter post={post} />
			</div>
		);
	});

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="fluid-container" id="style-container">
				<div className="row justify-content-center">
					<h3>Nuevo feed</h3>
				</div>
				<div className="row" id="">
					<div className="box-size" id="box-left">
						<div className="row justify-content-center">
							<h3>Tu perfil</h3>
						</div>
						<div className="row justify-content-center my-4">
							<HeaderLeft itemName={store.user.username} qtyPost={store.userPosts.length} />
						</div>
						<div className="row justify-content-center">
							<button type="button" className="btn btn-info">
								Ver mis publicaciones
							</button>
						</div>
					</div>
					<div className="box-size mb-4" id="box-center">
						<div className="row justify-content-center">
							<h3>Publicaciones de tu interes</h3>
						</div>
						{cardItemsFeed}
					</div>
					<div className="box-size" id="box-right">
						<div className="row justify-content-center">
							<h3>Crea una publicación</h3>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
