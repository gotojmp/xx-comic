'use strict';

var log4js = require('log4js');
var unpack = require('./unpack');
var saver = require('./saver');

log4js.configure("./log4js.json");
var log = log4js.getLogger('main');

module.exports = {
    cat: (err, res, $) => {
        if (err) {
            return console.log(err);
        }
        if (res && res.statusCode == '200' && $) {
        }
    },
    book: {
        book: (page, err, res, $) => {
            if (err) {
                return console.log('get book list error at page', page, err);
            }
            if (res && res.statusCode == '200' && $) {
                $('table tr').each(function () {
                    var a = $('a', this);
                    var url = a.attr('href'), title = a.attr('title').trim();
                    if (url && url.indexOf('/manhua') === 0 && title) {
                        url = 'http://www.dm5.com' + url;
                        saver.book.book(url, title);
                    }
                });
            }
        },
        chapter: (book, err, res, $) => {
            if (err) {
                return console.log(err);
            }
            if (res && res.statusCode == '200' && $) {
                if (book.url.indexOf('dm5.com') > -1) {
                    var info = $('#mhinfo');
                    var chapter = $('#tempc');
                    var span = info.find('span');
                    var author = span
                            .filter((i, el) => $(el).html().indexOf('漫画作者：') > -1)
                            .children('a')
                            .map((i, el) => $(el).html())
                            .get()
                            .join(',').trim() || '';
                    var cat = span
                            .filter((i, el) => $(el).html().indexOf('漫画类型：') > -1)
                            .children('a')
                            .html().trim() || '';
                    var area = span
                        .filter((i, el) => $(el).html().indexOf('漫画地区：') > -1)
                        .children('a')
                        .html().trim();
                    var finished = span
                            .filter((i, el) => $(el).html().indexOf('漫画状态：') > -1)
                            .html().indexOf('已完结') > -1;
                    var desc = info
                        .find('h3')
                        .filter((i, el) => $(el).html().indexOf('漫画简介') > -1)
                        .parent('b')
                        .next('p');
                    if (desc) {
                        desc.find('a').remove();
                        var more = desc.find('span');
                        if (more.length && more.css('display') == 'none') {
                            more.html(more.html().substr(1));
                        }
                        desc = desc.text().trim();
                    } else {
                        desc = '';
                    }
                    var cover = info.find('img').attr('src');
                    var chapterList = chapter
                        .find('ul')
                        .filter((i, el) => $(el).attr('id') && $(el).attr('id').indexOf('cbc_') > -1)
                        .find('a.tg');
                    var tmpUrls = {};
                    var chapters = [];
                    chapterList.each((i, el) => {
                        var url = $(el).attr('href');
                        var title = $(el).attr('title').replace(book.name, '').trim();
                        if (!tmpUrls[url]) {
                            chapters.push({
                                url: 'http://m.dm5.com' + url,
                                name: title
                            });
                            tmpUrls[url] = 1;
                        }
                    });
                } else if (book.url.indexOf('1kkk.com') > -1) {
                }
                if (area && cover) {
                    book.update({author, cat, area, cover, desc, finished});
                } else {
                    log.info('***get info error', book.id, book.name);
                }
                if (chapters.length > 0) {
                    chapters.reverse();
                    chapters.forEach((c, i) => {
                        c.sn = i * 10 + 1;
                        saver.book.chapter(book, c);
                    });
                } else {
                    log.info('***get chapter error, empty', book.id, book.name);
                }
            }
        },
        page: (chapter, err, res, $) => {
            if (err) {
                return console.log(err);
            }
            if (res && res.statusCode == '200' && $) {
                if ($.html().indexOf('版权方的要求，现已删除清理') > -1) {
                }
                $('script').each(function () {
                    var js = $(this).html();
                    if (js.indexOf('eval(') > -1) {
                        js = unpack(js);
                        console.log(js);
                        if (js.indexOf('newImgs') > -1) {
                            var newImgs;
                            if (js.indexOf('var newImgs=[') === 0) {
                                eval(js);
                                console.log(newImgs);
                            }
                        }
                    }
                });
            }
        },
        download: (err, res, $) => {
            if (err) {
                return console.log(err);
            }
            if (res && res.statusCode == '200' && $) {
            }
        }
    }
};
