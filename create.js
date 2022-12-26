const fs = require('fs');

module.exports = {
    GetOneBook() {
        const data1 = fs.readFileSync('./data1.json');
        const dataJson1 = JSON.parse(data1);

        const data2 = fs.readFileSync('./data2.json');
        const dataJson2 = JSON.parse(data2);
        const arr = [];

        const arr_content = [];
        const temp = { name: "", description: "", image: "", author: "", category: [], country: [], chapters: arr_content }

        temp.name = dataJson1[0].name;
        temp.description = dataJson1[0].description;
        temp.image = dataJson1[0].image;
        temp.author = dataJson1[0].author;
        temp.category = dataJson1[0].category;
        temp.country = dataJson1[0].country;

        for (let i = 0; i < dataJson1[0].chapters.length; i++) {
            for (let j = 0; j < dataJson2.length; j++) {
                if (dataJson2[j].href === dataJson1[0].chapters[i].href_chapter) {
                    arr_content.push({
                        name: dataJson1[0].chapters[i].name,
                        content: dataJson2[j].content,
                    });
                }
            }
        }
        temp.chapters = arr_content;
        fs.writeFileSync('data3.json', JSON.stringify(temp));
    }
}