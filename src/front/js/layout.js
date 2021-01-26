import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Follow } from "./views/follow";
import { CreatePost } from "./views/create-post";
import { Feed } from "./views/feed";
import { Post } from "./views/post";
import { OneDisease } from "./views/one-disease";
import { Profile } from "./views/profile";
import { SignUp } from "./views/sign-up";
import { LogIn } from "./views/log-in";
import { ListDiseases } from "./views/diseases-list";
import { ListAssociation } from "./views/associations-list";
import { Welcome } from "./views/welcome";
import { SolDisease } from "./views/solicitud-enf";
import { SolAssociation } from "./views/solicitud-asc";
import { AboutUs } from "./views/about-us";
import { Bye } from "./views/bye";
import { Inicio } from "./views/inicio";

import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/follow">
							<Follow />
						</Route>
						<Route exact path="/createpost">
							<CreatePost />
						</Route>
						<Route exact path="/feed">
							<Feed />
						</Route>
						<Route exact path="/post/:id">
							<Post />
						</Route>
						<Route exact path="/onedisease/:id">
							<OneDisease />
						</Route>
						<Route exact path="/diseases">
							<ListDiseases />
						</Route>
						<Route exact path="/profile">
							<Profile />
						</Route>
						<Route exact path="/signup">
							<SignUp />
						</Route>
						<Route exact path="/welcome">
							<Welcome />
						</Route>
						<Route exact path="/login">
							<LogIn />
						</Route>
						<Route exact path="/associations">
							<ListAssociation />
						</Route>
						<Route exact path="/request/disease">
							<SolDisease />
						</Route>
						<Route exact path="/request/association">
							<SolAssociation />
						</Route>
						<Route exact path="/bye">
							<Bye />
						</Route>
						<Route exact path="/about-us">
							<AboutUs />
						</Route>
						<Route exact path="/inicio">
							<Inicio />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
