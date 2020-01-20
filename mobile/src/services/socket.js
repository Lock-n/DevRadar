import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.12:3333', {
  autoConnect: false,
});

const connect = () => {
  socket.connect();
};

const disconnect = () => {
  if (socket.connected) socket.disconnect();
};

socket.connect();

export { connect, disconnect };
