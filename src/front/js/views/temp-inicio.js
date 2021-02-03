import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { NoToken } from "../component/no-token";
import { CardPost } from "../component/card-post";
import "../../styles/inicio.scss";

export const TempInicio = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getFeed();
		actions.getPostUser();
		actions.getUser();
		actions.getFollow();
	}, []);

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
				<tr key={index}>
					<td>{follow.disease.title}</td>
					<td>{convRol(follow.role)}</td>
				</tr>
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
					<div className="col-12 text-center">
						<h6>Lista de seguimiento</h6>
					</div>
					<div className="col-12 text-center mb-1">
						<table className="table-user-inicio">
							<tr>
								<th>Enfermedad</th>
								<th>Rol</th>
							</tr>
							{listFollows}
						</table>
					</div>
				</>
			);
		}
	};

	const showContentFeed = () => {
		const showFeedPost = store.feed.map((post, index) => {
			return <CardPost key={index} post={post} />;
		});

		if (store.feed.length == 0) {
			return (
				<div className="row my-3 box-empty-feed mx-1">
					<div className="col-12 text-center">
						<h3>Aun no sigues ninguna enfermedad</h3>
					</div>
					<div className="col-12 text-center">
						<button type="button" className="btn btn-info">
							Seguir
						</button>
					</div>
				</div>
			);
		} else {
			return showFeedPost;
		}
	};

	const showContentUserPost = () => {
		const showUserPost = store.userPosts.map((post, index) => {
			return <CardPost key={index} post={post} />;
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

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="container">
				<div className="row mb-3">
					<div className="col-xl-4">
						<div className="row mx-1 box-user-inicio mt-3">
							<div className="col-12">
								<div className="row align-items-center mt-3">
									<div className="col-md-6 box-user-image text-center">
										<img src="https://picsum.photos/800/800?random=1" alt="user-pic" />
									</div>
									<div className="col-md-6 box-user-image text-center">
										<h5>{store.user.username}</h5>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="row my-3 py-2 mx-1 list-user-inicio">{showFollows()}</div>
							</div>
						</div>
					</div>
					<div className="col-xl-8">
						<div className="row mx-1">
							<div className="col-12">
								<div className="row box-post-inicio my-3">
									<div className="col-12">
										<form className="my-3">
											<div className="form-group">
												<select className="form-control">
													<option>Elige una enfermedad</option>
													<option>1</option>
													<option>2</option>
													<option>3</option>
													<option>4</option>
													<option>5</option>
												</select>
											</div>
											<div className="form-group mt-1">
												<textarea
													className="form-control"
													placeholder="Escribe tu publicación"
													rows="1"
												/>
											</div>
											<div className="form-group mt-1">
												<input
													type="url"
													className="form-control"
													id="exampleInputEmail1"
													aria-describedby="emailHelp"
													rows="1"
													placeholder="URL imagen"
												/>
											</div>
										</form>
									</div>
									<div className="col-12">
										<div className="row justify-content-center pb-3">
											<button type="button" className="button-publicar-post">
												Publicar
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="row box-content-inicio">
									<div className="col-12">
										<ul
											className="nav nav-pills mt-3 d-flex justify-content-around"
											id="pills-tab"
											role="tablist">
											<li className="nav-item" role="presentation">
												<a
													className="nav-link active"
													id="pills-home-tab"
													data-toggle="pill"
													href="#post-feed"
													role="tab"
													aria-controls="pills-home"
													aria-selected="true">
													Publicaciones de mi interes
												</a>
											</li>

											<li className="nav-item" role="presentation">
												<a
													className="nav-link"
													id="pills-profile-tab"
													data-toggle="pill"
													href="#post-user"
													role="tab"
													aria-controls="pills-profile"
													aria-selected="false">
													Mis publicaciones
												</a>
											</li>
										</ul>
									</div>
									<div className="col-12">
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
