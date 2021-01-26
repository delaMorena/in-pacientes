import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/list-item.scss";
import { Link } from "react-router-dom";

export const ListItem = props => {
	const { store, actions } = useContext(Context);
	const { id, diseaseName, diseaseDesc } = props;

	// useEffect(() => {
	// 	actions.getPostUser();
	// 	actions.getUser();
	// 	actions.getDiseases();
	// }, []);

	const textTruncate = input => {
		if (input.length >= 150) {
			return input.substring(0, 150) + " ... Leer más.";
		} else {
			return input;
		}
	};

	return (
		<div className="card text-center widthListItem mt-4 bg-light">
			<div className="card-body">
				<h5 className="card-title">{diseaseName}</h5>
				<p className="card-text text-justify">{textTruncate(diseaseDesc)}</p>
				<Link to={`/onedisease/${id}`}>
					<button type="button" className="btn btn-info">
						Informacion de la enfermedad
					</button>
				</Link>
			</div>
		</div>
	);
};
ListItem.propTypes = {
	id: PropTypes.number,
	diseaseName: PropTypes.string,
	diseaseDesc: PropTypes.string
};
