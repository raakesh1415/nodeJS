const WebSocket = require('ws');

const socket = new WebSocket('ws://wsnoti0002.kotak.pro:9115');

socket.on('open', () => {
    console.log('Connected to the WebSocket server');
    socket.send('Hello Server!');
});

socket.on('message', (data) => {
    console.log('Message from server:', data);
});

socket.on('close', () => {
    console.log('Disconnected from the WebSocket server');
});

socket.on('error', (error) => {
    console.error('WebSocket error:', error);
});