const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('index.html', {
      title: '我是ljj',
    });
  }

  async user() {
    const { ctx } = this;
    const result = await ctx.service.home.user();
    ctx.body = {
      result,
    };
  }

  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    // Egg 框架内置了 bodyParser 中间件来对 POST 请求 body 解析成 object 挂载到 ctx.request.body 上
    ctx.body = {
      title,
    };
  }

  async addUser() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    // 注意name在ctx.request.body中取，而不是参数中取

    try {
      await ctx.service.home.addUser(name);
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '失败',
        data: null,
      };
    }
  }

  async editUser() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;
    try {
      await ctx.service.home.editUser(id, name);
      ctx.body = {
        code: 200,
        msg: '成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '失败',
        data: null,
      };
    }
  }

  async deleteUser() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.service.home.deleteUser(id);
      ctx.body = {
        code: 200,
        msg: 'access',
        data: null,
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        msg: 'failed',
        data: null,
      };
    }
  }
}

module.exports = HomeController;
