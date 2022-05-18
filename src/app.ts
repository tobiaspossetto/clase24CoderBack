import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import routes from './routes/routes'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(session({
  // store: MongoStore.create({ mongoUrl: config.mongoLocal.cnxStr }),
  store: MongoStore.create({ mongoUrl: `mongodb+srv://tobias:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.ulmpx.mongodb.net/ecommerce?retryWrites=true&w=majority`, ttl: 60 }),
  secret: 'iosadyh23bu',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000
  }
}))
app.set('views', './src/views')
app.set('view engine', 'pug')

app.use(routes)

// app.listen(app.get('port'));
// console.log('Server on port ', app.get('port'));

export default app
