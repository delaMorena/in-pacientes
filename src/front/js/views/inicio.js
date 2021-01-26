import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardFeedCenter } from "../component/card-feed-center.js";
import { HeaderLeft } from "../component/header-left.js";
import { NoToken } from "../component/no-token";
import "../../styles/test.scss";

export const Inicio = () => {
	const { store, actions } = useContext(Context);
	const [url, setUrl] = useState("");
	const [text, setText] = useState("");
	const [diseaseId, setDiseaseId] = useState();

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

	// variables para box-left

	const listFollow = () => {
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

		const mapFollows = store.follows.map((follow, index) => {
			return (
				<li key={index} className="list-group-item bg-light">
					{" "}
					<div className="row">
						<div className="col-8 text-center d-flex align-items-center justify-content-center">
							<Link to={`/onedisease/${follow.disease.id}`}>
								<button type="button" className="btn btn-outline-info">
									{follow.disease.title}
								</button>
							</Link>
						</div>
						<div className="col-4 text-center d-flex align-items-center justify-content-center">
							<span>{convRol(follow.role)}</span>
						</div>
					</div>
				</li>
			);
		});

		if (store.follows.length == 0) {
			return (
				<>
					{/* <div className="row px-5">
						<p>Aún no sigues ninguna enfermedad y no puedes ver las publicaciones</p>
					</div>
					<div className="row justify-content-center">
						<Link to="/follow">
							<button type="button" className="btn orange-button">
								Busca la enfermedad que te interese
							</button>
						</Link>
					</div> */}
				</>
			);
		} else {
			return (
				<>
					<div className="row justify-content-center">
						<Link to="/profile">
							<button type="button" className="btn mb-3 orange-button">
								Ver mis publicaciones
							</button>
						</Link>
					</div>
					<ul className="list-group" id="list-width">
						<div className="row justify-content-center">
							<h6> Enfermedades seguidas</h6>
						</div>
						<li className="list-group-item">
							<div className="row justify-content-center">
								<div className="col-8 text-center">
									<span>Enfermedad</span>
								</div>
								<div className="col-4 text-center">
									<span>Rol</span>
								</div>
							</div>
						</li>
						{mapFollows}
					</ul>
					<div className="row justify-content-center mt-3">
						<Link to="/follow">
							<button type="button" className="btn mb-3 orange-button">
								Seguir una nueva enfermedad
							</button>
						</Link>
					</div>
				</>
			);
		}
	};

	// variables para box-center

	let contentBoxCenter = "";
	if (store.feed.length == 0) {
		contentBoxCenter = (
			<div className="card p-3 text-center mt-2">
				<p>Aún no sigues ninguna enfermedad y no puedes ver las publicaciones</p>
				<div className="row my-3 justify-content-center">
					<Link to="/follow">
						<button type="button" className="btn orange-button">
							Busca la enfermedad que te interese
						</button>
					</Link>
				</div>
			</div>
		);
	} else {
		contentBoxCenter = store.feed.map((post, index) => {
			return (
				<div className="row justify-content-center my-2" key={index}>
					<CardFeedCenter post={post} />
				</div>
			);
		});
	}

	// variables para box-right
	const OnSubmit = event => {
		const payload = {
			text: text,
			url: url,
			diseaseId: parseInt(diseaseId)
		};
		actions.createPost(payload);
		actions.getFeed();
		actions.getPostUser();
		setText("");
		setUrl("");
	};

	const diseasesOption = store.follows.map((follow, index) => {
		return (
			<option key={index} value={follow.disease.id}>
				{follow.disease.title}
			</option>
		);
	});

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="fluid-container mt-3" id="style-container">
				<div className="row justify-content-center">
					<h1>Inicio</h1>
				</div>
				<div className="row">
					<div className="box-size" id="box-left">
						<div className="row justify-content-center">
							<h3>Tu perfil</h3>
						</div>
						<div className="row justify-content-center my-4">
							<HeaderLeft itemName={store.user.username} qtyPost={store.userPosts.length} />
						</div>

						<div className="row justify-content-center">{listFollow()}</div>
					</div>
					<div className="box-size mb-4" id="box-center">
						<div className="row justify-content-center">
							<h3>Publicaciones de tu interés</h3>
						</div>
						<div className="row justify-content-center mt-3">{contentBoxCenter}</div>
					</div>
					<div className="box-size" id="box-right">
						<div className="row justify-content-center">
							<h3>Crea una publicación</h3>
						</div>
						<div className="form-container mt-4">
							<form>
								<div className="form-group">
									<select className="form-control" onChange={e => setDiseaseId(e.target.value)}>
										<option defaultValue>Elige una enfermedad</option>
										{diseasesOption}
									</select>
								</div>
								<div className="form-group">
									<textarea
										className="form-control"
										placeholder="Escribe tu publicación..."
										rows="5"
										value={text}
										onChange={event => setText(event.target.value)}
									/>
								</div>
								{/* <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">URL imagen</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        placeholder="url"
                                        value={url}
                                        onChange={event => setUrl(event.target.value)}
                                    />
                                </div> */}
								<div className="row justify-content-center">
									<button type="button" className="btn orange-button" onClick={OnSubmit}>
										Publicar
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
