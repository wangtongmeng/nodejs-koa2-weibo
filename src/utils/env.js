/**
 * @description 环境变量
 * @author 王童孟
 */

 const ENV = process.env.NODE_ENV

 module.exports = {
   idDev: ENV === 'dev',
   notDev: ENV !== 'dev',
   idProd: ENV === 'production',
   notProd: ENV !== 'production',
 }