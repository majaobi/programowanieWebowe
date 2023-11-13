const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  if (pathname == '/') {

    if (req.method == 'GET') {

      const indexHtmlPath = path.join(__dirname, 'index.html');
      fs.readFile(indexHtmlPath, 'utf8', (err, data) => {

        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Błąd odczytu pliku HTML');
        } 
        else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }

      });
    } 
    else {

      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Metoda niedozwolona');

    }
  } 
  else if (pathname == '/kontakt') {

    if (req.method == 'POST') {


    } 
    else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Metoda niedozwolona');
    }
  } 
  else if (pathname === '/dziekujemy') {

    if (req.method === 'GET') {

      const thankyouHtmlPath = path.join(__dirname, 'thank-you-page.html');
      fs.readFile(thankyouHtmlPath, 'utf8', (err, data) => {

        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Błąd odczytu pliku HTML');
        } 
        else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(data);
        }
      });
    } 
    else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Metoda niedozwolona');
    }
  } 
  else {
    // Obsługa nieistniejących ścieżek
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Nie znaleziono strony' }));
  }
});

server.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});