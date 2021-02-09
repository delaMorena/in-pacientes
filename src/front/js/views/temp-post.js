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

	const showComments = () => {
		const postComments = store.comments.map((comment, index) => {
			return (
				<div className="row" key={index}>
					<div className="col-12">
						<h5>{comment.user}</h5>
						<p>{comment.text}</p>
						<p>{comment.created_at}</p>
					</div>
				</div>
			);
		});

		if (store.comments.length == 0) {
			return (
				<div className="row">
					<div className="col-12">
						<h3>Aun no hay comentarios</h3>
						<p>¡Se el primero!</p>
					</div>
				</div>
			);
		} else {
			return postComments;
		}
	};

	const AddPostFavorites = async event => {
		const payload = {
			postId: parseInt(params.id)
		};
		await actions.addFavortites(payload);
		console.log(typeof payload.postId);
		alert("esta pasando algo");
	};

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="container">
				<div className="row my-3">
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
									<div className="col-md-1">
										<img src="https://picsum.photos/300/300" alt="image-post" />
									</div>
									<div className="col-md-5 text-left">
										<h3>{store.post.publisher}</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 mt-3">
						<div className="row justify-content-center my-3">
							<div className="col-10">
								<p>{store.post.text}</p>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row">
							<button type="button" className="btn btn-info" onClick={AddPostFavorites}>
								Seguir
							</button>
						</div>
					</div>
					<div className="col-12">
						<div className="row">
							<div className="col-7">{showComments()}</div>
							<div className="col-5">
								<form className="form-size-post">
									<div className="form-group">
										<textarea
											className="form-control"
											placeholder="Escribe tu comentario..."
											rows="3"
										/>
									</div>
								</form>
								<button type="button" className="btn btn-info ml-1">
									Comentar
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
