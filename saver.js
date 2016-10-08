'use strict';

var log4js = require('log4js');
var DB = require('./db');
var models = require('./models');

log4js.configure("./log4js.json");
var log = log4js.getLogger('main');

var Book = models.book;
var Chapter = models.chapter;
var Page = models.page;

module.exports = {
    book: {
        book: (url, title) => {
            console.log('get one book', title);
            Book.create({
                name: title,
                url: url
            }).then(book => {
                // console.log('book saved ok');
            }).catch(err => {
                log.info('***save book error:', url, title);
                // console.log('save book error', err);
            });
        },
        chapter: (book, chapter) => {
            console.log('get one chapter', book.name, chapter.name);
            book.createChapter(chapter).then(book => {
                // console.log('chapter saved ok');
            }).catch(err => {
                log.info('***save chapter error:', book.name, chapter.name);
                // console.log('save chapter error', err);
            });
        },
        page: (chapter, page) => {
            console.log('get one page', chapter.id, chapter.name);
            chapter.createPage(page).then(page => {
                // console.log('page saved ok');
            }).catch(err => {
                log.info('***save page error:', chapter.id, chapter.name, chapter.book_id);
                // console.log('save page error', err);
            });
        }
    }
};
