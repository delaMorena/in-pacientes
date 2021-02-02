// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const CardPost = props => {
	const { post } = props;

	const textTruncate = input => {
		if (input.length >= 200) {
			return input.substring(0, 200) + " ... Leer más.";
		} else {
			return input;
		}
	};

	return (
		<div className="row card-post-inicio mx-1 align-items-center mb-3 py-3">
			<div className="col-md-3 text-center card-post-image img">
				<img src="https://picsum.photos/800/800?random=2" alt="image-post" />
			</div>
			<div className="col-md-9">
				<div className="row tex-muted">
					<div className="col-12 mt-1">
						<span>{post.created_at}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h5>{post.disease_name}</h5>
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-post-height">
						<p>{textTruncate(post.text)}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

CardPost.propTypes = {
	post: PropTypes.object
};
