import * as express from 'express'
const sha256:any = require('sha256')

const router: any = express.Router();

import { UsersModel } from '../../models'

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = await UsersModel.findAll ({raw: true})
    res.render('admin/users/index',{data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    res.render('admin/users/add', {})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.pass = sha256(req.body.pass)

    await UsersModel.create(req.body)
    const data = await UsersModel.findAll( { raw: true } )

    res.render('admin/users/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/edit/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    const data = await UsersModel.findOne( { where: {
      id: req.params.id
    }, raw: true})

    res.render('admin/users/edit', { data } )
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/edit', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.pass = sha256(req.body.pass)

    await UsersModel.update( req.body, {where: {id: req.body.id } } )
    const data = await UsersModel.findAll( { raw: true } )
    res.render('admin/users/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/delete', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await UsersModel.destroy ( {where: {id: req.body.id } } )
    const data = await UsersModel.findAll( { raw: true } )
    res.render('admin/users/index', {data})

  }catch(error){
    res.status(500).json( error );
  }

})
export { router as usersRoutes }
