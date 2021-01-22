import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardAssociation } from "../component/card-association";

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
		<div className="container">
			<div className="row justify-content-center">
				<h1>Lista Asociaciones</h1>
			</div>
			<div className="row justify-content-center">{cardItem}</div>
		</div>
	);
};
