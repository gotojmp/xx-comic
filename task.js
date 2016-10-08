'use strict';

var Crawler = require('node-webcrawler');
// var request = require('request');
// var striptags = require('striptags');
// var redis = require('redis');
var log4js = require('log4js');
var unpack = require('./unpack');
var models = require('./models');
var DB = require('./db');
var starter = require('./starter');

log4js.configure("./log4js.json");
var log = log4js.getLogger('main');

var Book = models.book;
var Chapter = models.chapter;
var Page = models.page;

module.exports = {
    book: () => {
        setTimeout(() => {
            for (var i = 1; i <= 295; ++i) starter.book.book(i);
        }, 5000);
    },
    chapter: () => {
        Book.findAll({
            where: {
                created_at: {
                    $eq: DB.col('updated_at')
                }
            },
            // order: [
            //     ['id', 'ASC']
            // ],
            // offset: 0,
            limit: 10000
        }).then(books => {
            books.forEach(book => {
                starter.book.chapter(book);
            });
        }).catch(err => {
            log.info('***find error:', err);
        });
    },
    page: () => {
        Chapter.findAll({
            where: {
                created_at: {
                    $eq: DB.col('updated_at')
                }
            },
            // order: [
            //     ['id', 'ASC']
            // ],
            // offset: 0,
            limit: 1
        }).then(chapters => {
            chapters.forEach(chapter => {
                starter.book.page(chapter);
            });
        }).catch(err => {
            log.info('***find error:', err);
        });
    }
};
