var express = require("express");
var router = express.Router();

let request = require("request");
let options = {
  method: "GET",
  url: "https://api.breaker.audio/shows/",
  headers: {
    "Cache-Control": "no-cache",
    "User-Agent": "Breaker/1.0.0 (0)"
  }
};

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Sample Cast API" });
});

/* GET podcast show by id */
router.get("/shows/:id", function(req, res) {
  //create specific url from base options
  let showOptions = Object.assign({}, options, {
    url: options.url + req.params.id
  });
  request(showOptions, function(error, response, body) {
    if (error) throw new Error(error);

    res.send(JSON.parse(body));
  });
});

/* GET ALL podcast episodes
@episodeId
*/
router.get("/shows/:id/episodes", function(req, res) {
  //create specific url from base for all episodes
  let showOptions = Object.assign({}, options, {
    url: options.url + req.params.id + "/episodes"
  });
  request(showOptions, function(error, response, body) {
    if (error) throw new Error(error);

    res.send(JSON.parse(body));
  });
});

/* GET SINGLE podcast episode by 
  @episodeId 
  @showId
  */
router.get("/shows/:showId/episodes/:episodeId", function(req, res) {
  let showOptions = Object.assign({}, options, {
    url: `${options.url}${req.params.showId}/episodes/${req.params.episodeId}`
  });
  request(showOptions, function(error, response, body) {
    if (error) throw new Error(error);

    res.send(JSON.parse(body));
  });
});

module.exports = router;
