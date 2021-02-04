import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import propsTypes from "prop-types";

export const Upload = () => {
	const { store, actions } = useContext(Context);
	const [files, setFiles] = useState(null);
	const uploadImage = event => {
		event.preventDefault();
		console.log("uploading files", files);

		actions.uploadProfilePicture(files);
	};

	return (
		<div className="jumbotron">
			<form onSubmit={uploadImage}>
				<input type="file" onChange={() => setFiles(event.target.files)} />
				<button>Upload</button>
			</form>
		</div>
	);
};

Upload.propsTypes = {
	match: propsTypes.object
};
