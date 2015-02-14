var acme = require("node-acme");
var fs = require("fs");

acme.enableLocalUsage();

const KEY_FILE_NAME = "ca.key.pem";
const CERT_FILE_NAME = "ca.cert.pem";

// Load private key from file
try {
  var privateKeyPem = fs.readFileSync(KEY_FILE_NAME, "utf8");
  var certPem = fs.readFileSync(CERT_FILE_NAME, "utf8");
} catch (e) {
  console.log("Unable to read private key and cert: " + e);
  process.exit(1);
}

var server = acme.createServer();
server.setPrivateKey(privateKeyPem);
server.setCertificate(certPem);
server.listen(4000);
console.log("Server listening on port 4000");
