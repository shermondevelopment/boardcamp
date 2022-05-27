/* doentv */
import 'dotenv/config'

/** express */
import express from 'express'

/** database connect*/
import db from './database/db.js'

/* init server */
const app = express()

db.connect()
  .then(() => {
    app.listen(process.env.PORT || '4000', () =>
      console.log(`app running in port ${process.env.PORT} 🚀🚀🚀🚀`)
    )
  })
  .catch(() => {
    console.log('opss connect how db failed 😵😵😵😵😵!')
  })
