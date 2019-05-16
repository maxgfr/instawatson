const express = require('express')
const app = express()
const port = 3000;
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');

app.get('/', (req, res) => {
  const visualRecognition = new VisualRecognitionV3({
    version: '2018-03-19',
    iam_apikey: '7LggtOAQJa6ra82j2DcRJvpVr83Xx_cz7z73hn2f0lAP'
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
