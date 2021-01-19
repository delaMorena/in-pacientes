// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import "../../styles/card-feed.scss";
import PropTypes from "prop-types";

export const CardFeed = props => {
	const { post } = props;

	const commentList = post.comments.map((
		comment,
		index // los parentesis hacen la funcion del return
	) => (
		<div key={index}>
			<span>{comment.user}</span>
			{comment.text}
		</div>
	));

	return (
		<div className="col-4">
			<div id="card-width">
				<img src="https://picsum.photos/300/200?random=1" className="card-img-top" alt="..." />
				<div className="card-body">
					<p className="card-text">{post.text}</p>
				</div>
				<div className="card-footer">{commentList}</div>
			</div>
		</div>
	);
};

CardFeed.propTypes = {
	post: PropTypes.object
};
