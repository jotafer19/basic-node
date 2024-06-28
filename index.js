const http = require("http")
const fs = require("fs")
const { URL } = require("url")

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html")
    
    const url = new URL(req.url, `http://${req.headers.host}`)
    
    let path = "./pages/"
    switch (url.pathname) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/contact":
            path += "contact.html";
            res.statusCode = 200;
            break;
        case "/contact-me":
            res.statusCode = 301;
            res.setHeader("Location", "/contact");
            res.end();
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }
    
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
})

server.listen(8080)