import * as express from 'express'
const sha256:any = require('sha256')

const router: any = express.Router();

import { newsRoutes } from './news'
import { collectionsRoutes } from './collections'
import { vistavkaRoutes } from './vistavka'
import { usersRoutes } from './users'
import { filesManagerRoutes } from './filesManager'
import { collectionsContentRoutes } from './collectionsContent'
import { vistavkaContentRoutes } from './vistavkaContent'

import { UsersModel } from '../../models'

let currentUser: any

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    res.render('admin/login', { })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

router.post('/login', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const user = await UsersModel.findOne({where:{
      email: req.body.email,
      pass: sha256(req.body.pass)
    }, raw:true})
    console.log(user)
    currentUser = user

    const error = 'Неверный логин или пароль'

    if (user != null) {
      res.cookie('a', true)
      res.render('admin/index', {})
    } else {
      res.render('admin/login', { error })
    }

  }catch(error){
    res.status(500).json( error );
  }
})

router.get('/logout', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    res.cookie('a', false)
    res.render('admin/login', {})
  }catch(error){
    res.status(500).json( error );
  }
})

router.use( async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.locals.currentUser = currentUser
  if (req.cookies.a == 'false' || req.cookies.a == null){
    res.render('admin/login', {})
  } else {
    next()
  }
})

router.get('/index', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    res.render('admin/index')
  }catch(error){
    res.status(500).json( error );
  }
})

router.use( '/news', newsRoutes );
router.use( '/collections', collectionsRoutes );
router.use( '/vistavka', vistavkaRoutes );
router.use( '/users', usersRoutes );
router.use( '/filesManager', filesManagerRoutes );
router.use( '/collectionsContent', collectionsContentRoutes)
router.use( '/vistavkaContent', vistavkaContentRoutes)

export { router as AdminRoutes }
