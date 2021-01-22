import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import "../../styles/header.scss";

export const Header = props => {
	const { store, actions } = useContext(Context);
	const { itemName, qtyPost } = props;

	useEffect(() => {
		actions.getPostUser();
		actions.getUser();
		actions.getDiseases();
	}, []);

	return (
		<div className="card mb-3" id="styleHeader">
			<div className="row no-gutters">
				<div className="col-4">
					<img src="https://source.unsplash.com/random/175x200" className="card-img" alt="avatar" />
				</div>
				<div className="col-8">
					<div className="card-body">
						<h5 className="card-title">{itemName}</h5>
						<p className="card-text">Numero de posts: {qtyPost}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
Header.propTypes = {
	itemName: PropTypes.string,
	qtyPost: PropTypes.number
};
