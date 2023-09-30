import * as express from 'express'

const router: any = express.Router();

import { CollectionsModel, CollectionsContentModel } from '../models'

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    const collections = await CollectionsModel.findAll( { raw: true } )

    res.locals.metaTags = {
        title: "Русский музей",
        description: 'Русский музей',
        keywords: "Русский музей"
    };
    console.log('collections', collections)
    res.render('collections/index', {collections})
  } catch ( error ) {
    res.status(500).json( error );
  }
});

router.get( '/:link', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    const collection = await CollectionsModel.findOne( { where: {
      link: req.params.link
    }, raw: true})

    const data = await CollectionsContentModel.findAll( { where: {
      collectionId: collection.id
    }, raw: true})

    res.locals.metaTags = {
        title: data.title,
        description: data.description,
        keywords: data.meta_keyword
    };

    res.render('collections/page', {collection, data} )
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as collectionsRoutes }
