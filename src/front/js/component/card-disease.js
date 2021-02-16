// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/card-disease.scss";

export const CardDisease = props => {
	const { disease } = props;
	const { store, actions } = useContext(Context);

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

	return (
		<div className="col-5">
			<div className="row">
				<div className="col-12">
					<h6>{disease.title}</h6>
				</div>
			</div>
		</div>
	);
};

CardDisease.propTypes = {
	disease: PropTypes.object
};
