import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

/*
 * Export your environment variables here
 * Example:
 *
 *   export const secret = process.env.SECRET
 *   export const credential = {
 *     username: process.env.USERNAME,
 *     password: process.env.PASSWORD
 *   }
 *
 */

export const port = process.env.PORT_SERVER
