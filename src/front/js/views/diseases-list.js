import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const ListDiseases = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getDiseases();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Lista Enfermedades</h1>
			{store.diseases.map((value, index) => {
				return (
					<Link key={index} to={`/onedisease/${value.id}`}>
						<p>{value.title}</p>
					</Link>
				);
			})}
		</div>
	);
};
