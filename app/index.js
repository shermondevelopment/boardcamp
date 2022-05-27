/* doentv */
import 'dotenv/config'

/** express */
import express from 'express'

/* init server */
const app = express()

app.listen(process.env.PORT || '4000', () =>
  console.log(`app running in port ${process.env.PORT} 🚀🚀🚀🚀`)
)
