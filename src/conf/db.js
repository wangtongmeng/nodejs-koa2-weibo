/**
 * @description 存储配置
 * @author 王童孟
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: '123456qwer',
  port: '3306',
  database: 'koa2_weibo_db' // 数据库名称
}

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1'
  }

  MYSQL_CONF = {
    // 线上的 redis 配置
    host: 'localhost',
    user: 'root',
    password: '123456qwer',
    port: '3306',
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}