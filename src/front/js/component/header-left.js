import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/header-left.scss";

export const HeaderLeft = props => {
	const { store, actions } = useContext(Context);
	const { itemName, qtyPost } = props;

	// useEffect(() => {
	// 	actions.getPostUser();
	// 	actions.getUser();
	// 	actions.getDiseases();
	// }, []);

	return (
		<div className="card bg-light" id="styleHeader">
			<div className="row no-gutters align-items-center">
				<div className="col-4">
					<img src="https://source.unsplash.com/random/125x150" className="card-img" alt="avatar" />
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
HeaderLeft.propTypes = {
	itemName: PropTypes.string,
	qtyPost: PropTypes.number
};
