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
			<div className="row justify-content-center d-flex flex-column">
				<div className="col-md-7 offset-lg-4 col-10 offset-md-3">
					<h1>Asociaciones de ER</h1>
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
			<div className="row justify-content-center">{cardItem}</div>
			<hr />
			<div className="row justify-content-center my-5">
				<Link to="/request/association">
					<button type="button" className="btn">
						¿Aun no has registrado tu asociación? Solicita su registro ahora!
					</button>
				</Link>
			</div>
		</div>
	);
};
