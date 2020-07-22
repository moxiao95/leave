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

// 学生登录
router.post('/slogin', async (ctx, next) => {
    let id = ctx.request.body.id || '',
        password = ctx.request.body.password || '';
    console.log(id, password)
    let studentData = await mysql.queryStudent(id, password);
    console.log(studentData);
    ctx.response.body = {
        state: 200,
        data: studentData,
        msg: '登录成功',
    };
});
// 老师登录
router.post('/tlogin', async (ctx, next) => {
    let id = ctx.request.body.id || '',
        password = ctx.request.body.password || '';
    console.log(id, password);
    let teacherData = await mysql.queryTeacher(id, password);
    console.log(teacherData);
    ctx.response.body = {
        state: 200,
        data: teacherData,
        msg: '登录成功',
    };
});
// 学生查找请假表
router.get('/sleaves', async(ctx, next) => {
    let data = await mysql.sQueryLeave();
    ctx.body = {
        state: 200,
        data,
        msg: '查找成功',
    }
});
// 老师查找请假表
router.get('/tleaves', async(ctx, next) => {
    let data = await mysql.tQueryLeave();
    ctx.body = {
        state: 200,
        data,
        msg: '查找成功',
    }
});

app.use(router.routes());

app.listen(config.port);
console.log('port: 3000');
