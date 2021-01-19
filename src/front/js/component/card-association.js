// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import "../../styles/card-association.scss";
import PropTypes from "prop-types";

export const CardAssociation = props => {
	// recordar insertar props como parametro
	const { association } = props;

	return (
		<div className="container">
			<div className="card" id="card-assoc">
				<div className="card-body">
					<h5 className="card-title">{association.name}</h5>
					<h6 className="card-subtitle mb-2 text-muted">{association.location}</h6>
					<p className="card-text">
						Some quick example text to build on the card title and make up the bulk of the card
						{"'"}s content.
					</p>
					<a href="#" className="card-link">
						Card link
					</a>
					<a href="#" className="card-link">
						Another link
					</a>
				</div>
			</div>
		</div>
	);
};

CardAssociation.propTypes = {
	association: PropTypes.object
};
