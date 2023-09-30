import { DB } from '../db'

import { CollectionsModel } from './collectionsModel'
import { NewsModel } from './newsModel'
import { UsersModel } from './usersModel'
import { VistavkaModel } from './vistavkaModel'
import { CollectionsContentModel } from './collectionsContentModel'
import { VistavkaContentModel } from './vistavkaContentModel'


UsersModel.hasMany( CollectionsModel )
CollectionsModel.belongsTo( UsersModel )

UsersModel.hasMany( CollectionsContentModel )
CollectionsContentModel.belongsTo( UsersModel )

CollectionsModel.hasMany( CollectionsContentModel )
CollectionsContentModel.belongsTo( CollectionsModel )

UsersModel.hasMany( VistavkaModel )
VistavkaModel.belongsTo( UsersModel )

UsersModel.hasMany( VistavkaContentModel )
VistavkaContentModel.belongsTo( UsersModel )

VistavkaModel.hasMany( VistavkaContentModel )
VistavkaContentModel.belongsTo( VistavkaModel )

UsersModel.hasMany( NewsModel )
NewsModel.belongsTo( UsersModel )

DB.sync(  ).then( () => {
  UsersModel.findOrCreate({
    where: {
      id:1,
      name: "Бесхмельницин Виталий",
      email: "vitaliibeshmelnitsin@gmail.com",
      pass: "a2ead632c2a67c518db8e878c98fb8ac6a70827251f1b2c8331b9c908e60ff1b"
    }
  }).then( () => console.log('Администратор синхронизован')).catch((err:any) => {
    throw err
  })
  console.log('База данных синхронизованна' )
} ).catch((err:any) => {
  throw err
})



export{CollectionsModel, NewsModel, UsersModel, VistavkaModel, CollectionsContentModel, VistavkaContentModel}
