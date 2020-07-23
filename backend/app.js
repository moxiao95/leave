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

// 学生登录-login
router.post('/slogin', async (ctx, next) => {
    let id = ctx.request.body.id || '',
        password = ctx.request.body.password || '';
    console.log(id, password)
    await mysql.loginStudent(id, password).then((data) => {
        console.log(data);
        ctx.response.body = {
            data,
            state: 200,
            msg: '登录成功',
        };
    });
});

// 老师登录-login
router.post('/tlogin', async (ctx, next) => {
    let id = ctx.request.body.id || '',
        password = ctx.request.body.password || '';
    console.log(id, password);
    await mysql.loginTeacher(id, password).then((data) => {
        console.log(data);
        ctx.response.body = {
            data,
            state: 200,
            msg: '登录成功',
        };
    });
});

// 查找所有老师-leave
router.get('/teacher', async (ctx, next) => {
    await mysql.queryTeacher().then((data) => {
        console.log(data);
        ctx.body = {
            data,
            state: 200,
            msg: '查找成功',
        }
    });
});

// 学生申请假期-leave
router.post('/leave', async (ctx, next) => {
    let type = ctx.request.body.type || '',
        time = ctx.request.body.time || '',
        reason = ctx.request.body.reason || '',
        id = ctx.request.body.id || '',
        tId = ctx.request.body.tId || '';
    console.log(id, tId, type, time, reason);
    await mysql.toLeave(id, tId, type, time, reason).then((data) => {
        console.log(data);
        ctx.response.body = {
            data,
            state: 200,
            msg: '申请成功',
        };
    });
});

// 老师查看审批-leave
router.get('/lookLeave', async (ctx, next) => {
    let id = ctx.url.split('=')[1];
    await mysql.lookLeave(id).then((data) => {
        console.log(data);
        ctx.body = {
            data,
            state: 200,
            msg: '查找成功',
        }
    });
});

// 查看请假详情-details
router.get('/details', async (ctx, next) => {
    let id = ctx.url.split('=')[1];
    await mysql.queryLeaveDetails(id).then((data) => {
        console.log(data);
        ctx.body = {
            data,
            state: 200,
            msg: '查找成功',
        }
    });
});

router.get('/student', async (ctx, next) => {
    let id = ctx.url.split('=')[1];
    await mysql.queryStudent(id).then((data) => {
        console.log(data);
        ctx.body = {
            data,
            state: 200,
            msg: '查找成功',
        }
    });
});

// 学生查找请假表-recording
router.get('/sleaves', async(ctx, next) => {
    let id = ctx.url.split('=')[1];
    await mysql.sQueryLeave(id).then((data) => {
        console.log(data);
        ctx.body = {
            data,
            state: 200,
            msg: '查找成功',
        }
    });
});

// 老师查找请假表-recording
router.get('/tleaves', async(ctx, next) => {
    let id = ctx.url.split('=')[1];
    await mysql.tQueryLeave(id).then((data) => {
        console.log(data);
        ctx.body = {
            data,
            state: 200,
            msg: '查找成功',
        }
    });
});

app.use(router.routes());

app.listen(config.port);
console.log('port: 3000');
