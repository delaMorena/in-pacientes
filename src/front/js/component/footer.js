import React, { Component } from "react";
import "../../styles/footer.scss";

export const Footer = () => (
	<footer className="footer row">
		<div className="col-4">
			Made with <i className="fa fa-heart text-danger" /> by Alex {"&"} Marta 2021
		</div>
		<div className="col-8">Aviso Legal-Política de Privacidad-Política de Cookies</div>
	</footer>
);
