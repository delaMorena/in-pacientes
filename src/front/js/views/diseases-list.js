import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

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
					<p key={index}>
						{value.slug}
						{/* <button onClick={(event) => deleteTask(item.id)} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> */}
					</p>
				);
			})}
		</div>
	);
};
