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

	return (
		<div className="col-5">
			<div className="row diseaselist-box-style my-2 mx-1 p-2">
				<div className="col-12 text-center">
					<h5>{disease.title}</h5>
				</div>
				<div className="col-12">
					<p>{textTruncate(disease.description)}</p>
				</div>
				<div className="col-12">
					<Link to={`/onedisease/${disease.id}`}>
						<button type="button" className="btn post-button-comment">
							+ Info
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

CardDisease.propTypes = {
	disease: PropTypes.object
};
