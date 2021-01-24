const baseUrl = "https://3001-a8806df8-2b01-4aa3-848e-fa195c235ee0.ws-eu03.gitpod.io/api";

const getState = ({ getStore, getActions, setStore }) => {
	const token = localStorage.getItem("token");
	return {
		store: {
			token: token,
			user: {},
			diseases: [],
			oneDisease: {},
			associations: [],
			userPosts: [],
			diseasePost: [],
			follows: [],
			post: {},
			comments: [],
			feed: []
		},
		actions: {
			logout() {
				localStorage.removeItem("token");
				setStore({ token: null });
			},
			createUser: (input, callback) => {
				const endpoint = `${baseUrl}/users`;
				const method = "POST";
				const config = {
					method: method,
					// mode: "no-cors",
					headers: {
						"Content-Type": "application/json"
						// "Access-Control-Allow-Origin": "*"
					},
					body: JSON.stringify({
						email: input.email,
						password: input.password,
						first_name: input.firstName,
						last_name: input.lastName,
						username: input.userName,
						avatar: input.avatar
					})
				};
				fetch(endpoint, config).then(response => {
					// console.log(response);
					callback();
				});
			},

			userLogin: async input => {
				const actions = getActions();
				const endpoint = `${baseUrl}/login`;
				const method = "POST";
				const config = {
					method: method,
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(input)
				};
				await fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						localStorage.setItem("token", data.token);
						setStore({ token: data.token });
						// console.log(store.token);
					})
					.catch(error => console.error("error: ", error)); // imprime el tipo error que se ha producido
			},
			async getUser() {
				const store = getStore();
				// console.log("token: ", store.token);
				const endpoint = `${baseUrl}/test`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers
				};
				await fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data)
						setStore({ user: data });
						console.log("contacto", store.user);
						// console.log(store.token);
					});
			},

			editUser(input) {
				const store = getStore();
				const endpoint = `${baseUrl}/users`;
				const method = "PUT";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers,
					body: JSON.stringify({
						first_name: input.firstName,
						last_name: input.lastName,
						username: input.userName,
						avatar: input.avatar
					})
				};
				fetch(endpoint, config)
					// .then(response => response.json())
					// .then(data => {
					// 	console.log(data);
					// })
					.catch(error => console.error("error: ", error));
			},
			getOneDisease(id) {
				const store = getStore();
				const endpoint = `${baseUrl}/diseases/${id}`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data)
						setStore({ oneDisease: data });
						console.log("info enfermedad", store.oneDisease);
						// console.log(store.token);
					});
			},
			getDiseases() {
				const store = getStore();
				const endpoint = `${baseUrl}/diseases`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				// if (store.token) {
				// 	headers["Authorization"] = `Bearer ${store.token}`;
				// }

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data)
						setStore({ diseases: data });
						console.log(store.diseases);

						// console.log("contacto", store.user);
					});
			},
			getPostUser() {
				const store = getStore();
				const endpoint = `${baseUrl}/users/posts`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data)
						setStore({ userPosts: data });
						console.log("posts de un usuario", store.userPosts);
						// console.log(store.token);

						// console.log("contacto", store.user);
					});
			},
			getPostsDisease(id) {
				const store = getStore();
				const endpoint = `${baseUrl}/disease/${id}`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data)
						setStore({ diseasePost: data });
						console.log("posts de una enfermedad", store.diseasePost);
						console.log(store.token);

						// console.log("contacto", store.user);
					});
			},
			getOnePost(id) {
				const store = getStore();
				const endpoint = `${baseUrl}/posts/${id}`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						setStore({
							post: data,
							comments: data.comments
						});
						console.log("un post", store.post);
						console.log("comentarios", store.post.comments);
					})
					// .catch(error => console.error("error: ", error));
					.catch(error => alert("error: ", error));
			},
			createPost(input) {
				const store = getStore();
				const endpoint = `${baseUrl}/posts`;
				const method = "POST";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers,
					body: JSON.stringify({
						disease_id: input.diseaseId,
						text: input.text,
						imagen: input.url
					})
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data);
					})
					.catch(error => console.error("error: ", error));
			},
			async createComment(input) {
				const store = getStore();
				const endpoint = `${baseUrl}/comments`;
				const method = "POST";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers,
					body: JSON.stringify({
						post_id: input.postId,
						text: input.comment
					})
				};
				await fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data);
					})
					.catch(error => console.error("error: ", error));
			},
			getFollow() {
				const store = getStore();
				const endpoint = `${baseUrl}/follows`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data)
						setStore({ follows: data });
						console.log("store.follows flux: ", store.follows);
					});
			},
			getFeed() {
				const store = getStore();
				const endpoint = `${baseUrl}/feed`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log("para el feed", data);
						setStore({ feed: data });
						console.log("store.feed: ", store.feed);
					});
			},
			createRole(input) {
				const store = getStore();
				const endpoint = `${baseUrl}/follows`;
				const method = "POST";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers,
					body: JSON.stringify({
						disease_id: input.diseaseId,
						role: input.role
					})
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						console.log(data);
					})
					.catch(error => console.error("error: ", error));
			},
			getAssociations() {
				const store = getStore();
				const endpoint = `${baseUrl}/associations`;
				const method = "GET";
				const headers = { "Content-Type": "application/json" };

				// if (store.token) {
				// 	headers["Authorization"] = `Bearer ${store.token}`;
				// }

				const config = {
					method: method,
					headers: headers
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data)
						setStore({ associations: data });
						// console.log(store.associations);
					});
			}
		}
	};
};

export default getState;
