import React from "react";
import "../../styles/header.scss";

export const Header = () => {
	return (
		<div className="jumbotron">
			<div className="card mb-3" id="card-header">
				<div className="row no-gutters">
					<div className="col-md-4">
						<img
							src="https://picsum.photos/500/500?random=3"
							className="card-img rounded-circle"
							alt="..."
						/>
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">Name</h5>
							<p className="card-text">número de posts</p>
							<p>número de seguidores</p>
							<p className="card-text">
								<small className="text-muted">Last updated 3 mins ago</small>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
