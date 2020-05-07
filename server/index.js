const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

// Import and Set Nuxt.js options
app.use(express.json())
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
app.post('/link', function(req, res) {
  readFile(process.cwd() + '/assets/link.json').then(data => {
    var json = JSON.parse(data.toString())
    json[Object.keys(req.body)] = Object.values(req.body)[0]
    fs.writeFile(
      process.cwd() + '/assets/link.json',
      JSON.stringify(json),
      function(err) {}
    )
    return res.send(json)
  })
})

app.post('/get', function(req, res) {
  readFile(process.cwd() + '/assets/link.json').then(data => {
    return res.send(data.toString())
  })
})
app.post('/name', function(req, res) {
  readFile(process.cwd() + '/assets/link.json').then(data => {
    let json = JSON.parse(data.toString())
    return res.send({ link: json[req.body['name']] })
  })
})
async function start() {
  const nuxt = new Nuxt(config)
  // Init Nuxt.js

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
