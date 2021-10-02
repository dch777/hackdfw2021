from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import math

app = Flask(__name__)
CORS(app)

@app.route("/hubs/", methods=["POST"])
def getClosestHubs():
    con = sqlite3.connect('hubs.db')
    cur = con.cursor()
    lat = float(request.form.get('lat'))
    long = float(request.form.get('long'))
    cur.execute('SELECT * FROM hubs')
    hubs = []
    for hub in cur.fetchall():
        print(hub[4])
        print(hub[5])
        print()
        if abs(hub[4]-lat) < 0.03 and abs(hub[5]-long) < 0.03:
            hubs.append(hub)
    return jsonify(hubs)

@app.route("/hubs/<id>", methods=["GET"])
def getHubUsers(id):
    con = sqlite3.connect('hubs.db')
    cur = con.cursor()
    cur.execute("SELECT * FROM hubs WHERE id=?", [id])
    return jsonify(cur.fetchone())

@app.route("/hubs/", methods=["POST"])
def postNewHub():
    con = sqlite3.connect('hubs.db')
    hubInfo = (request.form.get("name"),
        float(request.form.get("lat")),
        float(request.form.get("long")),
        request.form.get("description"),
        request.form.get("link"))
    print(hubInfo)
    con.execute("INSERT INTO hubs (name, lat, long, description, link) VALUES (?, ?, ?, ?, ?)", hubInfo)
    con.commit()
    return jsonify(hubInfo)

if __name__ == "__main__":
    app.run(debug=True)
