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
				<div className="col-12">
					<h1>Lista de enfermedades</h1>
				</div>
				<div className="col-12">
					<p>texto</p>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<hr className="list-divisor-line" />
				</div>
			</div>
			<div className="row justify-content-between">{ShowDiseases()}</div>
			<div className="row">
				<div className="col-12">
					<hr className="list-divisor-line" />
				</div>
			</div>
			<div className="row">
				<div className="col-12 text-center">
					<p>¿No esta la enfermedad que te interesa? Solicita su creación ahora!</p>
				</div>
				<div className="col-12 text-center mt-2">
					<Link to="/request/disease">
						<button type="button" className="btn btn-primary">
							Crear solicitud
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
