let PORT = process.env.PORT || 3000;

const request = require('request');
const cheerio = require('cheerio');
var tsv = require('tsv');
const fetch = require('node-fetch');
const express = require('express');

const app = express();

const gitstaturl = 'http://users.nik.uni-obuda.hu/gitstats/';

let cachedTestFile;
let isCached = false;

app.use(express.static(__dirname + "/view"));
app.get('/', (req, res) => {
    if (!isEmpty(req.query)) {
        //TODO: How the fuck do I do this ?
    } else {
        //res.sendFile(__dirname + "/view/index.html");
    }
    
});

app.get('/gitstat', (req, res) => {
    
    // set header
    res.header("Access-Control-Allow-Origin", "*");
    
    // we check the gitstat website.
    // for the available test files.
    request(gitstaturl, (error, response, html) => {
        
        if (!error && response.statusCode == 200) {
            // we are using cheerio to handle the website elements.
            const $ = cheerio.load(html);
            
            // get all a tags and filter the tests
            const tests = $('a').filter((i, el) => {
                // if the element's link which is a filename.
                // begins with tests_ and ends with .tsv
                if ($(el).attr('href').search("tests_.*\.tsv") !== -1)
                {
                    return true;
                }
                return false;
            });
            
            // select the last node.
            const lastTestFile = $(tests).last();
            
            // craft an object
            const lastTestFileObj = {
                name: $(lastTestFile).text(),
                url: gitstaturl + $(lastTestFile).attr('href'),
            }
            
            // Cache system
            if (isCached) {
                if(cachedTestFile.name !== lastTestFileObj.name){
                    // Cache expired
                    fetch(lastTestFileObj.url)
                    .then(res => res.text())
                    .then(text => {
                        let parsed = tsv.parse(text);
                        // tsv.parse created empty object inbetween actual objects with real data
                        // so i just remove them with filter.
                        parsed = parsed.filter((el, i) => i % 2 == 1);
                        //
                        cachedTestFile = {
                            name: lastTestFileObj.name,
                            url: lastTestFileObj.url,
                            data: parsed,
                        }
                        res.send(JSON.stringify(parsed));
                    });
                }else{
                    // Serving cached
                    res.send(JSON.stringify(cachedTestFile.data));
                }
            } else {
                // No Cached data
                fetch(lastTestFileObj.url)
                .then(res => res.text())
                .then(text => {
                    let parsed = tsv.parse(text);
                    // tsv.parse created empty object inbetween actual objects with real data
                    // so i just remove them with filter.
                    parsed = parsed.filter((el, i) => i % 2 == 1);
                    cachedTestFile = {
                        name: $(lastTestFile).text(),
                        url: gitstaturl + $(lastTestFile).attr('href'),
                        data: parsed,
                    }
                    isCached = true;
                    res.send(JSON.stringify(parsed));
                })
            }
        }
    });
});

app.listen(PORT, () => console.log('Listening on port: ' + PORT));

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}