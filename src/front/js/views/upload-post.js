import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import propsTypes from "prop-types";

export const UploadPost = () => {
	const { store, actions } = useContext(Context);
	const [postFiles, setpostFiles] = useState(0);
	const params = useParams();
	const history = useHistory();

	// const uploadPostImage = event => {
	// 	if (postFiles == 0) {
	// 		alert("no has subido ninguna foto");
	// 	}
	// 	event.preventDefault();
	// 	actions.uploadPostPicture(postFiles, params.id);
	// 	history.push("/temp");
	// };

	return (
		<div className="jumbotron">
			<form onSubmit={uploadPostImage}>
				<input type="file" onChange={() => setpostFiles(event.target.files)} />
				<button>Upload Post Files</button>
			</form>
		</div>
	);
};

UploadPost.propsTypes = {
	match: propsTypes.object
};
