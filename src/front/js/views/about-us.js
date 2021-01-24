import React from "react";
import Marta from "../../img/marta.jpg";
import Alex from "../../img/alex.jpg";

import "../../styles/about-us.scss";

export const AboutUs = () => {
	return (
		<div className="container">
			<div className="row mt-5">
				<div className="profile-container col-6">
					<img src={Alex} alt="Marta" className="about-us-image" />
					<div className="overlay">
						<div className="about-us-text">
							<h3>Alex Redondo</h3>
							<span>Jerezano hasta la médula. Luchador y positivo en las duras y las maduras</span>
						</div>
					</div>
				</div>
				<div className="profile-container col-6">
					<img src={Marta} alt="Marta" className="about-us-image" />
					<div className="overlay">
						<div className="about-us-text">
							<h3>Marta de la Morena</h3>
							<span>Madrileña recién mudada a las montañas pirenaicas. Inquieta y curiosa.</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
