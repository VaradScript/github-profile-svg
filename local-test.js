const http = require('http');
const url = require('url');
const handler = require('./api/trophies');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    req.query = parsedUrl.query;

    // Polyfill res.status and res.send for the Vercel handler
    res.status = (code) => {
        res.statusCode = code;
        return res;
    };
    res.send = (body) => {
        res.end(body);
        return res;
    };

    try {
        await handler(req, res);
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/?username=octocat&mode=unreal`);
});
