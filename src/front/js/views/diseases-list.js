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
			<div className="row justify-content-center d-flex flex-column">
				<div className="col-md-7 offset-lg-4 col-10 offset-md-3">
					<h1>Lista Enfermedades</h1>
				</div>
				<div className="col-12 col-lg-9 col-md-6 offset-lg-2 mt-3">
					<p>
						Esta es la lista de enfermedades Raras que puedes encontrar en In-pacientes. Icing pie gummies
						cotton candy marshmallow carrot cake lemon drops lemon drops. I love soufflé sweet roll sugar
						plum tart lollipop. Chocolate bar dragée candy canes wafer cake sweet roll tiramisu liquorice
						macaroon. Dessert topping biscuit croissant icing donut sweet roll pastry.
					</p>
				</div>
			</div>
			<hr />

			<div className="row d-flex flex-wrap align-content-start">{diseaseList}</div>
			<hr />
			<div className="justify-content-center my-5">
				<p>¿No esta la enfermedad que te interesa? Solicita su creación ahora!</p>
				<Link to="/request/disease">
					<button type="button" className="btn">
						Crear solicitud
					</button>
				</Link>
			</div>
		</div>
	);
};
