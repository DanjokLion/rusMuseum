import * as express from 'express'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import fs from 'fs'
const router: any = express.Router();

import { NewsModel, UsersModel } from '../../models'

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = await NewsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      order: [
        ["id", "DESC"]
      ],
      raw: true
    })
    res.render('admin/news/index',{data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    res.render('admin/news/add', {})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    if (req.files) {
      const img: any = req.files.img;

      req.body.img = img.name
      img.mv(process.cwd() + '/public/uploads/news/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      });
    }
    req.body.link = new cyrillicToTranslit().transform(req.body.title, "_")

    await NewsModel.create(req.body)

    const data = await NewsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      order: [
        ["id", "DESC"]
      ],
      raw: true
    })

    res.render('admin/news/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/edit/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    const data = await NewsModel.findOne( { where: {
      id: req.params.id
    }, raw: true})

    res.render('admin/news/edit', { data } )
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/edit', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    if (req.files) {
      const img: any = req.files.img;

      req.body.img = img.name
      img.mv(process.cwd() + '/public/uploads/news/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      });
    }
    await NewsModel.update( req.body, {where: {id: req.body.id } } )

    const data = await NewsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      order: [
        ["id", "DESC"]
      ],
      raw: true
    })

    res.render('admin/news/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/delete', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const item = await NewsModel.findOne( {where: {id: req.body.id }, raw:true })

    if( item.img != null ) {
      fs.readdirSync(process.cwd() + '/public/uploads/news/').forEach( ( file: any ) => {
        if ( file == item.img ) {
          fs.unlinkSync( process.cwd() + '/public/uploads/news/' + item.img )
        }
      })
    }

    await NewsModel.destroy ( {where: {id: req.body.id } } )

    const data = await NewsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      order: [
        ["id", "DESC"]
      ],
      raw: true
    })

    res.render('admin/news/index', {data})

  }catch(error){
    res.status(500).json( error );
  }

})
export { router as newsRoutes }
