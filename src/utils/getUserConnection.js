function userConnection() {
	window.addEventListener('load', () => {
		let connection = navigator.onLine;
		if (connection) {
			alert('you are  connected');
		} else {
			alert('you are  not connected');
		}
		// window.addEventListener('online', () => alert('You are online'));
		// window.addEventListener('offline', () => alert('You are offline'));
		console.log(connection);
	});

	// return connection;
}

userConnection();
export default userConnection;
