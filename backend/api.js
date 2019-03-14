const express = require("express");
const router = express.Router();
const https = require("https");
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2019-03-14',
  iam_apikey: 'ZZIX5kxhQ4wW76jujtb5FU_QH14593aBJ350IQvvdNve',
  url: 'https://gateway-lon.watsonplatform.net/tone-analyzer/api'
});

router.get("/", (req, res) => {
  res.send('Hello World!');
});

router.post("/analyseText", (req, res) => {
  var toneParams = {
    tone_input: { 'text': req.body['body'] },
    content_type: 'application/json'
  };

  toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
    if (error) {
      return res.json({ success: true });
    } else {
      return res.json({ success: true, data: toneAnalysis });
    }
  });
});
//comment
module.exports = router;
