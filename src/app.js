const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const app = new Koa();

app.use(views(path.join(__dirname, './views'), {
   extension: 'ejs'
 }));

app.use(static(path.join(__dirname, '../static')));

app.use(bodyParser());

router(app);

app.listen(3000);

console.log('Success to start');