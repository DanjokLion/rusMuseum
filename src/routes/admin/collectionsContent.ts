import * as express from 'express'
import fs from 'fs'

const router: any = express.Router();

import { CollectionsModel, CollectionsContentModel, UsersModel } from '../../models'

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const data = await CollectionsContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: CollectionsModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })
    console.log('data', data)
    res.render('admin/collectionsContent/index',{data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const collections = await CollectionsModel.findAll({
      include:{
        model: UsersModel,
        attributes: ["id", "name"]
      },
      raw: true
    })
    res.render('admin/collectionsContent/add', {collections})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/add', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {

    const collection = await CollectionsModel.findOne( { where: {
      id: req.body.collectionId
    }, raw: true})

    console.log('collections', collection)
    console.log('req.body', req.body)
    if (req.files) {
      const thumbnail: any = req.files.thumbnail;

      req.body.thumbnail = thumbnail.name

      thumbnail.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/thumbnail/' + thumbnail.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
      const img: any = req.files.img

      req.body.img = img.name

      img.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
    }
    console.log('req.body', req.body)
    await CollectionsContentModel.create(req.body)

    const data = await CollectionsContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: CollectionsModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })

    res.render('admin/collectionsContent/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.get('/edit/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {


    const data = await CollectionsContentModel.findOne( {
      where: {
        id: req.params.id
      },
      include:{
        model: CollectionsModel,
        attributes: ["id", "title", "link"]
      }, raw: true
    })
    console.log(data)

    res.render('admin/collectionsContent/edit', { data } )
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/edit', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const collection = await CollectionsModel.findOne( { where: {
      id: req.body.collectionId
    }, raw: true})

    console.log('collections', collection)
    console.log('req.body', req.body)
    if (req.files) {
      const thumbnail: any = req.files.thumbnail;

      req.body.thumbnail = thumbnail.name

      thumbnail.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/thumbnail/' + thumbnail.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
      const img: any = req.files.img

      req.body.img = img.name

      img.mv(process.cwd() + '/public/uploads/collections/' + collection.link + '/' + img.name, function(err: any) {
        if (err) {
         return res.status(500).send(err);
        }
      })
    }
    await CollectionsModel.update( req.body, {where: {id: req.body.id } } )
    const data = await CollectionsContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: CollectionsModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })
    res.render('admin/collectionsContent/index', {data})
  }catch(error){
    res.status(500).json( error );
  }

})

router.post('/delete', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const item = await CollectionsContentModel.findOne( {
      where: {id: req.body.id },
      include: {
        model: CollectionsModel,
        attributes: ["id", "link"]
      },
       raw:true
     })
    if( item.thumbnail != null ) {
      fs.readdirSync(process.cwd() + '/public/uploads/collections/'+ item['collection.link'] +'/thumbnail/' ).forEach( ( file: any ) => {
        if ( file == item.thumbnail ) {
            fs.unlinkSync( process.cwd() + '/public/uploads/collections/'+ item['collection.link'] +'/thumbnail/'+ item.thumbnail )
        }
      })

    }
    if( item.img != null ) {
      fs.readdirSync(process.cwd() + '/public/uploads/collections/'+ item['collection.link'] ).forEach( ( file: any ) => {
        if ( file == item.img ) {
            fs.unlinkSync( process.cwd() + '/public/uploads/collections/'+ item['collection.link'] +'/'+ item.img )
        }
      })
    }
    await CollectionsContentModel.destroy ( {where: {id: req.body.id } } )

    const data = await CollectionsContentModel.findAll({
      include:[{
        model: UsersModel,
        attributes: ["id", "name"]
      }, {
        model: CollectionsModel,
        attributes: ["id", "title", "link"]
      }],
      raw: true
    })

    res.render('admin/collectionsContent/index', {data})

  }catch(error){
    res.status(500).json( error );
  }

})

export { router as collectionsContentRoutes }
