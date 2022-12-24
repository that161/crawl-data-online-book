const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');

const data = fs.readFileSync('./data1.json');
const dataJson = JSON.parse(data);
const arr = [];
for (let i = 0; i < dataJson[0].chapter.length; i++) {
    arr.push(dataJson[0].chapter[i].href_chapter);
}

const arr_content = [];
for (const item of arr) {
    request(item, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            $('#chapter-container').each((index, el) => {
                const content = $(el).find('.box-detail').html();
                arr_content.push({
                    href: item,
                    content: content,
                })
            });
            fs.writeFileSync('data2.json', JSON.stringify(arr_content));
        } else {
            console.log(error);
        }
    });
}