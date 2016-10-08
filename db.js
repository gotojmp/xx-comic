'use strict';

var Sequelize = require('sequelize');

var config = {
    host     : 'localhost',
    user     : 'xc_user',
    password : 'xc_pass',
    database : 'comic',
    protocol : 'mysql',
    port     : '3306',
    query    : {pool: true}
};

module.exports = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.protocol,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    logging: null,
    timezone: '+08:00',
    define: {
        timestamps: true,
        underscored: true,
        paranoid: true,
        freezeTableName: true,
        constraints: false
    }
});
