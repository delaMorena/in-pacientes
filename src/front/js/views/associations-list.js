import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardAssociation } from "../component/card-association";
import { Link } from "react-router-dom";

export const ListAssociation = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAssociations();
	}, []);

	const cardItem = store.associations.map((association, index) => {
		// console.log(association);
		return <CardAssociation key={index} association={association} />;
	});

	return (
		<div className="container mt-3">
			<div className="row justify-content-center">
				<h1>Lista Asociaciones</h1>
			</div>
			<div className="row justify-content-center">{cardItem}</div>
			<div className="row justify-content-center my-5">
				<Link to="/request/association">
					<button type="button" className="btn btn-info">
						¿Aun no has registrado tu asociación? Solicita su registro ahora!
					</button>
				</Link>
			</div>
		</div>
	);
};
