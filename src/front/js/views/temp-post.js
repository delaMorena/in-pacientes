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
	const [files, setFiles] = useState(0);

	useEffect(() => {
		actions.getOnePost(params.id);
		actions.getFavorites();
	}, []);

	const uploadPostImage = event => {
		event.preventDefault();
		actions.uploadPostPicture(files, store.post.id);
		actions.getOnePost(params.id);
	};
	// const showPostImage = () => {
	// 	if (store.post.image == undefined) {
	// 		return <i className="fas fa-image fa-7x" />;
	// 	} else {
	// 		return <img src={store.post.image} alt="user-pic" />;
	// 	}
	// };
	const showProfilePublisherImage = () => {
		if (store.post.publisher_avatar == undefined) {
			return <i className="icono-user-style fas fa-user-alt fa-2x" />;
		} else {
			return <img src={store.post.publisher_avatar} alt="user-pic" />;
		}
	};

	const IsFavorite = () => {
		const oneItem = store.post;
		const listItem = store.favorites;

		if (listItem.length == 0) {
			return <i className="far fa-bookmark fa-2x" onClick={AddPostFavorites} />;
		}

		let i;

		for (i = 0; i < listItem.length; i++) {
			if (listItem[i]["id"] === oneItem["id"]) {
				return <i className="fas fa-bookmark fa-2x post-cursor-click" onClick={DeleteFavorites} />;
			} else {
				return <i className="far fa-bookmark fa-2x post-cursor-click" onClick={AddPostFavorites} />;
			}
		}
	};

	const AddPostFavorites = event => {
		const payload = {
			postId: parseInt(params.id)
		};
		actions.addFavortites(payload);
	};

	const DeleteFavorites = event => {
		actions.deleteFavorite(params.id);
	};

	const showComments = () => {
		const postComments = store.comments.map((comment, index) => {
			return (
				<div className="row my-1" key={index}>
					<div className="col-12">
						<p className="font-weight-bolder">{comment.user}</p>
						<p>{comment.text}</p>
						<p className="text-muted">{comment.created_at}</p>
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

	const SendComment = event => {
		const payload = {
			comment: comment,
			postId: parseInt(params.id)
		};

		actions.createComment(payload);
		setComment("");
	};

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="container">
				<div className="row my-3">
					<div className="col-12">
						<div className="row post-img">
							<img src={store.post.image} />
						</div>
						<div className="row filter-img-text">
							<div className="row text-up-image">
								<div className="col-12">
									<div className="row ml-2">
										<div className="col-9">
											<h3>{store.post.disease_name}</h3>
										</div>
										<div className="col-3 text-right">{IsFavorite()}</div>
									</div>
								</div>
								<div className="col-12">
									<div className="row d-flex flex-column">
										<div className="col-2 temp-post-user-image-round img">
											{showProfilePublisherImage()}
										</div>
										<div className="col-2 text-center">
											<h3>{store.post.publisher}</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12 mt-2 " type="button" data-toggle="modal" data-target="#exampleModal">
							<p className="p-edit-profile-font">Edita tu foto</p>
							<i className="fas fa-pencil-alt pencil-inicio-clickable" />
						</div>
						{/* <div className="col-2 mt-4">
							<div
								className="pencil-inicio-clickable"
								// type="button"
                                // className="btn btn-primary"
                                type="button"
								data-toggle="modal"
								data-target="#exampleModal">
								<i className="fas fa-pencil-alt" />
							</div>
						</div> */}
						<div
							className="modal fade"
							id="exampleModal"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="exampleModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											Añade una foto a tu publicación
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<span aria-hidden="true">&times;</span>
										</button>
									</div>
									<div className="modal-body">
										<div className="jumbotron">
											<form onSubmit={uploadPostImage}>
												<input type="file" onChange={() => setFiles(event.target.files)} />
												<button>Actualizar</button>
											</form>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn btn-secondary" data-dismiss="modal">
											Cerrar
										</button>
										<button type="button" className="btn" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 mt-3">
						<div className="row justify-content-center mt-3">
							<div className="col-8">
								<p>{store.post.text}</p>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row justify-content-center">
							<div className="col-8">
								<hr className="post-divisor-line" />
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row justify-content-center mt-1">
							<div className="col-8">
								<h3 className="font-weight-bolder">Comentarios</h3>
							</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row justify-content-center">
							<div className="col-8">{showComments()}</div>
						</div>
					</div>
					<div className="col-12">
						<div className="row justify-content-center">
							<div className="col-8 text-center">
								<form className="form-size-post">
									<div className="form-group">
										<textarea
											className="form-control post-textarea-style"
											placeholder="Escribe tu comentario..."
											rows="3"
											value={comment}
											onChange={event => setComment(event.target.value)}
										/>
									</div>
								</form>
								<button type="button" className="btn post-button-comment" onClick={SendComment}>
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
