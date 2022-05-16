const WebSocket = require('ws')

;((Ws) => {
  const server = new Ws.Server({ port: 8000 })

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }

  function handleOpen() {
      console.log('Open')
  }
  function handleClose() {
    console.log('Close')
  }
  function handleError() {
    console.log('Error')
  }
  function handleConnection(ws) {
      console.log('WebSocket Connection')
      ws.on('message',handleMessage)
  }
  
  function handleMessage (msg) {
    let mesg = msg.toString()
    console.log(mesg)
    server.clients.forEach((c)=>{
      c.send(mesg)
    })
  }
  init()
})(WebSocket)
