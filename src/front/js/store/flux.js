const baseUrl = "https://3001-f9120fab-9114-4cd3-be35-26ffcc7c1bd1.ws-eu03.gitpod.io/api";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null
		},
		actions: {
			createUser: input => {
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
				});
			},

			userLogin: input => {
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
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => {
						setStore({ token: data.token });
						actions.test();
					})
					.catch(error => console.error("error: ", error)); // imprime el tipo error que se ha producido
			},
			test() {
				const store = getStore();
				console.log("tokem: ", store.token);
				const endpoint = `${baseUrl}/test`;
				const method = "GET";
				const config = {
					method: method,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${store.token}`
					}
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => console.log(data));
			}
		}
	};
};

export default getState;
