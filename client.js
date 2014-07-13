var tls = require('tls'),
    fs = require('fs');

var options = {
  key: fs.readFileSync('./cert/client.key'),
  cert: fs.readFileSync('./cert/client.crt'),
  ca: fs.readFileSync('./cert/ca.crt'),
  passphrase: 'damian',
  requestCert: true,
  rejectUnauthorized: false
};

var conn = tls.connect(8000, options, function() {
  if (conn.authorized) console.log('connected to', conn.getPeerCertificate().subject.CN)
  else console.log("Connection not authorized: " + conn.authorizationError)
})

conn.on("data", function (data) {
  console.log(data.toString());
  conn.end();
});
