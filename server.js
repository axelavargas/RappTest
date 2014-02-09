var express = require("express"),
    logfmt = require("logfmt"),
    cors = require('cors'),
    app = express(),
    util = require('util'),
    twitter = require('twitter');

var twit = new twitter({
    consumer_key: 'SYIkowYPaj9rjMoL2B3pw',
    consumer_secret: 'FbosRonyjuxWjAbUi0lfnrNZOjMpExIgNs1AgiQA',
    access_token_key: '16511419-fOli5PcrjThkzofrbzQc6v9od7oYz6yKOmlIfX6nh',
    access_token_secret: '8HLW91ifHlZrNM7V1OT0pIRDDs0n6WYtO9929sCb6aYDF'
});


app.use(logfmt.requestLogger());

app.get('/twapi', cors(), function(req, res) {
    twit.search(req.query.q, {count: 4, include_entities: false}, function(data) {
        res.json(data);
    });
});

var port = Number(process.env.PORT || 5000);
app.use('/', express.static(__dirname + '/app'));
app.listen(port, function() {
    console.log("Listening on " + port);
});
