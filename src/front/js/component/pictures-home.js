import React from "react";
import PropTypes from "prop-types";
import "../../styles/home.scss";

export const PicturesHome = props => {
	// const { association } = props;

	return (
		<div className="home-container col-md-3 col-lg-3 col-7">
			<img src={props.img} alt={props.alt} className="home-image" />
			<div className="overlay">
				<div className="home-text">
					<h4>{props.role}</h4>
					<span>{props.text}</span>
					<p className="unsplash">
						Photo by <a href={props.credits}>{props.photographer}</a> on Unsplash
						{/* <a href="https://unsplash.com/s/photos/hospital?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
							
						</a> */}
					</p>
				</div>
			</div>
		</div>
	);
};

PicturesHome.propTypes = {
	img: PropTypes.string,
	alt: PropTypes.string,
	role: PropTypes.string,
	text: PropTypes.string,
	credits: PropTypes.string,
	photographer: PropTypes.string
};
