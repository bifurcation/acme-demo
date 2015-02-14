A simple ACME demo
==================

This is a simple demo of how to use ACME to get a certificate and use
it for HTTPS:

```
> node ca.js &    # Start up the CA
> node server.js  # Get a cert and start an HTTPS server
```

Starting the server up will take a few seconds, to do two JS crypto operations:

1. The server generating a 2048-bit RSA key pair
2. The CA computing a 4096-bit RSA signature

The HTTPS server gets a cert for `example.com` and runs on port 8090.  So if you have `example.com` mapped to `::1` in your `/etc/hosts` file, you should now be able to access `https://example.com:8090`.
