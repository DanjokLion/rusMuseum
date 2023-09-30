import * as express from 'express'

import fs from 'fs'

const router: any = express.Router();

router.get( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    const folders: any = []
    const files: any = []
    fs.readdirSync(process.cwd() + '/public/uploads/').forEach( ( file: any ) => {
      const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i
      if ( re.test( file ) == true ) {
        files.push(file)
      } else {
        folders.push(file)
      }
      console.log(file);
    });
    res.locals.files = files
    res.locals.folders = folders
    res.render( 'admin/filesManager', { } );
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

router.post( '/', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    console.log(req.body)
    let files: any = []
    const arrFiles: any = []
    const arrFolders: any = []

    fs.readdirSync(process.cwd() + '/public/uploads'+req.body.path ).forEach( ( file: any ) => {
      const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i
      if ( re.test( file ) == true ) {
        arrFiles.push(file)
      } else {
        arrFolders.push(file)
      }
    });

    files = arrFolders.concat(arrFiles)
    // res.locals.files = files
    res.json({ files , parrentDir: req.body.path })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

router.post( '/upload', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {
    console.log( 'upload body', req.body )
    console.log( 'upload files', req.files )

    let files: any = []
    const arrFiles: any = []
    const arrFolders: any = []
    const img: any = req.files.img;

    console.log( 'path upload', '/public/uploads' + ( req.body.path || '' ) + '/' + img.name )

    if (req.files) {
      img.mv( process.cwd() + '/public/uploads' + ( req.body.path || '' ) + '/' + img.name, function(err: any) {
        if ( err ) {
          console.log('uploads err', err)
          return res.status(500).send(err);
        }
      })
    }

    setTimeout(() => {
      fs.readdirSync( process.cwd() + '/public/uploads' + req.body.path ).forEach( ( file: any ) => {
        const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i
        if ( re.test( file ) == true ) {
          arrFiles.push(file)
        } else {
          arrFolders.push(file)
        }
      })
      files = arrFolders.concat(arrFiles)
      console.log('uploads files', files)
      res.json({ files, parrentDir: req.body.path })
    }, 100);

  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});


router.post( '/rename', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    let files: any = []
    const arrFiles: any = []
    const arrFolders: any = []
    const parrentDir: string = req.body.path != null ? req.body.path : '/'

    fs.renameSync( process.cwd() + '/public/uploads'+req.body.old, process.cwd() + '/public/uploads'+req.body.new )

    fs.readdirSync( process.cwd() + '/public/uploads'+parrentDir ).forEach( ( file: any ) => {
      const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i
      if ( re.test( file ) == true ) {
        arrFiles.push(file)
      } else {
        arrFolders.push(file)
      }
    });

    files = arrFolders.concat(arrFiles)

    res.json({ files, parrentDir })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

router.post( '/delete', async ( req: express.Request, res: express.Response, next: express.NextFunction ) => {
  try {

    let files: any = []
    const arrFiles: any = []
    const arrFolders: any = []
    const parrentDir: string = req.body.parrentDir != null ? req.body.parrentDir : '/'

    fs.unlinkSync( process.cwd() + '/public/uploads'+req.body.file )

    fs.readdirSync( process.cwd() + '/public/uploads'+parrentDir ).forEach( ( file: any ) => {
      const re = /([a-zA-Z0-9\s_\\.\-\(\):])+(.jpg|.png|.webp)$/i
      if ( re.test( file ) == true ) {
        arrFiles.push(file)
      } else {
        arrFolders.push(file)
      }
    });

    files = arrFolders.concat(arrFiles)

    res.json({ files, parrentDir })
  } catch ( error ) {
    // console.log( error );
    res.status(500).json( error );
  }
});

export { router as filesManagerRoutes }
