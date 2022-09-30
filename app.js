const http = require('http');
const fs = require('fs');
const url = require('url');
const EventEmitter = require('events');

const port = 3000;

// creating local server - http module
http.createServer((req, res) => {
    const link = url.parse(req.url).pathname;
    console.log(link);

    if (link === '/') {
        res.end('Nothing here, you could route /index.html or /about.txt or /buffer.html');
    } else if (link === '/index.html') {
        try {
            res.writeHead(200, { 'content-type': 'text/html' });
            fs.readFile(link.substring(1), (error, data) => {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: file note fould');
                } else {
                    // events module
                    const emitter = new EventEmitter();
                    emitter.on('write', () => {
                        res.write(data);
                    });
                    emitter.emit('write');
                }
                res.end();
            });
        } catch (error) {
            console.log(error);
            res.end();
        }
    } else if (link === '/about.txt') {
        try {
            const streamFile = fs.createReadStream(link.substring(1));
            // streamFile.pipe(res);
            const textStore = [];
            streamFile.on('data', (chunk) => {
                textStore.push(chunk);
                // res.writeHead(200, { 'content-type': 'text/html' });
                // res.writeHead(200, { 'content-type': 'text' });
                // res.write(chunk);
                // console.log(chunk.toString());
            });
            streamFile.on('end', () => {
                const parseText = Buffer.concat(textStore);
                // console.log(parseText);
                res.write(parseText);
                res.end();
            });
            streamFile.on('error', (error) => {
                res.writeHead(404);
                console.log(error);
                res.end('404 file not found');
            });
        } catch (error) {
            console.log(error);
            res.end();
        }
    } else if (link === '/buffer.html') {
        try {
            res.writeHead(200, { 'content-type': 'text/html' });
            fs.readFile(link.substring(1), (error, data) => {
                if (error) {
                    res.writeHead(404);
                    res.write('Error: file note fould');
                } else {
                    // events module
                    const emitter = new EventEmitter();
                    emitter.on('write', () => {
                        res.write(data);
                    });
                    emitter.emit('write');
                }
                res.end();
            });
        } catch (error) {
            console.log(error);
            res.end();
        }
    } else if (link === '/executed' && req.method === 'POST') {
        try {
            const textStore = [];
            req.on('data', (chunk) => {
                textStore.push(chunk);
                // res.writeHead(200, { 'content-type': 'text/html' });
                // res.writeHead(200, { 'content-type': 'text' });
                // res.write(chunk);
                // console.log(chunk.toString());
            });
            req.on('end', () => {
                const parseText = Buffer.concat(textStore).toString();
                // console.log(parseText);
                res.write(parseText.substring(8));
                res.end();
            });
        } catch (error) {
            console.log(error);
            res.end();
        }
    } else {
        try {
            res.end('404 page not found');
        } catch (error) {
            console.log(error);
            res.end();
        }
    }
}).listen(port);

// URL extra practise
/* const customizedLink = 'http://localhost:3000/user/robin10254?country=Bangladesh&city=Dhaka#10254';

const perseURL = url.parse(customizedLink, true);

console.log(perseURL.host);
console.log(perseURL.pathname);
console.log(perseURL.search);
console.log(perseURL.hash);

console.log(perseURL.pathname.substring(6));

const queryURL = perseURL.query;
console.log(queryURL);
console.log(queryURL.country);
console.log(queryURL.city);
*/
