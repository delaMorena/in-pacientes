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
		<div className="text-center mt-5">
			<h1>Lista Asociaciones</h1>
			{cardItem}
		</div>
	);
};
