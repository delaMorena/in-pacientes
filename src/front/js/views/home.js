import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Logo from "../../img/logo.jpg";
import Eskeleton from "../../img/eskeletonok.jpg";
import Medico from "../../img/medico.jpg";
import Paciente from "../../img/paciente.jpg";
import Researcher from "../../img/researcher.jpg";
import Asociacion from "../../img/asociacion.jpg";
import Familiar2 from "../../img/familiar2.jpg";
import "../../styles/home.scss";

import { PicturesHome } from "../component/pictures-home.js";

import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div className="row style-row-logo-buttons d-flex justify-content-between">
				<div className="col-lg-9 col-12 ">
					<img className="style-logo-home" src={Logo} />
					{/* <p className="style-text text-left">
						Sabemos que padecer una ENFERMEDAD RARA <span className="bold">no es tan raro</span>. Si tienes
						una ER o te interesa por cualquier otro motivo, <span className="bold">esta es tu tribu. </span>
					</p>
					<p className="bold style-text text-left">Te estamos buscando a tí</p> */}
				</div>
				<div className="col-lg-3 col-10 d-flex flex-column style-home-col-buttons">
					<Link to="/login">
						<button type="button" className="btn login-button-style">
							Entrar
						</button>
					</Link>
					<Link to="/signup">
						<button type="button" className="btn register-button-style-home">
							Registrarme
						</button>
					</Link>
				</div>
			</div>

			<h3 className="style-h3-home">IN-PACIENTES es para tí si eres:</h3>

			<div className="row mt-4 justify-content-center style-row-pictures-home">
				<PicturesHome
					img={Paciente}
					role="Paciente"
					alt="Paciente"
					text="y te acabas de enterar de que sufres una ER, estás en estado de shock y no sabes por
                        donde empezar. O hace ya años que lo sabes pero buscas una red social propia para hablar sin tapujos y compartir información"
					credits="https://unsplash.com/@kellysikkema?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
					photographer="Kelly Sikkema"
				/>
				<PicturesHome
					img={Familiar2}
					alt="Familiar"
					role="Familiar"
					text="y os han dado la noticia hace poco, o lleváis años buscando un espacio de seguridad donde poder comunicarte con otras personas en tu misma situación"
					credits="https://unsplash.com/@mohammadalijf?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
					photographer="Mohammad Ali Jafarian"
				/>
				<PicturesHome
					img={Medico}
					role="Médico"
					alt="Medico"
					text="especialista en ER o tienes algún paciente y buscas información actualizada y soporte"
					credits="https://unsplash.com/@bill_oxford?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
					photographer="Bill Oxford"
				/>
				<PicturesHome
					img={Researcher}
					role="Investigador"
					alt="Investigador"
					text="y trabajas con alguna ER y quieres recabar datos a los pacientes de estas enfermedades o quieres hacer un seguimiento de tus pacientes"
					credits="https://unsplash.com/@drew_hays?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
					photographer="Drew Hays"
				/>
				<PicturesHome
					img={Eskeleton}
					alt="terapeuta"
					role="Terapeuta"
					text="o cualquier profesion especializada en ER, desde ortopedia hasta psicogía"
					credits="https://unsplash.com/@owenbeard?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
					photographer="Owen Beard"
				/>
				<PicturesHome
					img={Asociacion}
					alt="Asociación"
					role="Asociación"
					text="Os dedicáis a la divulgación, investigación y recuadación de fondos para el estudio de ERs"
					credits="https://unsplash.com/@youxventures?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
					photographer="You X Ventures"
				/>
			</div>
			{/* <div className="row mt-4 ml-5 justify-content-center">
					<PicturesHome
						img={Researcher}
						role="Investigador"
						alt="Investigador"
						text="y trabajas con alguna ER y quieres recabar datos a los pacientes de estas enfermedades o quieres hacer un seguimiento de tus pacientes"
						credits="https://unsplash.com/@drew_hays?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
						photographer="Drew Hays"
					/>
					<PicturesHome
						img={Eskeleton}
						alt="terapeuta"
						role="Terapeuta"
						text="o cualquier profesion especializada en ER, desde ortopedia hasta psicogía"
						credits="https://unsplash.com/@owenbeard?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
						photographer="Owen Beard"
					/>
					<PicturesHome
						img={Asociacion}
						alt="Asociación"
						role="Asociación"
						text="Os dedicáis a la divulgación, investigación y recuadación de fondos para el estudio de ERs"
						credits="https://unsplash.com/@youxventures?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
						photographer="You X Ventures"
					/>
				</div> */}
		</div>
	);
};
