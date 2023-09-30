import * as express from 'express'

const router: any = express.Router();

import { NewsModel } from '../models'

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    const news = await NewsModel.findAll( {
      order: [
        ["id", "DESC"]
      ],
       raw: true } )
    res.locals.metaTags = {
        title: "Русский музей",
        description: 'Русский музей',
        keywords: "Русский музей"
    };
    res.render('news/index', {news})
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

router.get( '/:link', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const data = await NewsModel.findOne( { where: {
      link: req.params.link
    }, raw: true})
    res.locals.metaTags = {
        title: data.title,
        description: data.description,
        keywords: data.meta_keyword
    };
    res.render('news/page', { data })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as newsRoutes }
