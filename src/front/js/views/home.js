import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.jpg";
import Eskeleton from "../../img/eskeletonok.jpg";
import Medico from "../../img/medico.jpg";
import Paciente from "../../img/paciente.jpg";
import Researcher from "../../img/researcher.jpg";
import "../../styles/home.scss";

import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card card-image">
			<div className="jumbotron text-center bg-white mt-5">
				<img src={Logo} />
				<p>
					Sabemos que padecer una enfermedad rara no es tan raro. También sabemos que puedes sentir una gran
					soledad porque quizá no encuentres a otras personas en tu misma situación en tu entorno más cercano.
					Estamos impacientes porque te unas y entre todas las personas interesadas o que padecejn directa o
					indirectamente una enfermedad rara podamos crear una tribu cada vez mayor.
					<p>Te estamos buscando a tí</p>
				</p>
				<div className="row d-flex justify-content-around mt-5">
					<div className="col-4">
						<Link to="/login">
							<button type="button" className="btn btn-info btn-lg">
								Iniciar Sesión
							</button>
						</Link>
					</div>
					<div className="col-4">
						<Link to="/signup">
							<button type="button" className="btn btn-info btn-lg">
								Registrarme
							</button>
						</Link>
					</div>
				</div>
			</div>
			{/* <div className="home-container container">
				<h4>IN-PACIENTES es para tí si:</h4>
				<div className="row ml-5 my-5">
					<div className="col-4">
						<img src={Eskeleton} className="home-image" />
					</div>
					<div className="col-8">
						<h4>y te interesan las enfermedades raras y buscas una comunidad. Aquí podrás encontrar
						personas que necesitan tus servicios, tu apoyo o tu conocimiento</h4>
					</div>
				</div>
			</div> */}
			<div className="fluid-container" id="style-container">
				<div className="row justify-content-center">
					<h3>IN-PACIENTES es para tí:</h3>
				</div>
				<div className="row mt-4 justify-content-center">
					<div className="home-container col-3">
						<img src={Eskeleton} alt="Marta" className="home-image" />
						<div className="overlay">
							<div className="home-text">
								<h4>si eres Profesional Sanitario</h4>
								<span>
									y te interesan las enfermedades raras y buscas una comunidad. Aquí podrás encontrar
									personas que necesitan tus servicios, tu apoyo o tu conocimiento
								</span>
								<p>
									Photo by{" "}
									<a href="https://unsplash.com/@owenbeard?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										Owen Beard
									</a>{" "}
									on{" "}
									<a href="https://unsplash.com/s/photos/doctor?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										Unsplash
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className="home-container col-3">
						<img src={Medico} alt="Marta" className="home-image" />
						<div className="overlay">
							<div className="home-text">
								<h4>si eres Doctor/a o enfermero/a</h4>
								<span>
									especialista en enfermedades raras o buscando información actualizada para poder
									atender a tus pacientes de la mejor manera
								</span>
								<p>
									Photo by{" "}
									<a href="https://unsplash.com/@bill_oxford?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										Bill Oxford
									</a>{" "}
									on{" "}
									<a href="https://unsplash.com/s/photos/doctor?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										Unsplash
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className="home-container col-3">
						<img src={Paciente} alt="Marta" className="home-image" />
						<div className="overlay">
							<div className="home-text">
								<h4>si eres Paciente</h4>
								<span>
									y te acabas de enterar que sufres una enfermedad rara, estás en estado de shock y no
									sabes por donde empezar. O hace ya años lo sabes pero quieres una red social propia
									para hablar sin tapujos y compartir información
								</span>
								<p>
									Photo by{" "}
									<a href="https://unsplash.com/@bill_oxford?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										Bill Oxford
									</a>{" "}
									on{" "}
									<a href="https://unsplash.com/s/photos/doctor?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										Unsplash
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className="home-container col-3">
						<img src={Researcher} alt="Marta" className="home-image" />
						<div className="overlay">
							<div className="home-text">
								<h4>si Investigas enfermedades raras</h4>
								<span>
									y quieres recabar datos a los pacientes de estas enfermedades o quieres hacer un
									seguimiento de tus pacientes
								</span>
								<p>
									Photo by{" "}
									<a href="https://unsplash.com/@cdc?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										CDC
									</a>{" "}
									on{" "}
									<a href="https://unsplash.com/s/photos/doctor?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
										Unsplash
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
