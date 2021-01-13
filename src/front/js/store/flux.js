const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null
		},
		actions: {
			createUser: data => {
				const endpoint = "https://3001-ab259a27-521c-4c37-a16c-1a60e58f3765.ws-eu03.gitpod.io/api/users/";
				const method = "POST";
				const config = {
					method: method,
					mode: "cors",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data)
				};
				fetch(endpoint, config).then(response => {
					console.log(response);
				});
			}
		}
	};
};

export default getState;
