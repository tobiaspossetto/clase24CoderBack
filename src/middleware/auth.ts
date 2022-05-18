import { Request, Response, NextFunction } from 'express'
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.session.nombre) {
    console.log('ESTA LOGUEADO')
    next()
  } else {
    console.log('NO ESTA LOGUEADO')
    res.redirect('/login')
  }
}

export function apiAuth (req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.session.nombre) {
    next()
  } else {
    res.status(401).json({ error: 'no autorizado!' })
  }
}
