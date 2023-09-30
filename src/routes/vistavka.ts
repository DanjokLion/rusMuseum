import * as express from 'express'

const router: any = express.Router();

import { VistavkaModel } from '../models'
import { VistavkaContentModel } from '../models'

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    const vistavka = await VistavkaModel.findAll( { raw: true } )
    res.locals.metaTags = {
        title: "Русский музей",
        description: 'Русский музей',
        keywords: "Русский музей"
    };
    res.render('vistavka/index', {vistavka})
  } catch ( error ) {
    res.status(500).json( error );
  }
});

router.get( '/:link', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    const vistavka = await VistavkaModel.findOne( { where: {
      link: req.params.link
    }, raw: true})

    const data = await VistavkaContentModel.findAll( { where: {
      vistavkaId: vistavka.id
    }, raw: true})

    res.locals.metaTags = {
        title: data.title,
        description: data.description,
        keywords: data.meta_keyword
    };

    res.render('vistavka/page', {vistavka, data} )
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as vistavkaRoutes }
