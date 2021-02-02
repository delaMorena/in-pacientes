// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CardPost = props => {
	const { post } = props;

	// const textTruncate = input => {
	// 	if (input.length >= 250) {
	// 		return input.substring(0, 250) + " ... Leer más.";
	// 	} else {
	// 		return input;
	// 	}
	// };

	return (
		<div className="card" id="style-card-feed">
			<div className="card-header">
				<h5 className="row justify-content-center">{post.disease_name}</h5>
				<h5 className="row justify-content-center text-muted">Publicado por: {post.publisher}</h5>
			</div>

			<div className="card-body">
				<div className="row">
					<p className="card-text px-3">{textTruncate(post.text)}</p>
					{/* <p className="card-text px-3">{post.text}</p> */}
				</div>
				<div className="row justify-content-center mt-3">
					<Link to={`/post/${post.id}`}>
						<button type="button" className="btn orange-button">
							Ir a la publicación
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

CardPost.propTypes = {
	post: PropTypes.object
};
