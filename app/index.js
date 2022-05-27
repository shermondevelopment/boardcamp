import express from 'express'

const app = express()

app.listen(process.env.PORT || '4000', () =>
  console.log(`app running in port ${process.env.PORT} 🚀🚀🚀🚀`)
)
