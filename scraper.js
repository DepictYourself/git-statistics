const request = require('request');
const cheerio = require('cheerio');

const gitstaturl = 'http://users.nik.uni-obuda.hu/gitstats/';

exports.getTestFiles = function getTestFiles(){
    request(gitstaturl, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
    
            const tests = $('a').filter((i, el) => {
                return $(el).attr('href').includes('test');
            });
    
            let testFileObjs = [];
    
            tests.each((i, el) => {
                testFileObjs.push({
                    file: $(el).text(),
                    url: gitstaturl + $(el).attr('href'),
                })
            })
    
            return testFileObjs;
        }
    });
}

