import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { NoToken } from "../component/no-token";
import { CardPost } from "../component/card-post";
import "../../styles/inicio.scss";

export const Inicio = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();
	// const [url, setUrl] = useState("");
	const [text, setText] = useState("");
	const [diseaseId, setDiseaseId] = useState();
	const [selected, setSelected] = useState("interes");
	const [files, setFiles] = useState(0);
	const [postFiles, setPostFiles] = useState(0);
	// const { id } = props;

	useEffect(() => {
		actions.getFeed();
		actions.getPostUser();
		actions.getUser();
		actions.getFollow();
		actions.getFavorites();
	}, []);

	const OnSubmit = event => {
		const payload = {
			text: text,
			// url: url,
			diseaseId: parseInt(diseaseId)
		};

		actions.createPost(payload, postFiles);
		setText("");
		// setUrl("");
	};

	const uploadProfileImage = event => {
		if (files == 0) {
			alert("no has subido ninguna foto");
		}
		event.preventDefault();
		actions.uploadProfilePicture(files, store.user.id);
		history.push("/inicio");
	};

	const showFollows = () => {
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

		const listFollows = store.follows.map((follow, index) => {
			return (
				<div className="row mb-2 inicio-tag-follow align-items-center" key={index}>
					<Link to={`/onedisease/${follow.disease.id}`}>
						<div className="col-12 post-cursor-click py-1">
							<p>{follow.disease.title}</p>
						</div>
					</Link>
				</div>
			);
		});

		if (store.follows.length == 0) {
			return (
				<div className="col-12 text-center">
					<p>Aun no sigues ninguna enfermedad</p>
				</div>
			);
		} else {
			return (
				<>
					<div className="col-12 mb-1">
						<p>Lista de seguimiento</p>
					</div>
					<div className="col-12">{listFollows}</div>
					<div className="col-12 text-right">
						<Link to="/follow">
							<p>Seguir mas enfermedades</p>
						</Link>
					</div>
				</>
			);
		}
	};

	const showDiseaseOption = () => {
		const diseasesOption = store.follows.map((follow, index) => {
			return (
				<option key={index} value={follow.disease.id}>
					{follow.disease.title}
				</option>
			);
		});
		if (store.follows.length == 0) {
			return (
				<>
					<option>Ops...No se han encontrado enfermedades</option>
				</>
			);
		} else {
			return diseasesOption;
		}
	};

	const showContentFeed = () => {
		const showFeedPost = store.feed.map((post, index) => {
			return (
				<Link key={index} to={`/temppost/${post.id}`}>
					<CardPost post={post} />
				</Link>
			);
		});

		if (store.feed.length == 0 && store.follows.length != 0) {
			return (
				<div className="row my-3 box-empty-feed mx-1">
					<div className="col-12 text-center">
						<h3>Aun no hay publicaciones de tu interes</h3>
					</div>
					<div className="col-12 text-center">
						<p>¡crea tu primera publicación!</p>
					</div>
				</div>
			);
		} else if (store.follows.length == 0) {
			return (
				<div className="row my-3 box-empty-feed mx-1">
					<div className="col-12 text-center">
						<h3>Aun no sigues ninguna enfermedad</h3>
					</div>
					<div className="col-12 text-center">
						<Link to="/follow">
							<button type="button" className="btn btn-info">
								Seguir
							</button>
						</Link>
					</div>
				</div>
			);
		} else {
			return showFeedPost;
		}
	};

	const showContentUserPost = () => {
		const showUserPost = store.userPosts.map((post, index) => {
			return (
				<Link key={index} to={`/temppost/${post.id}`}>
					<CardPost post={post} />
				</Link>
			);
		});

		if (store.userPosts.length == 0) {
			return (
				<div className="row my-3 box-empty-feed mx-1">
					<div className="col-12 text-center">
						<h3>Aun no has publicado nada</h3>
					</div>
					<div className="col-12 text-center">
						<p>¡crea tu primera publicación!</p>
					</div>
				</div>
			);
		} else {
			return showUserPost;
		}
	};

	const showContentFavorites = () => {
		const showFavorites = store.favorites.map((post, index) => {
			return (
				<Link key={index} to={`/temppost/${post.id}`}>
					<CardPost post={post} />
				</Link>
			);
		});

		if (store.favorites.length == 0) {
			return (
				<div className="row my-3 box-empty-feed mx-1">
					<div className="col-12 text-center">
						<h3>Aun no hay nada en favorito</h3>
					</div>
					<div className="col-12 text-center">
						<p>¡marca como favorita alguna publicación!</p>
					</div>
				</div>
			);
		} else {
			return showFavorites;
		}
	};

	const showProfileImage = () => {
		if (store.user.avatar == undefined) {
			return <i className="icono-user-style fas fa-user-alt fa-5x" />;
		} else {
			return <img src={store.user.avatar} alt="user-pic" />;
		}
	};

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xl-4">
						<div className="row mx-1 box-user-inicio mt-3 align-items-center">
							<div className="col-12">
								<div className="row align-items-center mt-3">
									<div className="col-12 box-user-image text-center">
										{showProfileImage()}
										<div className="row">
											<div className="col-7 offset-1 mt-4">
												<p className="p-edit-profile-font">Edita tu foto</p>
											</div>
											<div className="col-2 mt-4">
												<div
													className="pencil-inicio-clickable"
													// type="button"
													// className="btn btn-primary"
													data-toggle="modal"
													data-target="#exampleModal">
													<i className="fas fa-pencil-alt" />
												</div>
											</div>
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
																Edita tu foto de perfil
															</h5>
															<button
																type="button"
																className="close"
																data-dismiss="modal"
																aria-label="Close">
																<span aria-hidden="true">&times;</span>
															</button>
														</div>
														<div className="modal-body">
															<div className="jumbotron">
																<form onSubmit={uploadProfileImage}>
																	<input
																		type="file"
																		onChange={() => setFiles(event.target.files)}
																	/>
																	<button>Actualizar</button>
																</form>
															</div>
														</div>
														<div className="modal-footer">
															<button
																type="button"
																className="btn btn-secondary"
																data-dismiss="modal">
																Cerrar
															</button>
															<button type="button" className="btn" />
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-12 box-user-image text-center">
										<h5>{store.user.username}</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div className="row">
							<div className="col-12">
								<form className="my-3">
									<div className="form-group">
										<select
											className="form-control inicio-input-style"
											onChange={e => setDiseaseId(e.target.value)}>
											<option>Elige una enfermedad</option>
											{showDiseaseOption()}
										</select>
									</div>
									<div className="form-group mt-3">
										<textarea
											className="form-control inicio-input-style"
											placeholder="Escribe tu publicación"
											rows="1"
											value={text}
											onChange={event => setText(event.target.value)}
										/>
									</div>
									<div className="form-group mt-1">
										{/* <input
											type="url"
											className="form-control"
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
											rows="1"
											placeholder="URL imagen"
											value={url}
											onChange={e => setUrl(e.target.value)}
										/> */}
										<input type="file" onChange={() => setPostFiles(event.target.files)} />
									</div>
								</form>
								{/* <form onSubmit={uploadPostImage}>
									<input type="file" onChange={() => setpostFiles(event.target.files)} />
									<button>Upload Post Files</button>
								</form> */}
							</div>
							<div className="col-12">
								<div className="row justify-content-center">
									<button type="button" className="btn inicio-button-publicar" onClick={OnSubmit}>
										Publicar
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<hr className="post-divisor-line" />
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-xl-4">
						<div className="col-12">
							<div className="row list-user-inicio">{showFollows()}</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div className="row">
							<div className="col-12">
								<div className="row box-content-inicio">
									<div className="col-12">
										<ul
											className="nav nav-pills d-flex justify-content-between align-items-center"
											id="pills-tab"
											role="tablist">
											<div className="col-xl-4 text-center">
												<li className="nav-item" role="presentation">
													<a
														className={
															selected == "interes"
																? "btn inicio-button-activated"
																: "btn inicio-button-disabled"
														}
														id="pills-home-tab"
														data-toggle="pill"
														href="#post-feed"
														role="tab"
														onClick={() => setSelected("interes")}>
														Novedades
													</a>
												</li>
											</div>
											<div className="col-xl-4 text-center">
												<li className="nav-item" role="presentation">
													<a
														className={
															selected == "publicaciones"
																? "btn inicio-button-activated"
																: "btn inicio-button-disabled"
														}
														id="pills-profile-tab"
														data-toggle="pill"
														href="#post-user"
														role="tab"
														onClick={() => setSelected("publicaciones")}>
														Mis publicaciones
													</a>
												</li>
											</div>
											<div className="col-xl-4 text-center">
												<li className="nav-item" role="presentation">
													<a
														className={
															selected == "favoritos"
																? "btn inicio-button-activated"
																: "btn inicio-button-disabled"
														}
														id="pills-profile-tab"
														data-toggle="pill"
														href="#post-fav"
														role="tab"
														onClick={() => setSelected("favoritos")}>
														Favoritos
													</a>
												</li>
											</div>
										</ul>
									</div>
									<div className="col-12 mt-2">
										<div className="tab-content" id="pills-tabContent">
											<div
												className="tab-pane fade show active"
												id="post-feed"
												role="tabpanel"
												aria-labelledby="pills-profile-tab">
												{showContentFeed()}
											</div>
											<div
												className="tab-pane fade"
												id="post-user"
												role="tabpanel"
												aria-labelledby="pills-home-tab">
												{showContentUserPost()}
											</div>
											<div
												className="tab-pane fade"
												id="post-fav"
												role="tabpanel"
												aria-labelledby="pills-home-tab">
												{showContentFavorites()}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

// TempInicio.propTypes = {
// 	id: PropTypes.number
// };
