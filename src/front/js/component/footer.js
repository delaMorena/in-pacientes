import React, { Component } from "react";
import "../../styles/footer.scss";

export const Footer = () => (
	<footer className="footer row">
		<div className="col-7 left-footer">
			<p>
				Made with <i className="fa fa-heart text-danger" /> by Alex {"&"} Marta 2021
			</p>
		</div>
		<div className="col-5 right-footer">
			<p>Aviso Legal-Política de Privacidad-Política de Cookies</p>
		</div>
	</footer>
);
