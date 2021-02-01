import React from "react";
import Marta from "../../img/marta.jpg";
import Alex from "../../img/alex.jpg";

import "../../styles/about-us.scss";

export const AboutUs = () => {
	return (
		<div className="container">
			<h1 className="style-h1-about-us">Nosotros somos:</h1>
			<div className="row mt-5">
				<div className="profile-container col-10 col-lg-6 col-sm-10">
					<img src={Alex} alt="Marta" className="about-us-image" />
				</div>
				<div className="col-10 col-lg-6 col-sm-10 d-flex flex-wrap align-content-center">
					<div className="about-us-text">
						<h3>Alex Redondo</h3>
						<span>Jerezano hasta la médula. Luchador y positivo en las duras y las maduras</span>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="profile-container col-10 col-lg-6 col-sm-10 ">
					<img src={Marta} alt="Marta" className="about-us-image" />
				</div>
				<div className="col-10 col-lg-6 col-sm-10 d-flex flex-wrap align-content-center">
					<div className="about-us-text">
						<h3>Marta de la Morena</h3>
						<span>Madrileña recién mudada a las montañas pirenaicas. Curiosa, enamorada de la vida.</span>
					</div>
				</div>
			</div>
		</div>
	);
};
