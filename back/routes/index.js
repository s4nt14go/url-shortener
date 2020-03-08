const request = require('request');
const linksController = require('../controllers/LinksController');
const BitlyAPI = require('node-bitlyapi');
require('dotenv').config();
const Bitly = new BitlyAPI({
  client_id: process.env.BITLY_CLIENT_ID,
  client_secret: process.env.BITLY_CLIENT_SECRET
});
Bitly.setAccessToken(process.env.BITLY_ACCESS_TOKEN);

const routes = (app) => {

  app.route('/api/shrink')
    .post(async (req, res) => {
      console.log('req.body', req.body);

      let success = false, bitlyUrl;

      Bitly.shortenLink(req.body.url, bitlyCb);

      function bitlyCb(err, results) {
        try {
          results = JSON.parse(results);
          console.log('Bitly results:', results);
          if (!err && results.data && results.data.url) {
            console.log('Bitly url: ' + results.data.url);

            bitlyUrl = results.data.url;
            checkShortUrl()
          } else {
            const error = err || results.status_txt;
            console.log('error', error);
            res.status(200).json({success, error});
          }
        } catch(e) {
          const error = err || (results? results.status_txt : {error: 'Back did not received a valid response from Bitly.', bitlyResponse: results});
          console.log('error', error);
          res.status(200).json({success, error});
        }
      }

      let bitlyPointsTo, originalPointsTo;
      function checkShortUrl() {

        let noRequestRemain = false;

        request.get(bitlyUrl, function (err) {
          bitlyPointsTo = this.uri.href;
          console.log(bitlyUrl + ' ---> ' + bitlyPointsTo);
          noRequestRemain? checkRedirectsEqual() : noRequestRemain = true;
        });

        request.get(req.body.url, function (err) {
          originalPointsTo = this.uri.href ;
          console.log(req.body.url + ' ---> ' + originalPointsTo);
          noRequestRemain? checkRedirectsEqual() : noRequestRemain = true;
        });
      }

      function checkRedirectsEqual() {
        if (bitlyPointsTo === originalPointsTo) {
          console.log('Both points to ' + originalPointsTo);
          const shortened = {
            original: req.body.url,
            originalPointsTo,
            short: bitlyUrl,
            bitlyPointsTo
          };

          linksController.newShort(shortened, function (err, top5) {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            }

            res.status(200).json({success: true, shortened, top5});

          });

        } else {
          const error = 'Redirection mismatch';
          res.status(200).json({success, error, original: req.body.url, originalPointsTo, bitly: bitlyUrl, bitlyPointsTo});
        }
      }

    })

    .get(async (req, res) => {
      linksController.getTop5(function (err, top5) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }

        res.status(200).json({success: true, top5});

      });
    });

};

module.exports = routes;