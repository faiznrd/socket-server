"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var express = require("express");
var server = express().listen(3000);
var wss = new ws_1.WebSocketServer({ server: server });
// id for esp => esp8266_smart_lamp
wss.on('connection', function (socket, req) {
    socket.on('message', function (data) {
        console.log(data.toString());
        var dataObj = JSON.parse(data.toString());
        console.log(dataObj);
        if (dataObj.event == 'esp8266_callback') {
            wss.clients.forEach(function each(client) {
                if (client.readyState === ws_1.WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        event: "server_callback",
                        data: dataObj.data
                    }));
                }
            });
        }
        if (dataObj.event == 'input_status') {
            if (dataObj.data.status) {
                var ip_address = req.socket.remoteAddress;
                var dataStatus_1 = {
                    id: "esp8266_smart_lamp",
                    user_agent: req.headers['user-agent'],
                    from: 'button',
                    data: dataObj.data.status,
                    ip: ip_address
                };
                console.log(dataStatus_1);
                wss.clients.forEach(function each(client) {
                    if (client.readyState === ws_1.WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            event: "status",
                            data: dataStatus_1
                        }));
                    }
                });
            }
        }
    });
});
// io.on('connection', (socket: Socket) => {
//     console.log(socket.conn.remoteAddress)
//     socket.on('input_status', (data: IStatus) => {
//         if(data.status) {
//             let ip_address = socket.conn.remoteAddress
//             const dataStatus = {
//                 id: "esp8266_smart_lamp",
//                 user_agent: socket.request.headers['user-agent'], 
//                 from: 'button',
//                 data: data.status,
//                 ip: ip_address
//             }
//             console.log(dataStatus)
//             socket.broadcast.emit('status', dataStatus)
//         } 
//     })
//     socket.on('inserted_to_db', (data: IEspResponseData) => {
//         console.log(data)
//         socket.broadcast.emit('client_status', data)
//     })
// })
// io.listen(3000)
