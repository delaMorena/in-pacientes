import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import propsTypes from "prop-types";

export const UploadPost = () => {
	const { store, actions } = useContext(Context);
	const [files, setFiles] = useState(null);
	const [postFiles, setpostFiles] = useState(0);
	const params = useParams();

	const uploadProfileImage = event => {
		event.preventDefault();
		actions.uploadProfilePicture(files, params.id);
	};
	const uploadPostImage = event => {
		event.preventDefault();
		actions.uploadProfilePicture(postFiles);
	};

	return (
		<div className="jumbotron">
			<form onSubmit={uploadProfileImage}>
				<input type="file" onChange={() => setFiles(event.target.files)} />
				<button>Upload</button>
			</form>
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
