import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => {
    res.sendFile('./public/index.html', { root: __dirname + '/' });
});

app.get('/projection', (_req, res) => {
    res.sendFile('./public/projection.html', { root: __dirname + '/' });
});

app.get('/favicon.ico', (_req, res) => {
    res.sendFile('./public/favicon.ico', { root: __dirname + '/' });
});

app.get('/app.js', (_req, res) => {
    res.sendFile('./public/app.js', { root: __dirname + '/' });
});

app.get('*.(jpg|mp4|webm|mp3|svg)', (req, res) => {
    res.sendFile('./public/' + req.url, {
        root: __dirname + '/',
    });
});

app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
