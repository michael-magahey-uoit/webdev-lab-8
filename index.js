const express = require("express");
var fs = require('fs');
const http = require('http');
const app = express();
const apiKey = "b1f5a67a";

app.get("/", (request, response) => {
    fs.readFile('index.html', function(err, file) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        http.get(`http://www.omdbapi.com/?i=tt0059113&apikey=${apiKey}`, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                let movie = JSON.parse(data);
                response.write(file.toString().replace("#title", movie['Title'])
                    .replace("#year", movie['Year'])
                    .replace("#genre", movie['Genre'])
                    .replace("#runtime", movie['Runtime'])
                    .replace("#director", movie['Director'])
                    .replace("#writer", movie['Writer'])
                    .replace("#actors", movie['Actors'])
                    .replace("#plot", movie['Plot'])
                    .replace("#rating", movie['Ratings'][0]['Value'])
                    .replace("#poster", movie['Poster']));
                return response.end();
            });
        }).on('error', (err) => {
            response.write(err);
            return response.end();
        });
    });
});

app.listen(8080, "127.0.0.1", function() { 
    console.log(`Server Hosted on 127.0.0.1 @ 8080...`);
});

