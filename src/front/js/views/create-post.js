// CREAR UN NUEVO POST
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const CreatePost = () => {
	const { store, actions } = useContext(Context);
	const [url, setUrl] = useState("");
	const [text, setText] = useState("");

	useEffect(() => {
		actions.getFollow();
	}, []);

	const OnSubmit = event => {
		console.log("Post: ", text);
		console.log("Enlace: ", url);
	};

	const diseasesOption = store.follows.map((follow, index) => {
		// console.log(follow.disease.title);
		return (
			<option key={index} value={follow.disease.id}>
				{follow.disease.title}
			</option>
		);
	});
	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Escribe tu post</h1>
			</div>
			<form>
				<div className="form-group">
					<label htmlFor="exampleFormControlSelect1">Enfermedad</label>
					<select className="form-control" onChange={e => console.log(e.target.value)}>
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
};
