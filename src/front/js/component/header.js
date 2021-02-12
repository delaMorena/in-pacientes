import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/header.scss";

export const Header = props => {
	const { store, actions } = useContext(Context);
	const { itemName, qtyPost, profilePicture } = props;

	// useEffect(() => {
	// 	actions.getPostUser();
	// 	actions.getUser();
	// 	actions.getDiseases();
	// }, []);

	return (
		<div className="card my-3 bg-light" id="styleHeader">
			<div className="row no-gutters align-items-center">
				<div className="col-4">
					<img src={profilePicture} className="card-img" alt="avatar" />
				</div>
				<div className="col-8 text-center">
					<div className="card-body">
						<h3 className="card-title">{itemName}</h3>
						<h5 className="card-text">Numero de posts: {qtyPost}</h5>
					</div>
				</div>
			</div>
		</div>
	);
};
Header.propTypes = {
	itemName: PropTypes.string,
	qtyPost: PropTypes.number,
	profilePicture: PropTypes.number
};
