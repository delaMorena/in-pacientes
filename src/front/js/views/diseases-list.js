import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { ListItem } from "../component/list-item";

export const ListDiseases = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getDiseases();
	}, []);

	const diseaseList = store.diseases.map((disease, index) => {
		return <ListItem key={index} id={disease.id} diseaseName={disease.title} diseaseDesc={disease.description} />;
	});
	return (
		<div className="container">
			<div className="row justify-content-center">
				<h1>Lista Enfermedades</h1>
			</div>
			<div className="row justify-content-center">
				<ul className="list-group">{diseaseList}</ul>
			</div>
		</div>
	);
};
