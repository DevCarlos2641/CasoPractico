const net = require('net');
const { parseRequest } = require('./routes');
const { handleRequest } = require('./controller');
 
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    const reqStr = data.toString();
    const { method, path, body } = parseRequest(reqStr);
    const response = handleRequest(method, path, body);
    socket.write(response);
    socket.end();
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor Tcp en el puertp:  ${PORT}`);
});
