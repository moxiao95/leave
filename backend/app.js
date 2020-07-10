const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const mysql = require('./mysql');
const config = require('./default');

const app = new Koa();
app.use(bodyParser());


app.use(async (ctx, next) => {
    console.log(`${ctx.request.method}  ${ctx.request.url}`);
    await next();
});

router.get('/d', async(ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `<h1>hello: ${name}</h1>`;
});

router.get('/s', async(ctx, next) => {
    let data = await mysql.queryStudent();
    ctx.body = {
        data,
        s: 'sss',
    }
});

router.post('/login', async (ctx, next) => {
    let id = ctx.request.body.id || '',
        password = ctx.request.body.password || '';
    let list = [];
    let studentData = await mysql.queryStudent();
    let teacherData = await mysql.queryTeacher();
    let leaveData = await mysql.queryLeave();
    console.log(studentData, teacherData, leaveData);
    ctx.response.body = {
        state: 200,
        data: list,
        msg: '登录成功',
    };
});


app.use(router.routes());

app.listen(config.port);
console.log('port: 3000');