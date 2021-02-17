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
				<div className="col-12">
					<p>
						Lorem fistrum se calle ustée a wan ese pedazo de la caidita ese que llega a gramenawer. Ese
						hombree llevame al sircoo diodeno condemor a gramenawer tiene musho peligro amatomaa. Ese que
						llega papaar papaar ese que llega al ataquerl amatomaa pecador por la gloria de mi madre tiene
						musho peligro jarl pupita. Va usté muy cargadoo está la cosa muy malar diodeno mamaar. Se calle
						ustée benemeritaar no te digo trigo por no llamarte Rodrigor no puedor qué dise usteer pupita te
						voy a borrar el cerito está la cosa muy malar pecador qué dise usteer por la gloria de mi madre.
						Amatomaa a peich se calle ustée ese pedazo de. Se calle ustée de la pradera qué dise usteer de
						la pradera a gramenawer a wan.
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
