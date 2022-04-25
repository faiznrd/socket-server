
import { IncomingMessage } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { initializeApp } from 'firebase/app';
const wss = new WebSocketServer({
    port: 3000
})

interface IStatus {
    status: string
    from: string
}

interface IEspResponseData extends IStatus {}
// id for esp => esp8266_smart_lamp
wss.on('connection', (socket: WebSocket, req: IncomingMessage) => {

    socket.on('message', (data) => {
        console.log(data.toString())
        const dataObj = JSON.parse(data.toString())
        console.log(dataObj)
        if(dataObj.event == 'esp8266_callback'){
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({
                    event: "server_callback",
                    data: dataObj.data
                }));
                }
            });
        }
        if(dataObj.event == 'input_status'){
            if(dataObj.data.status){
                let ip_address = req.socket.remoteAddress
                const dataStatus = {
                    id: "esp8266_smart_lamp",
                    user_agent: req.headers['user-agent'], 
                    from: 'button',
                    data: dataObj.data.status,
                    ip: ip_address
                }
                console.log(dataStatus)
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                      client.send(JSON.stringify({
                        event: "status",
                        data: dataStatus
                    }));
                    }
                });
            }
        }
    })
})
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