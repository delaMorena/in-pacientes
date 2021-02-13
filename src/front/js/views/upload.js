import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import propsTypes from "prop-types";

export const Upload = () => {
	const { store, actions } = useContext(Context);
	const [files, setFiles] = useState(0);
	const params = useParams();
	const history = useHistory();

	const uploadProfileImage = event => {
		if (files == 0) {
			alert("no has subido ninguna foto");
		}
		event.preventDefault();
		actions.uploadProfilePicture(files, params.id);
		history.push("/temp");
	};

	return (
		<div className="jumbotron">
			<form onSubmit={uploadProfileImage}>
				<input type="file" onChange={() => setFiles(event.target.files)} />
				<button>Upload</button>
			</form>
		</div>
	);
};

Upload.propsTypes = {
	match: propsTypes.object
};
