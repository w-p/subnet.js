

## subnet.js

Calculates subnets.

__Requires lodash__

See it in action [here](https://s3.amazonaws.com/subnet-calc/index.html).


Example usage and output:

```
var ip = new subnet.Ipv4('10.0.32.123', 19);

ip.toJSON();
"{
  "cidr": 19,
  "ipCount": 8190,
  "address": "10.0.32.123",
  "subnet": "255.255.224.0",
  "wildcard": "0.0.31.255",
  "network": "10.0.32.0",
  "broadcast": "10.0.63.255"
}"

ip.address_octets
[10, 0, 32, 123]

ip.subnet_octets
[255, 255, 224, 0]

ip.wildcard_octets
[0, 0, 31, 255]

ip.network_octets
[10, 0, 32, 0]

ip.broadcast_octets
[10, 0, 63, 255]

```
