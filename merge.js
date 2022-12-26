const GetHref = require('./index');
const GetContent = require('./content');
const GetOneBook = require('./create');
const fs = require('fs');

async function run() {
    const data = fs.readFileSync('./link.json');
    const dataJson = JSON.parse(data);
    const arr = [];
    for (let i = 0; i < dataJson.length; i++) {
        arr.push(dataJson[i]);
    }
    let arr_book = [];

    for (const item of arr) {
        GetHref.GetHref(item);
        await Promise.all([delay(1000), delay(1000)]);
        GetContent.GetContent();
        await Promise.all([delay(1000), delay(1000)]);
        GetOneBook.GetOneBook();
        await Promise.all([delay(1000), delay(1000)]);
        const book = fs.readFileSync('./data3.json');
        const bookJson = JSON.parse(book);
        arr_book.push(bookJson);
    }
    fs.writeFileSync('data.json', JSON.stringify(arr_book));
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

run();