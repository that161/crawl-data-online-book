const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');
const url = "https://docsachhay.net/sach/dam-that-bai-3545";

const books = [];
const arr = [];
const book = { name: "", author: "", category: "", description: "", chapter: arr }
request(url, (error, response, html) => {

    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        // $('.fixed-img').each((index, el) => {
        //     const img = $(el).find('.cover img').img;
        //     console.log(img);
        // });

        $('.novel-info').each((index, el) => {
            book.name = $(el).find('h1').html();
            book.author = $(el).find('.author a span').html();
            book.category = $(el).find('.categories ul li').text();
        });

        $('#info').each((index, el) => {
            book.description = $(el).find('.summary').html();
        });

        $('.chapter-list li').each((index, el) => {
            const chapter_title = $(el).find('.chapter-title').html();
            const href_chapter = $(el).find('a').attr("href");
            arr.push({
                chapter_title: chapter_title,
                href_chapter: href_chapter,
            });
        });
        book.chapter = arr;
        books.push(book);
        fs.writeFileSync('data1.json', JSON.stringify(books));
    } else {
        console.log(error);
    }
});