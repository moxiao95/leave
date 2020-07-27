const mysql = require('mysql');
const config = require('./default');

const pool  = mysql.createPool({
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.database,
});

class Mysql {
    constructor () {

    }

    // 学生登录-login
    loginStudent(i, p) {
        let sqls = `SELECT id,name,room,class FROM student WHERE ID=${i} AND PASSWORD="${p}"`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 老师登录-login
    loginTeacher(i, p) {
        let sqls = `SELECT id,name FROM teacher WHERE ID=${i} AND PASSWORD="${p}"`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 查找老师-leave
    queryTeacher() {
        let sqls = `SELECT id,name FROM teacher`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 申请请假-leave
    toLeave(id, tId, type, time, reason) {
        let sqls = `INSERT INTO leaves (s_id, t_id, time, reason, type, state) VALUES ('${id}', '${tId}', '${time}', '${reason}', '${type}', '0')`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 老师查看待审批-leave
    lookLeave(id) {
        let sqls = `SELECT id,type FROM leaves WHERE t_id='${id}' AND state='0'`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 查看请假详情-details
    queryLeaveDetails(id) {
        let sqls = `SELECT * FROM leaves WHERE id='${id}'`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 查找学生信息-details
    queryStudent(id) {
        let sqls = `SELECT id,name,room,class FROM student WHERE ID='${id}'`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 批改请假状态-details
    changeLeaveState(id, state) {
        let sqls = `UPDATE leaves SET state='${state}' WHERE id='${id}'`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 学生查找请假表-recording
    sQueryLeave(id) {
        let sqls = `SELECT id,time,state,type FROM leaves WHERE s_id='${id}'`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }

    // 老师查找已查看过请假表-rexording
    tQueryLeave(id) {
        let sqls = `SELECT id,time,state,type FROM leaves WHERE t_id='${id}' AND state!='0'`;
        return new Promise((resolve, reject) => {
            pool.query(sqls, function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }
}

module.exports = new Mysql();
