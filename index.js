const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
module.exports = {
    GetHref(url) {
        const books = [];
        const arr = [];
        const arr_cate = [];
        const book = { name: "", description: "", image: "", author: "", category: arr_cate, country: [], chapters: arr }
        request(url, (error, response, html) => {

            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(html);

                $('.novel-header').each((index, el) => {
                    book.image = $(el).find('.glass-background img').attr("src");
                });

                $('.novel-info').each((index, el) => {
                    book.name = $(el).find('h1').html();
                    book.author = $(el).find('.author a span').html();
                    const temp = $(el).find('.categories ul li').text();
                    arr_cate.push({
                        name: temp,
                    })
                });

                $('#info').each((index, el) => {
                    temp = $(el).find('.summary').html();
                    book.description = temp.replace('\n<div class=\"expand\">\n<a class=\"expand-btn\"><i class=\"icon-right-open\"></i> <span>Xem thêm</span></a>\n</div>\n</div>\n', '')
                        //book.description = $(el).find('.summary').html();

                });

                $('.chapter-list li').each((index, el) => {
                    const chapter_title = $(el).find('.chapter-title').html();
                    const href_chapter = $(el).find('a').attr("href");
                    arr.push({
                        name: chapter_title,
                        href_chapter: href_chapter,
                    });
                });
                books.push(book);
                fs.writeFileSync('data1.json', JSON.stringify(books));
            } else {
                console.log(error);
            }
        });
    },

    delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}