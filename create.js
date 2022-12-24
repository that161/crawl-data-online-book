const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request-promise');

const data1 = fs.readFileSync('./data1.json');
const dataJson1 = JSON.parse(data1);

const data2 = fs.readFileSync('./data2.json');
const dataJson2 = JSON.parse(data2);
const arr = [];

const arr_content = [];
const temp = { name: "", author: "", category: "", description: "", chapter: arr_content }

temp.name = dataJson1[0].name;
temp.author = dataJson1[0].author;
temp.category = dataJson1[0].category;
temp.description = dataJson1[0].description;

for (let i = 0; i < dataJson1[0].chapter.length; i++) {
    for (let j = 0; j < dataJson2.length; j++) {
        if (dataJson2[j].href === dataJson1[0].chapter[i].href_chapter) {
            arr_content.push({
                chapter_title: dataJson1[0].chapter[i].chapter_title,
                content: dataJson2[j].content,
            });
        }
    }
}

temp.chapter = arr_content;

fs.writeFileSync('data3.json', JSON.stringify(temp));

// const arr_content = [];
// for (const item of arr) {
//     request(item, (error, response, html) => {
//         if (!error && response.statusCode == 200) {
//             const $ = cheerio.load(html);
//             $('#chapter-container').each((index, el) => {
//                 const content = $(el).find('.box-detail').html();
//                 arr_content.push({
//                     href: item,
//                     content: content,
//                 })
//             });
//             fs.writeFileSync('data2.json', JSON.stringify(arr_content));
//         } else {
//             console.log(error);
//         }
//     });
// }