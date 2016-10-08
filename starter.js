'use strict';

var Crawler = require('node-webcrawler');
var handler = require('./handler');

var c = new Crawler({
    // debug: true,
    // logger: console,
    maxConnections: 20,
    timeout: 15000,
    retries: 2,
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    retryTimeout: 3000,
    forceUTF8: true,
    rateLimits: 2000,
    callback: function (err, res, $) { }
});

module.exports = {
    book: {
        book: page => {
            c.queue({
                uri: 'http://www.dm5.com/manhua-list-lm3-s4-size60-p' + page + '/',
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
                retries: 10,
                rateLimits: 900,
                callback: handler.book.book.bind(null, page)
            });
        },
        chapter: book => {
            c.queue({
                uri: book.url,
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
                cookie: 'isAdult=1;',
                retries: 10,
                rateLimits: 900,
                callback: handler.book.chapter.bind(null, book)
            });
        },
        page: chapter => {
            c.queue({
                uri: chapter.url,
                cookie: 'isAdult=1;',
                retries: 10,
                rateLimits: 900,
                callback: handler.book.page.bind(null, chapter)
            });
        }
    }
};
