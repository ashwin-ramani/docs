from flask import Flask, render_template, request, redirect
import random, json

app = Flask(__name__)

data = {
	"users": {}, 
	"documents": {}
}

def generate():
	def generate_str():
		chars = []
		for i in range(random.randint(20, 40)):
			char_type = random.choice(("int", "str"))
			if (char_type == "int"):
				 chars.append(str(random.randint(0, 9)))
			else:
				chars.append(random.choice("abcdefghijklmnopqrstuvwxyz"))
			
		return "".join(chars)
	
	generated = generate_str()
	while generated in data["documents"]:
		generated = generate_str()
	return generated


@app.route("/")
def index():
	return redirect("/login")

@app.route("/login")
def login():
	return render_template("login.html")

@app.route("/document")
def document():
	return render_template("docs.html")

@app.route("/document/<doc_id>")
def _document(doc_id):
	if (not(doc_id in data["documents"])): 
		return redirect("/login")
	else:
		return render_template("load.html", content = data["documents"][doc_id]["content"], title = data["documents"][doc_id]["title"], credentials = json.dumps({"username": data["documents"][doc_id]["owner"], "password": data["users"][data["documents"][doc_id]["owner"]]["password"]}))

@app.route("/document/<doc_id>/edit")
def __document(doc_id):
	if (not(doc_id in data["documents"])):
		return redirect("/login")
	else:
		return render_template("edit.html", content = data["documents"][doc_id]["content"], title = data["documents"][doc_id]["title"])

@app.route("/document/<doc_id>/view")
def ___document(doc_id):
	if (not(doc_id in data["documents"])):
		return redirect("/login")
	else:
		return f"<title>{data['documents'][doc_id]['title']}</title><div>{data['documents'][doc_id]['content']}</div>"

@app.route("/request", methods = ["POST"])
def requests():
	if (request.form["purpose"] == "login"):
		if (not(request.form["username"] in data["users"]) or not(data["users"][request.form["username"]]["password"] == request.form["password"])):
			return "Wrong username/password."
		else:
			return json.dumps({"credentials": {"username": request.form["username"], "password": request.form["password"]}, "documents": data["users"][request.form["username"]]["documents"]})
		
	if (request.form["purpose"] == "register"):
		if (request.form["username"] in data["users"]):
			return "Username is taken."
		else:
			data["users"][request.form["username"]] = {"username": request.form["username"], "password": request.form["password"], "documents": []}
			return "Account created. You can now log in."
	
	if (request.form["purpose"] == "get-documents"):
		if (not(request.form["password"] == data["users"][request.form["username"]]["password"])):
			return "incorrect password"
		else:
			returns = []
			for doc_id in data["users"][request.form["username"]]["documents"]:
				returns.append({"name": data["documents"][doc_id]["title"], "id": doc_id})
			return json.dumps(returns)

	if (request.form["purpose"] == "create"):
		if (not(request.form["password"] == data["users"][request.form["username"]]["password"])):
			return "incorrect password"
		else:
			doc_id = generate()
			data["documents"][doc_id] = {"id": doc_id, "title": request.form["title"], "owner": request.form["username"], "content": ""}
			data["users"][request.form["username"]]["documents"].append(doc_id)
			return doc_id

	if (request.form["purpose"] == "verify"):
		if (not(request.form["password"] == data["users"][request.form["username"]]["password"])):
			return "unverified"
		else: 
			return "verified"
	
	if (request.form["purpose"] == "save"):
		if (not(request.form["password"] == data["users"][request.form["username"]]["password"])):
			return "Authentication failed."
		else:
			print(request.form["content"])
			data["documents"][request.form["id"]]["content"] = request.form["content"]
			return "Changes saved."

app.run(host="0.0.0.0")
