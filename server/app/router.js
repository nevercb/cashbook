/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  // router.get('/', controller.home.index);
  // router.get('/user', controller.home.user);
  // router.post('/addUser', controller.home.addUser);
  // router.post('/editUser', controller.home.editUser);
  // router.post('/deleteUser', controller.home.deleteUser);
  const _jwt = middleware.jwtErr(app.config.jwt.secret);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo);
  router.get('/api/user/test', _jwt, controller.user.test);
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo);
  router.post('/api/upload', controller.upload.upload);
  router.post('/api/bill/add', _jwt, controller.bill.add);
  router.get('/api/bill/list', _jwt, controller.bill.list);
  router.get('/api/bill/detail', _jwt, controller.bill.detail);
  router.post('/api/bill/update', _jwt, controller.bill.update);
  router.post('/api/bill/delete', _jwt, controller.bill.delete);
  router.get('/api/bill/data', _jwt, controller.bill.data);
};
