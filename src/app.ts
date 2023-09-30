import dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import { Router } from './routes/index';
import { VistavkaModel } from './models'
import { CollectionsModel } from './models'

dotenv.config();

const port = process.env.SERVER_PORT;



export const app = express();

app.set( 'views', 'public' );

app.set( 'views', path.join(__dirname, 'views'));

app.set( "view engine", "pug" );

app.use(fileUpload());

app.use(cookieParser())

app.use( '/', express.static('public', { index: false }) );

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '5mb'}));

app.use( async (req, res, next) => {
  const collections = await CollectionsModel.findAll( { raw: true } )

  const vistavki = await VistavkaModel.findAll( { raw: true } )


  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  res.locals.vistavki = vistavki
  res.locals.collections = collections
  res.locals.year = (new Date()).getFullYear()
  next();
})

app.use( '/', Router );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
