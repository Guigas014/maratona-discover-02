const express = require("express")
const routes = require('./routes')
const path = require("path")

const server = express()

//usando template engine
server.set('view engine', 'ejs')

// mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//pasta public - habilitar arquivos statics
server.use(express.static("public"))

//Usar o req.body
server.use(express.urlencoded({ extended: true  }))

//routes
server.use(routes)


server.listen(3000, () => console.log('Rodando!!'))

