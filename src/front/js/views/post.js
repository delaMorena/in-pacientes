// MUESTRA INFORMACION SOBRE UN POST, ARRASTRANDO SUS COMENTARIOS Y DANDO LA FUNCIONALIDAD DE CREAR NUEVOS COMENTARIOS.
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/post.scss";

export const Post = () => {
	const { store, actions } = useContext(Context);
	const [comment, setComment] = useState("");

	const HandleClick = event => {
		console.log("comment: ", comment);
	};

	return (
		<div className="card">
			<div>
				<h5>User name</h5>
				<h5>Disease</h5>
			</div>
			<img src="https://picsum.photos/600/500?random=9" className="card-img-top" alt="..." />
			<div className="card-body">
				<h5 className="card-title">Card title</h5>
				<p className="card-text">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</p>
				<div className="form-group">
					<label>Comments</label>
					<textarea
						value={comment}
						className="form-control"
						rows="1"
						onChange={event => setComment(event.target.value)}
					/>
				</div>
				<a href="#" className="btn btn-primary" onClick={HandleClick}>
					Publish your comment
				</a>
			</div>
		</div>
	);
};
