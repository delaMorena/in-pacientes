// MUESTRA INFORMACION SOBRE UN POST, ARRASTRANDO SUS COMENTARIOS Y DANDO LA FUNCIONALIDAD DE CREAR NUEVOS COMENTARIOS.
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { NoToken } from "../component/no-token";

import "../../styles/post.scss";

export const Post = () => {
	const { store, actions } = useContext(Context);
	const [comment, setComment] = useState("");
	const params = useParams();

	useEffect(() => {
		actions.getOnePost(params.id);
	}, []);

	const HandleClick = async event => {
		const payload = {
			comment: comment,
			postId: parseInt(params.id)
		};
		// console.log(payload["postId"]);

		if (payload["comment"] == "") {
			alert("No has introducido texto");
		} else {
			await actions.createComment(payload);
			setComment("");
			actions.getOnePost(params.id);
		}
	};

	const postComments = store.comments.map((comment, index) => (
		// <div key={index}>
		// 	<span>{comment.user}</span>
		// 	<p>{comment.text}</p>
		// </div>
		<div className="text-left" key={index}>
			<div className="card-body">
				<h5 className="card-title">{comment.user}</h5>
				<p className="card-text">{comment.text}</p>
				<p className="card-text">
					<small className="text-muted">{comment.created_at}</small>
				</p>
			</div>
		</div>
	));

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="card">
				<div>
					<h5>{store.post.publisher}</h5>
					<Link to={`/onedisease/${store.post.disease_id}`}>
						<h5>{store.post.disease_name}</h5>
					</Link>
				</div>
				<img src="https://picsum.photos/600/500?random=9" className="card-img-top" alt="..." />
				<div className="card-body">
					<p className="card-text">{store.post.text}</p>
					<div className="form-group">
						<label>Comentarios</label>
						<textarea
							value={comment}
							className="form-control"
							rows="3"
							onChange={event => setComment(event.target.value)}
						/>
						{postComments}
					</div>
					<a href="#" className="btn btn-primary" onClick={HandleClick}>
						Publish your comment
					</a>
				</div>
			</div>
		);
	}
};
