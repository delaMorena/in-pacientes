const baseUrl = "https://3001-violet-gayal-ieo99iq9.ws-eu03.gitpod.io/api";

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
			feed: [],
			favorites: [],
			followers: []
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
					headers: {
						"Content-Type": "application/json"
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

				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						localStorage.setItem("token", data.token);
						setStore({ token: data.token });
						callback();
					})
					.catch(error => console.error("error: ", error));
			},
			uploadProfilePicture(files, id) {
				const store = getStore();
				const actions = getActions();
				const endpoint = `${baseUrl}/upload/${id}`;
				const method = "POST";
				const formData = new FormData();
				formData.append("avatar", files[0]);
				console.log("body: ", formData, files[0]);
				const headers = { Authorization: `Bearer ${store.token}` };

				const config = {
					method: method,
					body: formData,
					headers: headers
				};

				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						console.log("Bieeeeeen", data);
						actions.getUser();
					})
					.catch(error => console.log("Error!!!", error));
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
					})
					.catch(error => console.error("error: ", error));
			},
			async getUser() {
				const store = getStore();
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
				const actions = getActions();
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
						actions.getFollowByDisease(id);
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
						console.log("todas las enfermedades", store.diseases);

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
			// createPost(input, files) {
			// 	const store = getStore();
			// 	const actions = getActions();
			// 	const endpoint = `${baseUrl}/posts`;
			// 	const method = "POST";
			// 	const headers = { Authorization: `Bearer ${store.token}` };
			// 	const formData = new FormData();

			// 	formData.append("disease_id", input.diseaseId);
			// 	formData.append("text", input.text);
			// 	formData.append("imagen", files[0]);

			// 	const config = {
			// 		method: method,
			// 		headers: headers,
			// 		body: formData
			// 	};
			// 	fetch(endpoint, config)
			// 		.then(response => response.json())
			// 		.then(data => {
			// 			// console.log(data);
			// 			actions.getFeed();
			// 			actions.getPostUser();
			// 		})
			// 		.catch(error => console.error("error: ", error));
			// },
			createPost(input, item) {
				const store = getStore();
				const actions = getActions();
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
						text: input.text
					})
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						console.log("lo que viene del back: ", data);
						console.log(typeof data);
						actions.uploadPostPicture(item, data);
						actions.getFeed();
						actions.getPostUser();
					})
					.catch(error => console.error("error: ", error));
			},
			uploadPostPicture(files, id) {
				const store = getStore();
				const actions = getActions();
				const endpoint = `${baseUrl}/upload-post/${id}`;
				const method = "POST";
				const formData = new FormData();
				formData.append("image", files[0]);
				console.log("body: ", formData, files[0]);
				const headers = { Authorization: `Bearer ${store.token}` };

				const config = {
					method: method,
					body: formData,
					headers: headers
				};

				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						console.log("Bieeeeeen", data);
						actions.getFeed();
						actions.getPostUser();
						actions.getFavorites();
						actions.getOnePost(id);
					})
					.catch(error => console.log("Error!!!", error));
			},
			createComment(input) {
				const store = getStore();
				const actions = getActions();
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
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						// console.log(data);
						actions.getOnePost(input.postId);
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
			getFollowByDisease(id) {
				const store = getStore();
				const endpoint = `${baseUrl}/follows/${id}`;
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
						setStore({ followers: data });
						console.log("followers: ", store.followers);
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
				const actions = getActions();
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
						actions.getFollow();
					})
					.catch(error => console.error("error: ", error));
			},
			deleteFollow(id) {
				const store = getStore();
				const actions = getActions();
				const endpoint = `${baseUrl}/follows/${id}`;
				const method = "DELETE";
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
						console.log("eliminado de follows: ", data);
						actions.getFollow();
						actions.getFollowByDisease(id);
						// setStore({ oneDisease: data });
						// console.log("info enfermedad", store.oneDisease);
						// console.log(store.token);
					});
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
			},
			getFavorites() {
				const store = getStore();
				const endpoint = `${baseUrl}/favorites`;
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
						setStore({ favorites: data });
						console.log("favoritos: ", store.favorites);
					});
			},
			addFavortites(input) {
				const store = getStore();
				const actions = getActions();
				const endpoint = `${baseUrl}/favorites`;
				const method = "POST";
				const headers = { "Content-Type": "application/json" };

				if (store.token) {
					headers["Authorization"] = `Bearer ${store.token}`;
				}

				const config = {
					method: method,
					headers: headers,
					body: JSON.stringify({
						post_id: input.postId
					})
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						console.log(data);
						actions.getFavorites();
					})
					.catch(error => console.error("error: ", error));
			},
			deleteFavorite(id) {
				const store = getStore();
				const actions = getActions();
				const endpoint = `${baseUrl}/temppost/${id}`;
				const method = "DELETE";
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
						console.log("eliminado de favoritos: ", data);
						actions.getFavorites();
						// setStore({ oneDisease: data });
						// console.log("info enfermedad", store.oneDisease);
						// console.log(store.token);
					});
			}
		}
	};
};

export default getState;
