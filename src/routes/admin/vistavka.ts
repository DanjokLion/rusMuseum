import * as express from 'express'
import cyrillicToTranslit from 'cyrillic-to-translit-js'
import fs from 'fs'

const router: any = express.Router();

import { VistavkaModel, UsersModel, VistavkaContentModel } from '../../models'

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = await VistavkaModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })
    res.render('admin/vistavka/index',{data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    res.render('admin/vistavka/add', {})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    if (req.files) {
      const img: any = req.files.img;
      req.body.img = img.name
      img.mv(process.cwd() + '/public/uploads/vistavka/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      });
    }
    req.body.link = new cyrillicToTranslit().transform(req.body.title, "_")

    const dir = process.cwd() + '/public/uploads/vistavka/' + req.body.link;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      fs.mkdirSync(dir + '/thumbnail')
    }
    console.log(req.body)
    await VistavkaModel.create(req.body)
    const data = await VistavkaModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })

    res.render('admin/vistavka/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/edit/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    const data = await VistavkaModel.findOne( { where: {
      id: req.params.id
    }, raw: true})

    res.render('admin/vistavka/edit', { data } )
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/edit', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    if (req.files) {
      const img: any = req.files.img;

      req.body.img = img.name
      img.mv(process.cwd() + '/public/uploads/vistavka/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      });
    }

    const newPath = process.cwd() + '/public/uploads/vistavka/' + req.body.link;
    const oldPath = process.cwd() + '/public/uploads/vistavka/' + req.body.old

    if ( newPath != oldPath ) {
      fs.renameSync( oldPath, newPath );
    }
    await VistavkaModel.update( req.body, {where: {id: req.body.id } } )

    const data = await VistavkaModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })

    res.render('admin/vistavka/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/delete', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const item = await VistavkaModel.findOne( {where: {id: req.body.id }, raw:true })
    if( item.img != null ) {
      fs.readdirSync(process.cwd() + '/public/uploads/vistavka/').forEach( ( file: any ) => {
        if ( file == item.img ) {
          fs.unlinkSync( process.cwd() + '/public/uploads/vistavka/' + item.img )
        }
      })

      fs.readdirSync(process.cwd() + '/public/uploads/vistavka/').forEach( ( file: any ) => {
        if ( file == item.link ) {
          fs.rmdirSync( process.cwd() + '/public/uploads/vistavka/' + item.link, {recursive:true} )
        }
      })
    }

    await VistavkaModel.destroy ( {where: {id: req.body.id } } )
    await VistavkaContentModel.destroy ( {where: {vistavkaId: req.body.id } } )
    const data = await VistavkaModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })
    res.render('admin/vistavka/index', {data})

  }catch(error){
    res.status(500).json( error );
  }

})
export { router as vistavkaRoutes }
