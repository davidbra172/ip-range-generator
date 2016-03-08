'use strict';

const net    = require('net');
const assert = require('assert');

/**
 * Convert an IPv4 to an hexadecimal representation
 * @param  {String} ip   IPv4
 * @return {Integer} hex representation
 */
function ip2hex(ip) {
  let parts = ip.split('.').map(str => parseInt(str, 10));
  let n = 0;

  n += parts[3];
  n += parts[2] * 256;      // 2^8
  n += parts[1] * 65536;    // 2^16
  n += parts[0] * 16777216; // 2^24

  return n;
}

/**
 * Generate all IPv4 that are included in the given range
 * @param {String} ip1   first IPv4 of the range
 * @param {String} ip2   last IPv4 of the range
 * @yield {String} IPv4 included in the range
 */
module.exports = function *range(ip1, ip2) {
  assert(net.isIPv4(ip1), 'argument "ip1" must be a valid IPv4 address');
  assert(net.isIPv4(ip2), 'argument "ip2" must be a valid IPv4 address');

  let hex  = ip2hex(ip1);
  let hex2 = ip2hex(ip2);

  if (hex > hex2) {
    let tmp = hex;
    hex = hex2;
    hex2 = tmp;
  }

  for (let i = hex; i <= hex2; i++) {
    yield `${(i >> 24) & 0xff}.${(i >> 16) & 0xff}.${(i >> 8) & 0xff}.${i & 0xff}`;
  }
};
