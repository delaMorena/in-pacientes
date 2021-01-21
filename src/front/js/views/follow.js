// CREAR PERFIL DE USUARIO CON LOS DATOS DE NOMBRE, APELLIDO, EDAD, ENFERMEDAD, ROL, ETC...
import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

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

	return (
		<div className="container">
			<div className="text-center mt-5">
				<h1>Escoge una enfermedad y tu relación con ella</h1>
			</div>
			<form>
				<div className="row">
					<div className="form-group col-6">
						<label>Chose at least one disease to follow</label>
						<div className="input-group ">
							<select className="custom-select" onChange={e => setId(e.target.value)}>
								<option defaultValue>Choose...</option>
								{diseasesOption}
							</select>
						</div>
					</div>
					<div className="form-group col-6">
						<label>Select your role</label>
						<div className="input-group">
							<select className="custom-select" onChange={e => setRole(e.target.value)}>
								<option defaultValue>Choose...</option>
								<option value="1">Pacient</option>
								<option value="2">Researcher</option>
								<option value="3">Doctor</option>
								<option value="4">Relative</option>
								<option value="5">Professional</option>
								<option value="6">Association</option>
							</select>
						</div>
					</div>
				</div>
			</form>
			<Link to={`/onedisease/${id}`}>
				<button type="submit" className="btn btn-primary" onClick={OnSubmit}>
					Submit
				</button>
			</Link>
		</div>
	);
};
