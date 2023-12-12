'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async getUserByName(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', { username });
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async register(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('user', params);
      // app.mysql.insert 是一个promisify的函数，因为本质上node中的io回调应该应该是poll阶段执行的宏任务
      // 本质上插入mysql数据库的操作应该是由底层c代码和数据库交互完成，完成后回调函数作为宏任务执行
      // 但如果对回调函数进行promisfy封装，内部可以产生一个resolve，使得promise状态变为fulfilled
      // resolve之后，await之后的代码作为回调函数可以被放入到微任务队列，从而得以执行
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async editUserInfo(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('user', {
        ...params,
      }, {
        id: params.id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
