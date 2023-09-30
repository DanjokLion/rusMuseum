import * as express from "express";

const Router :express.Router = express.Router();

import { homeRoutes } from './home'
import { newsRoutes } from './news'
import { collectionsRoutes } from './collections'
import { excursionvisRoutes } from './excursionvis'
import { visitorsRoutes } from './visitors'
import { vistavkaRoutes } from './vistavka'
import { AdminRoutes } from './admin'


Router.use( '/', homeRoutes );
Router.use( '/news', newsRoutes );
Router.use( '/collections', collectionsRoutes );
Router.use( '/excursionvis', excursionvisRoutes );
Router.use( '/visitors', visitorsRoutes );
Router.use( '/vistavka', vistavkaRoutes );
Router.use( '/admin', AdminRoutes );


export { Router };
