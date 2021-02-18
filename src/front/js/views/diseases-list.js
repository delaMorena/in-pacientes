import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { CardDisease } from "../component/card-disease";
import "../../styles/list-item.scss";

export const ListDiseases = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getDiseases();
	}, []);

	const ShowDiseases = () => {
		const diseaseCard = store.diseases.map((disease, index) => {
			return <CardDisease key={index} disease={disease} />;
		});

		if (store.diseases.length == 0) {
			return (
				<div className="row">
					<div className="col-12">
						<h3>No hay enfermedades creadas</h3>
					</div>
				</div>
			);
		} else {
			return diseaseCard;
		}
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-12 text-center">
					<h1>Lista de enfermedades</h1>
				</div>
				<div className="col-12 my-3">
					<p>
						Aquí puedes encontrar todas las Enfermedades Raras recogidas en In-pcientes.{" "}
						<span className="bold">Puedes comenzar a seguirlas u obtener más información.</span> Si echas en
						falta alguna enfermedad rara a la que poder seguir y empezara a crear red no dudes en
						contárnoslo. Recuerda que{" "}
						<span className="bold">
							se solicita seriedad a la hora de compartir información con respecto a las enfermedades
						</span>
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<hr className="list-divisor-line" />
				</div>
			</div>
			<div className="row justify-content-between mx-1">{ShowDiseases()}</div>
			<div className="row">
				<div className="col-12">
					<hr className="list-divisor-line" />
				</div>
			</div>
			<div className="row">
				<div className="col-12 text-center">
					<p>¿No esta la enfermedad que te interesa? Solicita su creación ahora!</p>
				</div>
				<div className="col-12 text-center my-3">
					<Link to="/request/disease">
						<button type="button" className="btn disease-list-button-request">
							Crear solicitud
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
