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
	<footer className="footer mt-auto py-3">
		<div className="row align-items-center mx-3">
			<div className="col-lg-8">
				<div className="row">
					<div className="col-12">
						<p>
							Made with <i className="fa fa-heart text-danger" /> by Alex {"&"} Marta 2021
							<a href="http://www.4geeksacademy.com"> 4Geeks Academy</a>
						</p>
					</div>
				</div>
			</div>
			<div className="col-lg-4">
				<div className="row align-items-center justify-content-end">
					<div className="col-4">
						<Link className="nav-link" to="/about-us">
							¿Quienes somos?
						</Link>
					</div>
					<div className="col-3">
						<span>Aviso legal</span>
					</div>
					<div className="col-4">
						<span>Politica de privacidad</span>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
