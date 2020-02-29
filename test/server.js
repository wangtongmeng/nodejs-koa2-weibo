/**
 * @description jest server
 * @author 王童孟
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)