try {
	let { username, password } = JSON.parse(localStorage.getItem("credentials"));
	let formData = new FormData();
	formData.append("username", username);
	formData.append("password", password);
	formData.append("purpose", "login");
	fetch("https://docs.ashwinramani1.repl.co/request", {
		"method": "POST",
		"body": formData
	})
	.then(response => response.json())
	.then(data => {
		localStorage.setItem("credentials", JSON.stringify(data["credentials"]));
		localStorage.setItem("documents", JSON.stringify(data["documents"]));
		window.location.href = "https://docs.ashwinramani1.repl.co/document";
	});
}

catch (error) {}

function goToLogin() {
	document.getElementById("register").style.display = "none";
	document.getElementById("login").style.display = "block";
	document.getElementById()
}

function goToRegister() {
	document.getElementById("register").style.display = "block";
	document.getElementById("login").style.display = "none";
}

function login() {
	let formData = new FormData();
	formData.append("purpose", "login");
	formData.append("username", document.getElementsByName("username")[0].value);
	formData.append("password", document.getElementsByName("password")[0].value);
	fetch("https://docs.ashwinramani1.repl.co/request", {
		"method": "POST",
		"body": formData
	})
	.then(response => response.text())
	.then(data => {
		if (data.startsWith("W")) {
			document.getElementById("loginStatus").style.color = "red";
			document.getElementById("loginStatus").innerText = data;
		}

		else {
			localStorage.setItem("credentials", JSON.stringify(JSON.parse(data)["credentials"]));
			localStorage.setItem("documents", JSON.stringify(JSON.parse(data)["documents"]));
			window.location.href = "https://docs.ashwinramani1.repl.co/document"
		}
	});
}

function register() {
	let username = document.getElementsByName("username")[1].value;
	let password = document.getElementsByName("password")[1].value;
	let confirmation = document.getElementsByName("confirmation")[0].value;
	if (username === "" || password === "") {
		document.getElementById("loginStatus").style.color = "red";
		document.getElementById("loginStatus").innerText = "No fields can be empty.";
	}

	else if (password !== confirmation) {
		document.getElementById("loginStatus").style.color = "red";
		document.getElementById("loginStatus").innerText = "Passwords do not match.";
	}

	else {
		let formData = new FormData();
		formData.append("purpose", "register");
		formData.append("username", username);
		formData.append("password", password);
		fetch("https://docs.ashwinramani1.repl.co/request", {
			"method": "POST",
			"body": formData
		})
		.then(response => response.text())
		.then(data => {
			if (data.startsWith("U")) {
				document.getElementById("loginStatus").style.color = "red";
				document.getElementById("loginStatus").innerText = data;
			}

			else {
				document.getElementById("loginStatus").style.color = "green";
				document.getElementById("loginStatus").innerText = data;
			}
		});
	}
}
