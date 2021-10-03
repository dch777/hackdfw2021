from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import math

app = Flask(__name__)
CORS(app)

@app.route("/hubs/<lat>/<long>", methods=["GET"])
def getClosestHubs(lat, long):
    con = sqlite3.connect('hubs.db')
    cur = con.cursor()
    cur.execute('SELECT * FROM hubs')
    hubs = []
    for hub in cur.fetchall():
        print(hub[4])
        if abs(hub[4]-float(lat)) < 0.3 and abs(hub[5]-float(long)) < 0.3:
            hubs.append(hub)
    return jsonify(hubs)

@app.route("/hubs/<id>", methods=["GET"])
def getHub(id):
    con = sqlite3.connect('hubs.db')
    cur = con.cursor()
    cur.execute("SELECT * FROM hubs WHERE id=?", [id])
    return jsonify(cur.fetchone())

@app.route("/hubs/users/<id>", methods=["GET"])
def getHubUsers(id):
    con = sqlite3.connect('hubs.db')
    cur = con.cursor()
    cur.execute("SELECT * FROM users WHERE hub_id=?", [id])
    return jsonify(cur.fetchall())

@app.route("/users/", methods=["POST"])
def postNewUser():
    con = sqlite3.connect('hubs.db')
    userInfo = (request.json.get("name"),
        request.json.get("description"),
        request.json.get("hub_id"))
    con.execute("INSERT INTO users (name, description, hub_id) VALUES (?, ?, ?)", userInfo)
    con.commit()
    userInfo = {
        "id": con.execute("SELECT last_insert_rowid();").fetchone()[0],
        "name": request.json.get("name"),
        "description": request.json.get("description"),
        "hub_id": request.json.get("hub_id")
    }
    return jsonify(userInfo)

@app.route("/users/disconnect/<id>", methods=["GET"])
def disconnectUser(id):
    con = sqlite3.connect('hubs.db')
    cur = con.cursor()
    cur.execute("DELETE FROM users WHERE id=?", [id])
    return jsonify(["User " + str(id) + " deleted"])

@app.route("/hubs/", methods=["POST"])
def postNewHub():
    con = sqlite3.connect('hubs.db')
    hubInfo = (request.json.get("name"),
        float(request.json.get("lat")),
        float(request.json.get("long")),
        request.json.get("description"),
        request.json.get("link"),
        request.json.get("image"))
    print(hubInfo)
    con.execute("INSERT INTO hubs (name, lat, long, description, link, image) VALUES (?, ?, ?, ?, ?, ?)", hubInfo)
    con.commit()
    return jsonify(hubInfo)

if __name__ == "__main__":
    app.run(debug=True)
