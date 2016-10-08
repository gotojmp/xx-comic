'use strict';

var Sequelize = require('sequelize');
var DB = require('./db');

var Cat = DB.define('cat', {
    id: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING(20), allowNull: false, defaultValue: ''}
}, {
    timestamps: false
});
var Book = DB.define('book', {
    id: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING(50), allowNull: false, defaultValue: ''},
    author: {type: Sequelize.STRING(100), allowNull: false, defaultValue: ''},
    cat: {type: Sequelize.STRING(50), allowNull: false, defaultValue: ''},
    area: {type: Sequelize.STRING(50), allowNull: false, defaultValue: ''},
    cover: {type: Sequelize.STRING(100), allowNull: false, defaultValue: ''},
    desc: {type: Sequelize.TEXT, allowNull: false, defaultValue: ''},
    url: {type: Sequelize.STRING(100), allowNull: false, defaultValue: ''},
    finished: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
}, {
    indexes: [{
        unique: false,
        fields: ['name']
    }, {
        unique: true,
        fields: ['url']
    }]
});
var Chapter = DB.define('chapter', {
    id: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    sn: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1},
    num: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1},
    name: {type: Sequelize.STRING(50), allowNull: false, defaultValue: ''},
    title: {type: Sequelize.STRING(100), allowNull: false, defaultValue: ''},
    url: {type: Sequelize.STRING(100), allowNull: false, defaultValue: ''}
}, {
    indexes: [{
        unique: true,
        fields: ['url']
    }, {
        unique: false,
        fields: ['book_id']
    }]
});
var Page = DB.define('page', {
    id: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, primaryKey: true, autoIncrement: true},
    num: {type: Sequelize.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1},
    img: {type: Sequelize.STRING(100), allowNull: false, defaultValue: ''},
    url: {type: Sequelize.STRING(100), allowNull: false, defaultValue: ''}
}, {
    indexes: [{
        unique: true,
        fields: ['url']
    }, {
        unique: false,
        fields: ['chapter_id']
    }]
});
Book.hasMany(Chapter);
Chapter.hasMany(Page);

// DB.sync().then(() => console.log('sync ok')).catch(err => console.log(err));

/**
 * @type {object}
 * @property {object} cat
 * @property {object} book
 * @property {object} chapter
 * @property {object} page
 */
module.exports = DB.models;
