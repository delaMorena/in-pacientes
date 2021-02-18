import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { CardAssociation } from "../component/card-association";
import { Link } from "react-router-dom";
import "../../styles/association.scss";

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
			<div className="row">
				<div className="col-md-7 offset-lg-4 col-10 offset-md-3">
					<h1>Asociaciones de ER</h1>
				</div>
				<div className="col-12">
					<p>
						Esta es la lista de Enfermedades Raras que puedes encontrar en In-pacientes. Puedes ponerte en
						contacto directamente con ellas o a través de su página web.{" "}
						<span className="bold">
							También puedes realizar tu donación a la asociación que te interese.
						</span>{" "}
						Hay muchas asociaciones de enfermedades raras pero si no encuentras la que buscas dínoslo.{" "}
						<span className="bold">
							También te animamos a crear una si no existe la que buscas. Ya sabes, la unión hace la
							fuerza...
						</span>
					</p>
				</div>
			</div>
			<hr className="list-divisor-line" />
			<div className="row justify-content-center mx-1">{cardItem}</div>
			<hr className="list-divisor-line mt-4" />
			<div className="row">
				<div className="col-12 text-center">
					<p>¿Aun no has registrado tu asociación? ¡Solicita su registro ahora!</p>
				</div>
				<div className="col-12 text-center my-3">
					<Link to="/request/association">
						<button type="button" className="btn button-request-association-black">
							Crear solicitud
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
