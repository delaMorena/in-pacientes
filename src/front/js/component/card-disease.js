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
		if (input.length >= 175) {
			return input.substring(0, 170) + " ... Leer más.";
		} else {
			return input;
		}
	};

	return (
		<div className="col-5 diseaselist-box-style my-3">
			<div className="row disease-list-title align-items-center">
				<div className="col-12 text-center">
					<h5>{disease.title}</h5>
				</div>
			</div>
			<div className="row mt-2 disease-list-text">
				<div className="col-12">
					<p>{textTruncate(disease.description)}</p>
				</div>
			</div>
			<div className="row mt-2 mb-3">
				<div className="col-12 text-center">
					<Link to={`/onedisease/${disease.id}`}>
						<button type="button" className="btn disease-list-button">
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
