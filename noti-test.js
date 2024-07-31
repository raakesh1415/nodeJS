/* A quite detailed WebSockets example */

const uWS = require('uWebSockets.js');
const mysql = require("mysql2");
const port = 9115;

//Mysql
const db = mysql.createConnection({
  host: "127.0.0.1", // MySQL server host (e.g., 'localhost')
  user: "bualapi", // MySQL username
  password: "password", // MySQL password
  database: "bual_backend_db", // MySQL database name
});

db.connect(function (err) {
  if (err) {
    console.log("Fail connecting to MySQL Database.", err);
  } else {
    console.log("Connected to MySQL Database.");
  }
});

const app = uWS./*SSL*/App({
/*
  key_file_name: 'misc/key.pem',
  cert_file_name: 'misc/cert.pem',
  passphrase: '1234'
  */
}).ws('/*', {
  /* Options */
  compression: uWS.SHARED_COMPRESSOR,
  maxPayloadLength: 16 * 1024 * 1024,
  idleTimeout: 10,
  /* Handlers */
  open: (ws) => {
    // insert data
    open();

    // update data
    ws.send("update data");


  },
  message: (ws, message, isBinary) => {
    /* Ok is false if backpressure was built up, wait for drain */
    let ok = ws.send(message, isBinary);
  },
  drain: (ws) => {
    console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
  },
  close: (ws, code, message) => {
    console.log('WebSocket closed');
  }
  
}).any('/*', (res, req) => {
  res.end('Nothing to see here!');
}).listen(port, (token) => {
  if (token) {
    console.log('Listening to port ' + port);
  } else {
    console.log('Failed to listen to port ' + port);
  }
});

function open() {
  console.log('A WebSocket connected!');

    var test_id = 123;
    var test_port = port;
    //mysql
    var sql = "INSERT INTO instances (i_instance_id, i_port) VALUES (?, ?)";
    db.query(sql, [test_id, test_port], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

module.exports = { open };
