import { Router, Request, Response } from 'express'
import { fakeProducts } from '../controllers/testController'
import { isAuth, apiAuth } from '../middleware/auth'

const router = Router()

// VISTAS WEB
router.get('/login', (req: Request, res: Response) => {
  // @ts-ignore
  if (req.session.nombre) {
    res.redirect('/')
  } else {
    res.render('login.pug')
  }
})
router.get('/', isAuth, (req:Request, res:Response) => {
  // @ts-ignore
  console.log(req.session.nombre)
  // @ts-ignore
  res.render('products.pug', { nombre: req.session.nombre })
})

router.get('/test', (req:Request, res:Response) => {
  res.render('test.pug')
})

// API
router.get('/api/productos-test', apiAuth, (req:Request, res:Response) => {
  const result = fakeProducts()
  res.json(result)
})

router.post('/api/login', (req:Request, res:Response) => {
  // @ts-ignore
  req.session.nombre = req.body.nombre
  // @ts-ignore
  console.log(req.session)
  res.redirect('/')
})

router.get('/api/logout', apiAuth, (req, res) => {
  // @ts-ignore
  const nombre = req.session?.nombre
  if (nombre) {
    req.session.destroy(err => {
      if (!err) {
        res.render('logout.pug', { nombre })
      } else {
        res.redirect('/')
      }
    })
  } else {
    res.redirect('/')
  }
})

export default router
