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

	return (
		// <div className="col-4">
		// 	<div id="card-width">
		// 		meter el nombre de la enfermedad y de la persona que escribe el post.
		// 		<img src="https://picsum.photos/300/200?random=1" className="card-img-top" alt="..." />
		// 		<div className="card-body">
		// 			<h5 className="card-title">{post.disease_name}</h5>
		// 			<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
		// 			<p className="card-text">{post.text}</p>
		// 			<a href="#" className="card-link">
		// 				Card link
		// 			</a>
		// 			<a href="#" className="card-link">
		// 				Another link
		// 			</a>
		// 		</div>
		// 	</div>

		<div className="card" id="card-width">
			<img src="https://picsum.photos/300/200?random=1" className="card-img-top" alt="imagen" />
			<div className="card-body">
				<h5 className="card-title">Card title</h5>
				<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
				<p className="card-text">
					Some quick example text to build on the card title and make up the bulk of th
				</p>
			</div>
		</div>
		// </div>
	);
};

CardFeed.propTypes = {
	post: PropTypes.object
};
