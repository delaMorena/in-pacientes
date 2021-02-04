// MUESTRA INFORMACION SOBRE UN POST, ARRASTRANDO SUS COMENTARIOS Y DANDO LA FUNCIONALIDAD DE CREAR NUEVOS COMENTARIOS.
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { NoToken } from "../component/no-token";
import "../../styles/post.scss";

export const TempPost = () => {
	const { store, actions } = useContext(Context);
	const [comment, setComment] = useState("");
	const params = useParams();

	useEffect(() => {
		actions.getOnePost(params.id);
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<div className="row post-img">
						<img src="https://picsum.photos/1710/900" alt="image-post" />
					</div>
					<div className="row filter-img-text" />
					<div className="row text-up-image">
						<div className="col-12">
							<h3>{store.post.disease_name}</h3>
						</div>
						<div className="col-12">
							<div className="row align-items-center">
								<div className="col-1">
									<img src="https://picsum.photos/300/300" alt="image-post" />
								</div>
								<div className="col-6 text-left">
									<h3>{store.post.publisher}</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12">
					<p>{store.post.text}</p>
				</div>
			</div>
		</div>
	);
};
