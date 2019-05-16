const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3')
require('dotenv').config()

app.use(cors())

app.get('/', (req, res) => {
  const visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    iam_apikey: process.env.API_KEY
  });

  const classifyParams = {
    url: req.query.url,
    threshold: 0.6,
  };

  visualRecognition.classify(classifyParams)
    .then(classifiedImages => {
      res.json(classifiedImages);
    })
    .catch(err => {
      res.json(err);
    });
})

app.listen(port, () => console.log(`The application is listening on port ${port}!`))
