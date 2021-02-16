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
			<div className="col-md-3 text-center card-post-image img">
				{showPostImage()}
				{/* <img
					src={post.imagen}
					// src={randomImage()}
					alt="image-post"
				/> */}
				{/* <Link to={`/upload-post/${post.id}`}>
					<i className="fas fa-pencil-alt" />
				</Link> */}
				{/* <div className="row">
					<div className="col-7 offset-1 mt-4">
						<p className="p-edit-profile-font">Edita tu foto</p>
					</div>
					<div className="col-2 mt-4">
						<div
							className="pencil-inicio-clickable"
							// type="button"
							// className="btn btn-primary"
							data-toggle="modal"
							data-target="#exampleModal">
							<i className="fas fa-pencil-alt" />
						</div>
					</div>
					<div
						className="modal fade"
						id="exampleModal"
						tabIndex="-1"
						role="dialog"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title" id="exampleModalLabel">
										Edita tu foto de perfil
									</h5>
									<button type="button" className="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div className="modal-body">
									<div className="jumbotron">
										<form onSubmit={uploadPostImage}>
											<input type="file" onChange={() => setPostFiles(event.target.postfiles)} />
											<button>Actualizar</button>
										</form>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-dismiss="modal">
										Cerrar
									</button>
									<button type="button" className="btn" />
								</div>
							</div>
						</div>
					</div>
				</div> */}
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
