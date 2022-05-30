/* doentv */
import 'dotenv/config'

/** express */
import express, { json } from 'express'

/** cors */
import cors from 'cors'

/** routers */
import routers from './routers/index.js'

/* init server */
const app = express()
app.use(json())
app.use(cors())
app.use(routers)

app.listen(process.env.PORT || '4000', () =>
  console.log(`app running in port ${process.env.PORT} 🚀🚀🚀🚀`)
)
