'use strict';

var cheerio = require('cheerio');

var $ = cheerio.load('<div><a></a><a></a><span></span></div>');

console.log($('div').find('a').length);


/**


 尊敬的漫画人用户，应《一拳超人》版权方的要求，现已删除清理《一拳超人》漫画的所有册及内容的链接和地址，请喜欢这部漫画的漫友购买书籍或杂志欣赏！为此给各位漫友带来的不便，敬请谅解！感谢您们多年来的支持和厚爱！

 中有部份或全部章节数据缺少，导致情节不连续影响您正常观看，我们将对 无法入眠的公主漫画 进行屏蔽处理，给您带来不便，敬请谅解！

 已被列为限制漫画，其中有部份章节可能含有暴力、血腥、色情或不当的语言等内容，不适合未成年观众，为保护未成年人，我们将对 barbarities漫画 进行屏蔽。如果你法定年龄已超过18岁，请点击此处继续阅读！

 */