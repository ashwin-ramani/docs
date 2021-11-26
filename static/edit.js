const credentials = localStorage.getItem("credentials");
if (!credentials) window.location.href = "https://docs.ashwinramani1.repl.co/login";

const { username, password } = JSON.parse(credentials);

var formData = new FormData();
formData.append("purpose", "verify");	
formData.append("username", username);
formData.append("password", password);

fetch("https://docs.ashwinramani1.repl.co/request", {
	"method": "POST",
	"body": formData
})
.then(response => response.text())
.then(data => {
	if (data == "unverified") window.location.href = "https://docs.ashwinramani1.repl.co/login";
	
});

function save() {
	formData = new FormData();
	formData.append("purpose", "save");
	formData.append("id", window.location.href.replace("https://", "").split("/")[2]);
	formData.append("content", document.getElementById("content").innerHTML);
	formData.append("username", username);
	formData.append("password", password);
	fetch("https://docs.ashwinramani1.repl.co/request", {
		"method": "POST",
		"body": formData
	})
	.then(response => response.text())
	.then(data => alert(data));
}
