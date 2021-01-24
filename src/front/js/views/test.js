import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardFeedCenter } from "../component/card-feed-center.js";
import { HeaderLeft } from "../component/header-left.js";
import { NoToken } from "../component/no-token";
import "../../styles/test.scss";

export const Test = () => {
	const { store, actions } = useContext(Context);
	const [url, setUrl] = useState("");
	const [text, setText] = useState("");
	const [diseaseId, setDiseaseId] = useState();

	useEffect(() => {
		actions.getFeed();
		actions.getPostUser();
		actions.getUser();
		actions.getFollow();
	}, []);

	useEffect(
		() => {
			actions.getFeed();
		},
		[store.userPosts]
	);

	// variables para box-left

	// variables para box-center
	const cardItemsFeed = store.feed.map((post, index) => {
		return (
			// <Link key={index} to={`/post/${post.id}`}>
			// 	<CardFeed post={post} />
			// </Link>
			<div key={index} className="row  justify-content-center my-4">
				<CardFeedCenter post={post} />
			</div>
		);
	});

	// variables para box-right
	const OnSubmit = event => {
		const payload = {
			text: text,
			url: url,
			diseaseId: parseInt(diseaseId)
		};
		actions.createPost(payload);
		actions.getFeed();
		actions.getPostUser();
		setText("");
		setUrl("");
	};

	const diseasesOption = store.follows.map((follow, index) => {
		return (
			<option key={index} value={follow.disease.id}>
				{follow.disease.title}
			</option>
		);
	});

	if (store.token == null) {
		return <NoToken />;
	} else {
		return (
			<div className="fluid-container" id="style-container">
				<div className="row">
					<div className="box-size" id="box-left">
						<div className="row justify-content-center">
							<h3>Tu perfil</h3>
						</div>
						<div className="row justify-content-center my-4">
							<HeaderLeft itemName={store.user.username} qtyPost={store.userPosts.length} />
						</div>
						<div className="row justify-content-center">
							<button type="button" className="btn btn-info">
								Ver mis publicaciones
							</button>
						</div>
					</div>
					<div className="box-size mb-4" id="box-center">
						<div className="row justify-content-center">
							<h3>Publicaciones de tu interes</h3>
						</div>
						{cardItemsFeed}
					</div>
					<div className="box-size" id="box-right">
						<div className="row justify-content-center">
							<h3>Crea una publicación</h3>
						</div>
						<div className="form-container mt-4">
							<form>
								<div className="form-group">
									<select className="form-control" onChange={e => setDiseaseId(e.target.value)}>
										<option defaultValue>Elige una enfermedad</option>
										{diseasesOption}
									</select>
								</div>
								<div className="form-group">
									<textarea
										className="form-control"
										placeholder="Escribe tu publicación..."
										rows="5"
										value={text}
										onChange={event => setText(event.target.value)}
									/>
								</div>
								{/* <div className="form-group">
                                    <label htmlFor="exampleFormControlInput1">URL imagen</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        placeholder="url"
                                        value={url}
                                        onChange={event => setUrl(event.target.value)}
                                    />
                                </div> */}
								<div className="row justify-content-center">
									<button type="button" className="btn btn-info btn-lg" onClick={OnSubmit}>
										Publicar
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
};
