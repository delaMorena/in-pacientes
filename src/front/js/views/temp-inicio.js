import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardFeedCenter } from "../component/card-feed-center.js";
import { HeaderLeft } from "../component/header-left.js";
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

	return (
		<div className="container">
			<div className="row">
				<div className="col-xl-4">
					<div className="row mx-1 box-user-inicio mt-4">
						<div className="col-12">
							<div className="row align-items-center mt-3">
								<div className="col-6 box-user-image text-right">
									<img src="https://picsum.photos/800/800?random=1" alt="user-pic" />
								</div>
								<div className="col-6 box-user-image text-left">
									<h5>username</h5>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row my-3">
								<div className="col-12 text-center">
									<h6>Lista de seguimiento</h6>
								</div>
								<div className="col-12 text-center">
									<div className="row">
										<div className="col-8">
											<span>Enfermedad</span>
											<p>Catarro</p>
										</div>
										<div className="col-4">
											<span>Rol</span>
											<p>paciente</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xl-8">
					<div className="row mx-1">
						<div className="col-12">
							<div className="row box-post-inicio my-4">
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
										<button type="button">Publicar</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<div className="row box-content-inicio">
								<div className="col-12">
									<div className="row py-3">
										<div className="col-6 text-center">
											<button type="button">Publicaciones de mi interes</button>
										</div>
										<div className="col-6 text-center">
											<button type="button">Mis publicaciones</button>
										</div>
									</div>
								</div>
								<div className="col-12">
									<div className="row card-post-inicio mx-1 align-items-center mb-3 py-3">
										<div className="col-3 card-post-image img">
											<img src="https://picsum.photos/800/800?random=2" alt="image-post" />
										</div>
										<div className="col-9 ">
											<p>texto</p>
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
};
