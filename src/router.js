const Router = require('koa-router');
const config = require('./config');
const login = require('./controllers/login');
const wechat = require('./controllers/wechat');

function router(app) {
  const router = new Router();

  router.get('/login', async (ctx) => {
    await ctx.render('login');
  });
  
  router.post('/login', async (ctx) => {
    try {
      const data = await login.login();

      ctx.body = {
        code: 0,
        data
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message
      };
    }
  });
  
  router.get('/qrcode', async (ctx) => {
    const projects = config.projects;
    const data = {};

    for (let key in projects) {
      const project = projects[key];

      data[key] = {
        name: project.name,
        desc: project.desc,
        branches: project.branches
      };
    }

    await ctx.render('qrcode', {
      projects: data
    });
  });
  
  router.post('/qrcode', async (ctx) => {
    const { project, branch } = ctx.request.body || {};
  
    try {
      const data = await wechat.qrcode(project, branch);

      ctx.body = {
        code: 0,
        data
      };
    } catch (error) {
      ctx.body = {
        code: error.code,
        message: error.message
      };
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = router;