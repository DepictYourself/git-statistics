const request = require('request');
const cheerio = require('cheerio');

const gitstaturl = 'http://users.nik.uni-obuda.hu/gitstats/';

request(gitstaturl, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const tests = $('a').filter((i, el) => {
            return $(el).attr('href').includes('test');
        });

        tests.each((i, el) => {
            console.log($(el).text());
        })
    }
});