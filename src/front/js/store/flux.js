const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null
		},
		actions: {
			createUser: data => {
				const endpoint = "https://3001-ba4b1410-a093-4c8a-bcc2-4ac068dfd64c.ws-eu03.gitpod.io/api/users";
				const method = "POST";
				const config = {
					method: method,
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
