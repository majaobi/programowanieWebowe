const  http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const fs = require('fs').promises

const server = http.createServer(async(Req,res)=> {
    try{
        const data = await fs.readFile('zad2.html')
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
    }
    catch(err){
        res.statusCode = 500
        res.setHeader('Content-Type', 'text/plain')
        res.end('Wystąpił Błąd podczas odczytu pliku'+ '\n'+err)
        return
    }
    
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})