import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { NoToken } from "../component/no-token";
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
										<div className="row py-3">
											<div className="col-md-6 text-center my-1">
												<button type="button" className="button-select-inicio">
													Publicaciones de mi interes
												</button>
											</div>
											<div className="col-md-6 text-center my-1">
												<button type="button" className="button-noselect-inicio">
													Mis publicaciones
												</button>
											</div>
										</div>
									</div>
									<div className="col-12">
										<div className="row card-post-inicio mx-1 align-items-center mb-3 py-3">
											<div className="col-md-3 text-center card-post-image img">
												<img src="https://picsum.photos/800/800?random=2" alt="image-post" />
											</div>
											<div className="col-md-9">
												<div className="row tex-muted">
													<div className="col-12 mt-1">
														<span>26 de noviembre</span>
													</div>
												</div>
												<div className="row">
													<div className="col-12">
														<h5>Lorem Ipsum dolor</h5>
													</div>
												</div>
												<div className="row">
													<div className="col-12 text-post-height">
														<p>
															Lorem fistrum pupita al ataquerl me cago en tus muelas
															pupita quietooor caballo blanco caballo negroorl me cago en
															tus muelas no te digo trigo por no llamarte Rodrigor me cago
															en tus muelassssssssssssssssssssssssssss.
														</p>
													</div>
												</div>
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
