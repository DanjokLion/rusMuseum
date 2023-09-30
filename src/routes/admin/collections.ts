import * as express from 'express'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import fs from 'fs'

const router: any = express.Router();

import { CollectionsModel, UsersModel, CollectionsContentModel } from '../../models'

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = await CollectionsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })

    console.log(data)
    res.render('admin/collections/index',{data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    res.render('admin/collections/add', {})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    if (req.files) {
      const img: any = req.files.thumbnail;
      req.body.thumbnail = img.name
      img.mv(process.cwd() + '/public/uploads/collections/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      });
    }
    req.body.link = new cyrillicToTranslit().transform(req.body.title, "_")

    const dir = process.cwd() + '/public/uploads/collections/' + req.body.link;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(dir + '/thumbnail')
    }
    console.log(req.body)
    await CollectionsModel.create(req.body)
    const data = await CollectionsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })

    res.render('admin/collections/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/edit/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {


    const data = await CollectionsModel.findOne( { where: {
      id: req.params.id
    }, raw: true})

    res.render('admin/collections/edit', { data } )
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/edit', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    if (req.files) {
      const img: any = req.files.thumbnail;

      req.body.thumbnail = img.name
      img.mv(process.cwd() + '/public/uploads/collections/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      });
    }

    const newPath = process.cwd() + '/public/uploads/collections/' + req.body.link
    const oldPath = process.cwd() + '/public/uploads/collections/' + req.body.old

    if ( newPath != oldPath ) {
      fs.renameSync( oldPath, newPath );
    }
    console.log('req.body', req.body)
    await CollectionsModel.update( req.body, {where: {id: req.body.id } } )

    const data = await CollectionsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })

    res.render('admin/collections/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/delete', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const item = await CollectionsModel.findOne( {where: {id: req.body.id }, raw:true })

    if( item.thumbnail != null ) {
      fs.readdirSync(process.cwd() + '/public/uploads/collections/').forEach( ( file: any ) => {
        if ( file == item.thumbnail ) {
          fs.unlinkSync( process.cwd() + '/public/uploads/collections/' + item.thumbnail )
        }
      })

      fs.readdirSync(process.cwd() + '/public/uploads/collections/').forEach( ( file: any ) => {
        if ( file == item.link ) {
          fs.rmdirSync( process.cwd() + '/public/uploads/collections/' + item.link, {recursive:true} )
        }
      })
    }

    await CollectionsModel.destroy ( {where: {id: req.body.id } } )
    await CollectionsContentModel.destroy ( {where: {collectionId: req.body.id } } )
    const data = await CollectionsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })

    res.render('admin/collections/index', {data})

  }catch(error){
    res.status(500).json( error );
  }

})
export { router as collectionsRoutes }
