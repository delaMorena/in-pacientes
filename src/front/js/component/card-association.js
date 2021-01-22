// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import PropTypes from "prop-types";
import "../../styles/card-association.scss";

export const CardAssociation = props => {
	// recordar insertar props como parametro
	const { association } = props;

	return (
		<div className="card widthListItem mt-4">
			<div className="card-body">
				<h5 className="card-title text-center">{association.name}</h5>
				<h6 className="card-subtitle mb-2 text-muted text-center">{association.location}</h6>
				<p className="card-text text-justify">{association.description}</p>
				<div className="row justify-content-center">
					<button type="button" className="btn btn-primary">
						Ir a la web
					</button>
				</div>
			</div>
		</div>
	);
};

CardAssociation.propTypes = {
	association: PropTypes.object
};
