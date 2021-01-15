const baseUrl = "https://3001-e4288aac-3683-4c3e-9942-e3dc0e9f9be1.ws-eu03.gitpod.io/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null
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
					body: JSON.stringify(input)
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
						console.log("Respuesta del login");
						setStore({ token: data.token });
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
					.then(data => console.log(data));
			}
		}
	};
};

export default getState;
