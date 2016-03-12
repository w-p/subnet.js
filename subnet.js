

var subnet = {};

(function () {

    this.Ipv4 = function (address, cidr) {
        this.cidr = +cidr;
        this.ipCount = Math.pow(2, 32 - this.cidr) - 2;

        this.address = address;
        this.address_octets = []; // see last line

        this.subnet = '';
        this.subnet_octets = [];

        this.wildcard = '';
        this.wildcard_octets = [];

        this.network = '';
        this.network_octets = [];

        this.broadcast = '';
        this.broadcast_octets = [];

        this.__compute_subnet__ = function () {
            var self = this;
            var host_bits = 32 - this.cidr;
            var netmask = _.times(this.cidr, function () { return '1'; }).join('');
            var hostmask = _.times(host_bits, function () { return '1'; }).join('');

            netmask = _.padRight(netmask, 32, '0');
            hostmask = _.padLeft(hostmask, 32, '0');

            this.subnet_octets = _.map(_.chunk(netmask, 8), function (v) {
                return parseInt(v.join(''), 2);
            });
            this.subnet = this.subnet_octets.join('.');

            this.network_octets = _.map(this.address_octets, function (v, i) {
                return v & self.subnet_octets[i];
            });
            this.network = this.network_octets.join('.');

            this.wildcard_octets = _.map(this.subnet_octets, function (v) {
                return 255 ^ v;
            });
            this.wildcard = this.wildcard_octets.join('.');

            this.broadcast_octets = _.map(this.wildcard_octets, function (v, i) {
                if (v === 0) {
                    return self.address_octets[i];
                } else if (v !== 255) {
                    var bits = v.toString(2).replace('0', '').length;
                    return self.network_octets[i] + (Math.pow(2, bits) - 1);
                }
                return v;
            });
            this.broadcast = this.broadcast_octets.join('.');
        }

        this.toBinary = function (address) {
            address = address || this.address;
            return _.map(address.split('.'), function (v) {
                return _.padLeft((+v).toString(2), 8, '0');
            });
        };
        this.toOctets = function (address) {
            address = address || this.address;
            return _.map(address.split('.'), function (v) { return +v });
        };
        this.toJSON = function () {
            var obj = {
                cidr: this.cidr,
                ipCount: this.ipCount,
                address: this.address,
                subnet: this.subnet,
                wildcard: this.wildcard,
                network: this.network,
                broadcast: this.broadcast
            };
            return JSON.stringify(obj, null, 2);
        };
        this.address_octets = this.toOctets(this.address);
        this.__compute_subnet__();
    };

}).apply( subnet );
