import { Sequelize } from 'sequelize';

export let DB: any = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
  define: {
    freezeTableName: true
  }
});
