// CREAR UN NUEVO POST
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CreatePost = () => {
	const { store, actions } = useContext(Context);
	const [url, setUrl] = useState("");
	const [text, setText] = useState("");
	const [diseaseId, setDiseaseId] = useState();

	useEffect(() => {
		// console.log("store.diseases: ", store.diseases, store.user);
		actions.getFollow();
	}, []);

	const OnSubmit = event => {
		const payload = {
			text: text,
			url: url,
			diseaseId: parseInt(diseaseId)
		};
		actions.createPost(payload);
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
		return (
			<div className="container">
				<div className="row justify-content-center">
					<h1>Es necesario iniciar sesion para acceder a esta pagina</h1>
				</div>
				<div className="row justify-content-center">
					<Link to="/login">
						<button type="button" className="btn btn-primary">
							Iniciar Sesión
						</button>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container">
				<div className="text-center mt-5">
					<h1>Escribe tu post</h1>
				</div>
				<form>
					<div className="form-group">
						<label htmlFor="exampleFormControlSelect1">Enfermedad</label>
						<select className="form-control" onChange={e => setDiseaseId(e.target.value)}>
							<option defaultValue>Choose...</option>
							{diseasesOption}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor={text}>Post</label>
						<textarea
							className="form-control"
							rows="5"
							value={text}
							onChange={event => setText(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleFormControlInput1">URL imagen</label>
						<input
							type="url"
							className="form-control"
							placeholder="url"
							value={url}
							onChange={event => setUrl(event.target.value)}
						/>
					</div>
					<button type="button" className="btn btn-primary" onClick={OnSubmit}>
						Submit
					</button>
				</form>
			</div>
		);
	}
};
