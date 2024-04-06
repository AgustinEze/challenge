import {  Sequelize } from "sequelize"
import { config } from 'dotenv'
config()

 const DATABASE_HOST = process.env.DATABASE_HOST
 const DATABASE_NAME = process.env.DATABASE_NAME
 const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
 const DATABASE_USER = process.env.DATABASE_USER
 
export const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD,{
  dialect: 'postgres',
  host:DATABASE_HOST
})
 
try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.')
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos con la base de datos:', error)
  })

