import fs from 'fs'
import sql from 'sequelize'
import { logging } from './config.js'

const { Sequelize } = sql
const model_postfix = '.model.js'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/db.sqlite',
  logging: (logging === 'true') ? console.log : false
})

fs
  .readdirSync('./models')
  .filter(file => file.endsWith(model_postfix))
  .map(async file => {
    const { default: model } = await import(`./models/${file}`).catch(r => {
      console.log(`Error when importing model: ${file}`)
      console.log(`Reason: ${r}`)
    })
    const table_name = file.slice(0, -model_postfix.length)
    sequelize.define(table_name, model, { timestamps: false, tableName: table_name })

    sequelize.models[table_name].sync({force: true}).catch(r => {
      console.log(`Error when syncing model: ${file}`)
      console.log(`Reason: ${r}`)
    })
    console.log(`Imported model: ${table_name}`)
  })

export const databaseConnectTest = async () => {
  console.log('Testing database connectivity...')
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export const models = sequelize.models
