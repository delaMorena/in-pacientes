import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/list-item.scss";
import { Link } from "react-router-dom";

export const ListItem = props => {
	const { store, actions } = useContext(Context);
	const { id, diseaseName, diseaseDesc, followers } = props;

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
		<div className="col-lg-4 mx-5 col-md-4 col-10 widthListItem">
			<Link to={`/onedisease/${id}`}>
				<div className="card text-center widthListItemDisease mt-4 bg-light">
					<div className="card-body">
						<h5 className="card-title">{diseaseName}</h5>
						<h6 className="card-subtitle mb-2 text-muted">{followers}</h6>
						<p className="card-text text-justify">{textTruncate(diseaseDesc)}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};
ListItem.propTypes = {
	id: PropTypes.number,
	diseaseName: PropTypes.string,
	diseaseDesc: PropTypes.string,
	followers: PropTypes.string
};
