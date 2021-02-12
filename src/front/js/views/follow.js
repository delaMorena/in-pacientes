// CREAR PERFIL DE USUARIO CON LOS DATOS DE NOMBRE, APELLIDO, EDAD, ENFERMEDAD, ROL, ETC...
import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { NoToken } from "../component/no-token";
import "../../styles/follow.scss";

export const Follow = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [id, setId] = useState("");
	const [role, setRole] = useState("");

	useEffect(() => {
		actions.getDiseases();
	}, []);

	const diseasesOption = store.diseases.map((disease, index) => {
		return (
			<option key={index} value={disease.id}>
				{disease.title}
			</option>
		);
	});

	const OnSubmit = e => {
		const payload = {
			role: role,
			diseaseId: parseInt(id)
		};

		actions.createRole(payload);
		// console.log("id de enfermedad seleccionada", id);
		// console.log(payload);
	};

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="container">
				<div className="text-center mt-5">
					<h1>Escoge una enfermedad y tu relación con ella</h1>
				</div>
				<form className="style-form-follow ">
					<label className="style-label-follow">Elige la enfermedad que quieres empezar a seguir</label>
					<div className="input-group ">
						<select className="custom-select" onChange={e => setId(e.target.value)}>
							<option defaultValue>Elige ...</option>
							{diseasesOption}
						</select>
					</div>
					<label className="style-label-follow">¿Cuál es tu relación con esta enfermedad?</label>
					<div className="input-group">
						<select className="custom-select" onChange={e => setRole(e.target.value)}>
							<option value="1">Paciente</option>
							<option value="2">Investigador</option>
							<option value="3">Doctor</option>
							<option value="4">Familiar</option>
							<option value="5">Profesional</option>
							<option value="6">Asociación</option>
						</select>
					</div>
					<Link to={`/onedisease/${id}`}>
						<button type="submit" className="style-button-follow" onClick={OnSubmit}>
							Comenzar a seguir
						</button>
					</Link>
				</form>
			</div>
		);
	}
};
