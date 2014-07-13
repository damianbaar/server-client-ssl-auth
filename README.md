# SSL Authentication
nothing fancy ...  client/server ssl authentication

####Wanna try?
* running server
`node server`

* running client
`node client`

###Certs for development
==================

###CA Key and Certificate for signing Client Certs

`openssl genrsa -des3 -out ca.key 4096`

`openssl req -new -x509 -days 365 -key ca.key -out ca.crt`

###Server Key, CSR, and Certificate

`openssl genrsa -des3 -out server.key 1024`

`openssl req -new -key server.key -out server.csr`

> 'Common Name: localhost' to avoid `Hostname/IP doesn't match certificate's altnames`

`openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt`

###Client Key, CSR, and Certificate

`openssl genrsa -des3 -out client.key 1024`

`openssl req -new -key client.key -out client.csr`

> 'Common Name: localhost-client'

openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt

