"use strict";

const express = require('express');
const path = require('path');
const httpsRedirect = require('express-https-redirect');
const compression = require('compression');
const serveStatic = require('serve-static');

const app = new express();

app.use('/', httpsRedirect(true));
app.use(compression());

app.use(serveStatic(path.join(__dirname, 'build'), {
    maxAge: '3600000',
    setHeaders: function (res, path) {
        if (serveStatic.mime.lookup(path) === 'text/html') {
            // Custom Cache-Control for HTML files
            res.setHeader('Cache-Control', 'max-age=0,no-cache,no-store,must-revalidate');
        }
    }
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} ${env}`);
});
