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

	useEffect(
		() => {
			actions.getFeed();
		},
		[store.userPosts]
	);

	const showFeedPost = store.feed.map((post, index) => {
		return <CardPost key={index} post={post} />;
	});

	const showUserPost = store.userPosts.map((post, index) => {
		return <CardPost key={index} post={post} />;
	});

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
								<div className="row my-3 mx-1 list-user-inicio">
									<div className="col-12 text-center">
										<h6>Lista de seguimiento</h6>
									</div>
									<div className="col-12 text-center mb-1">
										<table className="table-user-inicio">
											<tr>
												<th>Enfermedad</th>
												<th>Rol</th>
											</tr>
											<tr>
												<td>Catarro común</td>
												<td>Paciente</td>
											</tr>
										</table>
									</div>
								</div>
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
											<div className="form-group mt-3">
												<textarea
													className="form-control"
													placeholder="Escribe tu publicación"
													rows="1"
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
											className="nav nav-pills my-3 d-flex justify-content-around"
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
												className="tab-pane fade"
												id="post-feed"
												role="tabpanel"
												aria-labelledby="pills-profile-tab">
												{showFeedPost}
											</div>
											<div
												className="tab-pane fade show active"
												id="post-user"
												role="tabpanel"
												aria-labelledby="pills-home-tab">
												{showUserPost}
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
