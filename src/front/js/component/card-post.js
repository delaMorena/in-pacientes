// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/card-post.scss";

export const CardPost = props => {
	const { post } = props;
	const { store, actions } = useContext(Context);
	const [postFiles, setPostFiles] = useState(0);

	// const randomImage = () => {
	// 	const url = "https://picsum.photos/800/800?random=";
	// 	let nunRandom = Math.floor(Math.random() * 10) + 1;
	// 	return url + nunRandom;
	// };

	const textTruncate = input => {
		if (input.length >= 200) {
			return input.substring(0, 200) + " ... Leer más.";
		} else {
			return input;
		}
	};
	const uploadPostImage = event => {
		event.preventDefault();
		actions.uploadProfilePicture(postFiles, store.post.id);
	};
	const showPostImage = () => {
		if (post.image == undefined) {
			return <i className="fas fa-image fa-7x" />;
		} else {
			return <img src={post.image} alt="user-pic" />;
		}
	};

	return (
		<div className="row card-post-inicio mx-1 align-items-center my-3 py-3">
			<div className="col-md-3 text-center card-post-image">{showPostImage()}</div>
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
