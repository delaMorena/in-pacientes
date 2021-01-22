// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import "../../styles/card-feed.scss";
import PropTypes from "prop-types";

export const CardFeed = props => {
	const { post } = props;

	// const commentList = post.comments.map((
	// 	comment,
	// 	index // los parentesis hacen la funcion del return
	// ) => (
	// 	<div key={index}>
	// 		<span>{comment.user}</span>
	// 		{comment.text}
	// 	</div>
	// ));

	const textTruncate = input => {
		if (input.length >= 250) {
			return input.substring(0, 250) + " ... Leer más.";
		} else {
			return input;
		}
	};

	return (
		<div className="card" id="styleCardFeed">
			<div className="card-body">
				<h5 className="card-title text-center">{post.disease_name}</h5>
				<h6 className="card-subtitle mb-2 text-muted text-center">{post.publisher}</h6>
				<p className="card-text text-justify">{textTruncate(post.text)}</p>
			</div>
		</div>
	);
};

CardFeed.propTypes = {
	post: PropTypes.object
};
