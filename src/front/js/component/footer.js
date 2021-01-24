import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.scss";

export const Footer = () => (
	<footer id="styleFooter" className="row d-flex justify-content-center ml-5 py-3">
		<div className="col-9">
			Made with <i className="fa fa-heart text-danger" /> by Alex {"&"} Marta 2021
		</div>
		<div className="col-3">
			<Link to="/about-us">
				<p>About Us</p>
			</Link>
		</div>
	</footer>
);
