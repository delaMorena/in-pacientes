import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.scss";

export const Footer = () => (
	// <footer id="styleFooter" className="row d-flex justify-content-center ml-5 py-3">
	// 	<div className="col-9">
	// 		Made with <i className="fa fa-heart text-danger" /> by Alex {"&"} Marta 2021
	// 	</div>
	// 	<div className="col-3">
	// 		<Link to="/about-us">
	// 			<p>About Us</p>
	// 		</Link>
	// 	</div>
	// </footer>
	<footer className="footer mt-auto py-3 text-center">
		<div className="row align-items-center mx-3">
			<div className="col-lg-6 text-center">
				<p>
					Made with <i className="fa fa-heart text-danger" /> by Alex {"&"} Marta 2021
					<a href="http://www.4geeksacademy.com"> 4Geeks Academy</a>
				</p>
			</div>
			<div className="col-lg-6 text-center">
				<Link className="nav-link" to="/about-us">
					¿Quienes somos?
				</Link>
			</div>
		</div>
	</footer>
);
