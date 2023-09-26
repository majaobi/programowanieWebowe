const  http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((Req,res)=> {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Jetes tylko suma swoich suplementow')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})