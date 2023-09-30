import * as express from 'express'
const router: any = express.Router();

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    res.locals.metaTags = {
        title: "Русский музей",
        description: 'Русский музей',
        keywords: "Русский музей"
    };
    res.render('index', { })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as homeRoutes }
