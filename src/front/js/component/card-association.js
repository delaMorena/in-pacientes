// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import PropTypes from "prop-types";
import "../../styles/card-association.scss";

export const CardAssociation = props => {
	// recordar insertar props como parametro
	const { association } = props;

	return (
		<div className="widthListItem mt-4">
			<div className="card-body">
				<h5 className="card-title text-center py-2 bold">{association.name}</h5>
				<h6 className="card-subtitle pb-4 text-muted text-center">{association.location}</h6>

				<p className="card-text text-justify">{association.description}</p>
				<div className="row pt-5 justify-content-between">
					<div className="col-8">
						<button type="button" className="btn button-web-association-black">
							Sitio web
						</button>
					</div>
					<div className="col-4">
						<button type="button" className="btn button-donation-association-white">
							<span>Haz tu donación </span>
							<i className="fas fa-euro-sign" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

CardAssociation.propTypes = {
	association: PropTypes.object
};
