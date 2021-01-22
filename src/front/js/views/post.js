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
		<div className="row" key={index}>
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
			<div className="container" id="post-width">
				<div className="card">
					<div className="card-header">
						<div className="row justify-content-center">
							<Link to={`/onedisease/${store.post.disease_id}`}>
								<h3>{store.post.disease_name}</h3>
							</Link>
						</div>
						<div className="row justify-content-center">
							<h5>{store.post.publisher}</h5>
						</div>
					</div>
					<div className="card-body">
						<p className="card-text">{store.post.text}</p>
					</div>
					<div className="card-footer">
						<div className="row justify-content-center">
							<div className="form-group">
								<label>Comentarios</label>
								<textarea
									value={comment}
									className="form-control"
									rows="3"
									cols="200"
									onChange={event => setComment(event.target.value)}
								/>
								<div className="row justify-content-center mt-3">
									<button type="button" className="btn btn-primary" onClick={HandleClick}>
										Comentar
									</button>
								</div>
								{postComments}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
