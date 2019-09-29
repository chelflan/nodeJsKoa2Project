const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');

const catchError = require('./middlewares/exception')

var app = new Koa()//实例化框架

app.use(cors())
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3000)
