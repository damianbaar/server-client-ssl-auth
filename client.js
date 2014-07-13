var tls = require('tls'),
    fs = require('fs');

var options = {
  key: fs.readFileSync('client.key'),
  cert: fs.readFileSync('client.crt'),
  ca: fs.readFileSync('ca.crt'),
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
