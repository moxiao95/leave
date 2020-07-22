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
    // 找学生表
    queryStudent(i, p) {
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
    // 找老师表
    queryTeacher(i, p) {
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
    // 学生查找请假表
    sQueryLeave() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from leaves', function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }
    // 老师查找请假表
    tQueryLeave() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from leaves', function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }
    // 
    async queryStudentLogin() {
        
    }
}

module.exports = new Mysql();
