const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null
		},
		actions: {
			createUser: data => {
				const endpoint = "https://3001-c09bbe0c-48e8-4493-bfa7-4f159fb1ca21.ws-eu03.gitpod.io/api/users";
				const method = "POST";
				const config = {
					method: method,
					// mode: "no-cors",
					headers: {
						"Content-Type": "application/json"
						// "Access-Control-Allow-Origin": "*"
					},
					body: JSON.stringify(data)
				};
				fetch(endpoint, config).then(response => {
					console.log(response);
				});
			},

			userLogin: data => {
				const endpoint = "https://3001-c09bbe0c-48e8-4493-bfa7-4f159fb1ca21.ws-eu03.gitpod.io/api/login";
				const method = "POST";
				const config = {
					method: method,
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(data)
				};
				fetch(endpoint, config)
					.then(response => response.json())
					.then(data => console.log(data))
					.catch(error => console.error("error: ", error)); // imprime el tipo error que se ha producido
			}
		}
	};
};

export default getState;
