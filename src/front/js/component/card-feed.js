// PLANTILLA PARA MOSTRAR UN RESUMEN DE LOS POST DE LAS ENFERMEDADES QUE SIGUES
import React from "react";
import "../../styles/card-feed.scss";

export const CardFeed = () => {
	return (
		<div className="col-4">
			<div className="card" id="card-width">
				<img src="https://picsum.photos/300/200?random=1" className="card-img-top" alt="..." />
				<div className="card-body">
					<p className="card-text">
						Este es el texto del post que cada usuario redactará sobre una o unas enfermedades. Podrá
						incluir enlaces a fuentes externas.
					</p>
				</div>
			</div>
		</div>
	);
};
