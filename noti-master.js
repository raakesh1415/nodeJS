/* A quite detailed WebSockets example */

const uWS = require('uWebSockets.js');
const mysql = require("mysql2");
const port = 9115;

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
    
    var sql = "SELECT * FROM instances";
    db.query(sql, function (err, result) {
      if (err) {
        console.log("Error");
        console.error(err);
      } else if (result.length === 0) {
        console.log("Date is empty");
        checkGenesisInstance();
      } else {
        console.log("Data is available");
      }
    });
  
  },
  message: (ws, message, isBinary) => {
    /* Ok is false if backpressure was built up, wait for drain */
    //let ok = ws.send(message, isBinary);

    var sql="UPDATE instances SET i_status = 1 WHERE i_port = 9115;";
     db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record updated");
  
      });

    // console.log("test message")

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

function checkGenesisInstance(){
  const file1 = require('./noti-test'); 
  file1.open();
}