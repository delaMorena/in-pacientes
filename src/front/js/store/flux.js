const baseUrl = "https://3001-eb31c1ff-8013-4e3e-940f-aa2bcbce8f61.ws-eu03.gitpod.io/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: {}
		},
		actions: {
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
						setStore({
							token: data.token
						});
						// console.log(store.token);
					})
					.catch(error => console.error("error: ", error)); // imprime el tipo error que se ha producido
			},
			async test() {
				const store = getStore();
				console.log("token: ", store.token);
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
					});
			},
			editUser(input) {
				const endpoint = `${baseUrl}/users`;
				const method = "PUT";
				const config = {
					method: method,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*"
					},
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
			}
		}
	};
};

export default getState;
