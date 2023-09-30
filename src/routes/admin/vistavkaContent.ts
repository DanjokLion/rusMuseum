import * as express from 'express'
import fs from 'fs'

const router: any = express.Router();

import { VistavkaModel, VistavkaContentModel, UsersModel } from '../../models'

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = await VistavkaContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: VistavkaModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })
    console.log('data', data)
    res.render('admin/vistavkaContent/index',{data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const vistavka = await VistavkaModel.findAll( { raw:true } )
    res.render('admin/vistavkaContent/add', {vistavka})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    const vistavka = await VistavkaModel.findOne( { where: {
      id: req.body.vistavkaId
    }, raw: true})

    if (req.files) {
      const thumbnail: any = req.files.thumbnail;

      req.body.thumbnail = thumbnail.name

      thumbnail.mv(process.cwd() + '/public/uploads/vistavka/' + vistavka.link + '/thumbnail/' + thumbnail.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
      const img: any = req.files.img

      req.body.img = img.name

      img.mv(process.cwd() + '/public/uploads/vistavka/' + vistavka.link + '/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
    }
    console.log('req.body', req.body)
    await VistavkaContentModel.create(req.body)

    const data = await VistavkaContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: VistavkaModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })

    res.render('admin/vistavkaContent/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/edit/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const vistavka = await VistavkaModel.findAll( { raw:true } )

    const data = await VistavkaContentModel.findOne( {
      where: {
        id: req.params.id
      },
      include: {
        model: VistavkaModel,
        attributes: ["id", "title", "link"]
      },
      raw: true
    })

    res.render('admin/vistavkaContent/edit', { data, vistavka } )
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/edit', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const vistavka = await VistavkaModel.findOne( { where: {
      id: req.body.vistavkaId
    }, raw: true})

    if (req.files) {
      const thumbnail: any = req.files.thumbnail;

      req.body.thumbnail = thumbnail.name

      thumbnail.mv(process.cwd() + '/public/uploads/vistavka/' + vistavka.link + '/thumbnail/' + thumbnail.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
      const img: any = req.files.img

      req.body.img = img.name

      img.mv(process.cwd() + '/public/uploads/vistavka/' + vistavka.link + '/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
    }
    await VistavkaModel.update( req.body, {where: {id: req.body.id } } )

    const data = await VistavkaContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: VistavkaModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })

    res.render('admin/vistavkaContent/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/delete', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const item = await VistavkaContentModel.findOne( {
      where: {id: req.body.id },
      include: {
        model: VistavkaModel,
        attributes: ["id", "link"]
      },
       raw:true
     })
     if( item.thumbnail != null ) {
       fs.readdirSync(process.cwd() + '/public/uploads/vistavka/'+ item['vistavka.link'] +'/thumbnail/' ).forEach( ( file: any ) => {
         if ( file == item.thumbnail ) {
             fs.unlinkSync( process.cwd() + '/public/uploads/vistavka/'+ item['vistavka.link'] +'/thumbnail/'+ item.thumbnail )
         }
       })

     }
     if( item.img != null ) {
       fs.readdirSync(process.cwd() + '/public/uploads/vistavka/'+ item['vistavka.link'] ).forEach( ( file: any ) => {
         if ( file == item.img ) {
             fs.unlinkSync( process.cwd() + '/public/uploads/vistavka/'+ item['vistavka.link'] +'/'+ item.img )
         }
       })
     }
    await VistavkaContentModel.destroy ( {where: {id: req.body.id } } )

    const data = await VistavkaContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: VistavkaModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })

    res.render('admin/vistavkaContent/index', {data})

  }catch(error){
    res.status(500).json( error );
  }

})

export { router as vistavkaContentRoutes }
