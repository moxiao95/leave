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
    queryStudent() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from student', function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }
    // 找老师表
    queryTeacher() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from teacher', function (error, results) {
                if (error) {
                    console.log(error);
                    return;
                };
                resolve(results);
            });
        });
    }
    // 找请假表
    queryLeave() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from `leave`', function (error, results) {
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
