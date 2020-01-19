const WebSocket = require('ws');
const webSocketServer = new WebSocket.Server({ port: 3000 });
const express = require("express");
const app = express();

app.get("api/uslugi", function (req, res) {
    var content = fs.readFileSync("users.json", "utf8");
    var users = JSON.parse(content);
    res.send(users);
});

webSocketServer.on('connection', (ws, req) => {
    console.log("Connected!");
    ws.on('message', message => {
        if (message === "isUpgrade") {
            webSocketServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify('Update'));
                    console.log("Update");
                }
            });
        } else {
            webSocketServer.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                    console.log(message);
                }
            });
        }
    });
});
