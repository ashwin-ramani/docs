const credentials = localStorage.getItem("credentials");
if (!credentials) window.location.href = "https://docs.ashwinramani1.repl.co/login";

const { username, password } = JSON.parse(credentials);


var formData = new FormData();
formData.append("purpose", "get-documents");
formData.append("username", username);
formData.append("password", password);
fetch("https://docs.ashwinramani1.repl.co/request", {
	"method": "POST",
	"body": formData
})
.then(response => response.json())
.then(data => {
	if (data.length == 0) document.getElementById("documents").innerHTML = "You do not have any documents.<br>";

	data.forEach(doc => {
		let element = document.createElement("a");
		element.innerText = doc["name"]
		element.href = `https://docs.ashwinramani1.repl.co/document/${doc["id"]}/edit`;
		document.getElementById("documents").appendChild(element);
		document.getElementById("documents").appendChild(document.createElement("br"));
	});

	let element = document.createElement("button");
	element.innerText = "New";
	element.onclick = create;
	document.getElementById("documents").innerHTML += "<br><br>";
	document.getElementById("documents").appendChild(element);
	element = document.createElement("button");
	element.innerText = "Logout";
	element.onclick = () => {
		localStorage.clear();
		location.reload();
	}
	document.getElementById("documents").appendChild(element);
});

function create() {
	document.getElementById("documents").style.display = "none";
	document.body.innerHTML += "Title: ";
	element = document.createElement("input");
	element.name = "title";
	element.type = "text";
	document.body.appendChild(element);
	element = document.createElement("button");
	element.innerText = "Create";
	element.onclick = () => {
		formData = new FormData();
		formData.append("purpose", "create");
		formData.append("title", document.getElementsByName("title")[0].value);
		formData.append("username", username);
		formData.append("password", password);
		fetch("https://docs.ashwinramani1.repl.co/request", {
			"method": "POST",
			"body": formData
		})
		.then(response => response.text())
		.then(data => window.location.href = `https://docs.ashwinramani1.repl.co/document/${data}/edit`);
	}
	
	document.body.appendChild(element);
}
