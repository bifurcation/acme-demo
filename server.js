var acme = require("node-acme");
var https = require("https")

acme.enableLocalUsage();

const AUTHZ_URL = "https://localhost:4000/acme/new-authz";
const CERT_URL = "https://localhost:4000/acme/new-cert";
const PORT = 8090;

console.log("Generating a 2048-bit key pair and getting a certificate...");
acme.getMeACertificate(AUTHZ_URL, CERT_URL, "example.com", function(result) {
  // Check for errors
  if (result.error) {
    console.log("Error getting certificate: " + JSON.stringify(result.error));
    return;
  }

  // Start a server
  var keyPem = acme.privateKeyToPem(result.subjectKeyPair.privateKey);
  var certPem = acme.certificateToPem(result.certificate);
  https.createServer({key: keyPem, cert: certPem}, function (req, res) {
    res.writeHead(200);
    res.write("hello world!\n\n");
    res.write("Here's the cert I just got:\n\n");
    res.end(certPem);
  }).listen(PORT);
  console.log("Server now listening...")
});
