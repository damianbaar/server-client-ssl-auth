var tls = require('tls'),
    fs = require('fs'),
    colors = require('colors'),
    msg = [
            ".-..-..-.  .-.   .-. .--. .---. .-.   .---. .-.",
            ": :; :: :  : :.-.: :: ,. :: .; :: :   : .  :: :",
            ":    :: :  : :: :: :: :: ::   .': :   : :: :: :",
            ": :: :: :  : `' `' ;: :; :: :.`.: :__ : :; ::_;",
            ":_;:_;:_;   `.,`.,' `.__.':_;:_;:___.':___.':_;" 
          ].join("\n").cyan;

var options = {
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.crt'),
  ca: fs.readFileSync('./cert/ca.crt'),
  passphrase: 'damian',
  requestCert: true,
  rejectUnauthorized: true
};

tls.createServer(options, function (s) {
  var cert = s.getPeerCertificate()
    , cName = cert && cert.subject.CN 

  if(cName === 'localhost-client') {
    console.log('writing to client', cName)
    s.write(msg+"\n")
    s.pipe(s)
  }
}).listen(8000);
