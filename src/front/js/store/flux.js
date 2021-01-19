const baseUrl = "https://3001-d0414ef7-6a6b-4c14-9af7-0fcc99e588e9.ws-eu03.gitpod.io/api";

const getState = ({ getStore, getActions, setStore }) => {
	const token = localStorage.getItem("token");
	return {
		store: {
			token: token,
			user: {},
			list: ["elemento1", "elemento2", "elemento3"],
			diseases: [],
			userPosts: [],
			follows: []
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
					console.log(response);
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
						console.log(store.token);
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
					.then(response => response.json())
					.then(data => {
						console.log(data);
					})
					.catch(error => console.error("error: ", error));
			},
			getDiseases() {
				const store = getStore();
				const endpoint = `${baseUrl}/diseases`;
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
						console.log(store.token);

						// console.log("contacto", store.user);
					});
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
						console.log(store.follows);
					});
			}
		}
	};
};

export default getState;
